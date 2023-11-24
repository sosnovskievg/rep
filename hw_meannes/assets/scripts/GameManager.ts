import Events from './Enums/Events';
import Settings from "./Plugins/Settings";
import Preferences from "./Plugins/Preferences";
import InputManager from './Plugins/Input/InputManager';
import InputTypes from './Plugins/Input/InputTypes';
import { InputManagerData } from './Plugins/Input/InputManagerData';
import InputSources from './Plugins/Input/InputSources';
import Analytics from './Analytics';


const { ccclass, property } = cc._decorator;


@ccclass
export default class GameManager extends cc.Component {

    public static playableName: string = '';
    public static androidUrl: string = '';
    public static iosUrl: string = '';

    //#region editor properties

    @property(cc.String) playableName: string = 'playable-name-playable/endcard-version0-en';
    @property(cc.String) androidUrl: string = 'https://www.google.com/search?q=android';
    @property(cc.String) iosUrl: string = 'https://www.google.com/search?q=ios';

    @property(cc.Boolean) enableDebug = true;

    @property() isRedirectOnResultTap: boolean = true;
    @property() isRedirectByTaps: boolean = false;
    @property({ visible: function (this) { return this.isRedirectByTaps } }) tapsToRedirect: number = 3;
    @property({ visible: function (this) { return this.isRedirectByTaps } }) isNeedToRefreshTapsAfterRedirect: boolean = true;
    @property({ visible: function (this) { return this.isRedirectByTaps } }) isResultAfterTapRedirect: boolean = false;

    //#endregion


    //#region private properties

    private settings: Settings = new Settings();

    private isTjApiCalled: boolean = false;

    private isResult: boolean = false;
    private isWin: boolean = false;
    private tapsCount: number = 0;

    //#endregion


    //#region lifecycle callbacks

    onLoad(): void {
        GameManager.playableName = this.playableName;
        GameManager.androidUrl = this.androidUrl;
        GameManager.iosUrl = this.iosUrl;

        this.setRedirectUrl();

        this.subscribeEvents();
        // this.enablePhysics3d();
        this.enablePhysics();
        // this.enableCollision();
        InputManager.getInstance();

        Analytics.setReady();
    }

    start(): void {
        console.log(GameManager.playableName);

        this.windowResized();
        cc.systemEvent.emit(Events.PLAYABLE_START.toString());

        Analytics.setLoad();
    }

    update(dt: number) {
        cc.systemEvent.emit(Events.UPDATE_TICK.toString(), dt);
    }

    //#endregion

    //#region private methods

    private enablePhysics3d(gravity: cc.Vec3 = cc.v3(0, -10, 0), enableDebug: boolean = false): void {
        const physicsManager = cc.director.getPhysics3DManager();
        physicsManager.enabled = true;
        physicsManager.gravity = gravity;

        if (enableDebug) {
            //@ts-ignore
            cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_shapeBit;
        }

    }

    private enablePhysics(gravity: cc.Vec2 = cc.v2(0, -320)): void {
        const physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        physicsManager.gravity = gravity;

        if (this.enableDebug) {
            //@ts-ignore
            cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_shapeBit;
        
        cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
            cc.PhysicsManager.DrawBits.e_pairBit |
            cc.PhysicsManager.DrawBits.e_centerOfMassBit |
            cc.PhysicsManager.DrawBits.e_jointBit |
            cc.PhysicsManager.DrawBits.e_shapeBit
            ;
        }    

    }



    private enableCollision(isDebug: boolean = false): void {
        const manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = isDebug;
    }

    private setRedirectUrl(): void {
        //@ts-ignore
        window.ANDROID_URL = this.androidUrl;
        //@ts-ignore
        window.IOS_URL = this.iosUrl;
        //@ts-ignore
        window.REDIRECT_URL = Preferences.REDIRECT_URL = (/android/i.test(navigator.userAgent)) ? this.androidUrl : this.iosUrl;
    }

    private subscribeEvents(): void {
        cc.view.setResizeCallback(() => {
            this.windowResized();
        });

        (Preferences.global.TJ_API && Preferences.global.TJ_API.setPlayableBuild(GameManager.playableName));
        (Preferences.global.TJ_API && Preferences.global.TJ_API.setPlayableAPI({ skipAd() { cc.systemEvent.emit(Events.RESULT.toString()); } }));
        (Preferences.global.BD_API && Preferences.global.BD_API.sendEvent('loadMainScene'));

        InputManager.getInstance().on(InputTypes.Down, this.onDown, this);

        cc.systemEvent.on(Events.REDIRECT.toString(), this.onRedirect, this);
        cc.systemEvent.on(Events.RESULT.toString(), this.onResult, this);
    }

    private windowResized(): void {
        this.settings.updateSettings();
        cc.systemEvent.emit(Events.WINDOW_RESIZED.toString(), this.settings);
    }

    //#endregion

    //#region event handlers

    private onResult(isWin: boolean): void {
        if (!this.isTjApiCalled) {
            this.isTjApiCalled = true;
            (Preferences.global.TJ_API && Preferences.global.TJ_API.objectiveComplete());
            (Preferences.global.TJ_API && Preferences.global.TJ_API.gameplayFinished());
        }

        this.isResult = true;

        this.isWin = isWin;

        cc.systemEvent.emit(Events.RESULT_SHOW.toString());

        (Preferences.global.BD_API && Preferences.global.BD_API.sendEvent('finishPlayPlayable'));
    }

    private onDown(data: InputManagerData): void {
        if (this.tapsCount === 0) {
            Analytics.setFirstClick();
        }

        this.tapsCount += 1;

        if (data.touchSource === InputSources.RedirectButton) {
            if (!this.isResult) {
                Analytics.setLogo();
            }

            cc.systemEvent.emit(Events.REDIRECT.toString(), 'ingame_button');
        } else if (this.isResult) {
            if (this.isWin) {
                Analytics.setWinInstall();

                if (data.touchSource === InputSources.NextLevels) {
                    Analytics.setNextLevels();
                }
            }

            if (this.isRedirectOnResultTap) {
                cc.systemEvent.emit(Events.REDIRECT.toString(), 'result');
            }
        } else if (this.isRedirectByTaps && this.tapsCount >= this.tapsToRedirect) {
            if (this.isNeedToRefreshTapsAfterRedirect) {
                this.tapsCount = 0;
            }

            if (this.isResultAfterTapRedirect) {
                cc.systemEvent.emit(Events.RESULT.toString());
            }

            cc.systemEvent.emit(Events.REDIRECT.toString(), 'ingame_button');
        }
    }

    private onRedirect(source: string): void {
        cc.director.pause();

        try {
            // @ts-ignore
            redirect();
        } catch (err) {
            console.log("SDK was not found");
            window.open(Preferences.REDIRECT_URL);
        }

        cc.director.resume();

        if (!this.isTjApiCalled) {
            this.isTjApiCalled = true;
            (Preferences.global.TJ_API && Preferences.global.TJ_API.objectiveComplete());
            (Preferences.global.TJ_API && Preferences.global.TJ_API.gameplayFinished());
        }
    }

    //#endregion
}
