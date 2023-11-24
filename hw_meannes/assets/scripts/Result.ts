import PlaySoundAction, { PlaySoundActionData } from "./Actions/SimpleActions/PlaySoundAction";import Analytics from "./Analytics";
import Events from "./Enums/Events";
import InputManager from "./Plugins/Input/InputManager";
import {InputManagerData} from "./Plugins/Input/InputManagerData";
import InputSources from "./Plugins/Input/InputSources";
import InputTypes from "./Plugins/Input/InputTypes";
import Score from "./Score";
import Tutorial from "./Tutorial";
import galController from "./galController";
import joystickDrag from "./joystickDrag";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Result extends cc.Component {
    @property(Score) score: Score = null;
    @property(cc.Node) logoNode: cc.Node = null;

    @property(cc.Node) winResult: cc.Node = null;
    @property(cc.Node) winInputs: cc.Node[] = [];

    @property(cc.Node) inputs: cc.Node[] = [];


    @property(cc.Node) redirectWinInput: cc.Node= null;


    @property(joystickDrag) joystick: joystickDrag = null;
    @property(galController) gal: galController = null;
    @property(Tutorial) tutorial: Tutorial = null;


    @property(cc.Animation) cup1Animation: cc.Animation = null;
    @property(cc.Animation) cup2Animation: cc.Animation = null;
    @property(cc.Animation) cup3Animation: cc.Animation = null;

    @property() delay1 = 0;
    @property() delay2 = 0;
    @property() delay3 = 0;

    @property(PlaySoundActionData) winSound: PlaySoundActionData = null;

    @property(PlaySoundActionData) failSound: PlaySoundActionData = null;

    private winIsplayed: boolean = false;

    public isResult: boolean = false;

    protected onLoad(): void {
        for (let i = 0; i < this.inputs.length; i++) {
            this.inputs[i].active = false;
        }

        cc.systemEvent.on(Events.FAIL.toString(), this.onFail, this);
        cc.systemEvent.on(Events.WIN.toString(), this.win, this);

        InputManager.getInstance().on(InputTypes.Down, this.onInput, this);

    }

    protected update(dt: number): void {
        if(this.score.isGoblin1Dead && this.score.isGoblin2Dead && this.score.isGoblin3Dead && this.score.isGoblin4Dead && this.score.isGoblin5Dead && this.score.isGoblin6Dead)
        {
            this.scheduleOnce( () => {
                if(! this.winIsplayed){
                this.win();
                }
            },.1)
        }
    }

    public onFail(): void {
        this.joystick.disableJoystick();
        this.gal.galLose();
        this.logoNode.active = false;

        Analytics.setFail();
        this.score.node.active = false;

        new cc.Tween(this.node).to(0.15, {opacity: 255}).call(() => {
            this.isResult = true;

            for (let i = 0; i < this.inputs.length; i++) {
                this.inputs[i].active = true;
                
            }
            new PlaySoundAction(this.failSound).run();

        }).start();
    }

    private onInput(data: InputManagerData): void {

        if (data.touchSource === InputSources.Exit) {
            Analytics.setFailInstall();
            
            // new SendAnalyticsAction({eventName: 'failInstall'}).run();
            cc.systemEvent.emit(Events.REDIRECT.toString(), 'result');

            return;
        }

        if (!this.isResult) {
            return;
        }

        if (data.touchSource === InputSources.TryAgain) {
            // window.IS_RESTART = true;

            Analytics.setRestart();

            this.isResult = false;

            // new SendAnalyticsAction({eventName: 'retry'}).run();

            cc.audioEngine.stopAll();

            cc.director.loadScene('Main');
        }
    }

    public win(): void {
        this.logoNode.active = false;

        this.winIsplayed = true;
        this.joystick.disableJoystick();
        this.tutorial.isResult= true;
        this.gal.galWin();
        this.score.node.active = false;
        this.redirectWinInput.active = true;

        Analytics.setWin();

        // new SendAnalyticsAction({eventName: 'win'}).run();

        this.isResult = true;

        for (let i = 0; i < this.winInputs.length; i++) {
            this.winInputs[i].active = true;
        }
        new PlaySoundAction(this.winSound).run();

        new cc.Tween(this.winResult).to(0.25, {opacity: 255}).start();
        //     cc.systemEvent.emit(Events.RESULT.toString(), true);
        // }).call(() => {
        //     if( this.score.isOneCup){
        //         this.scheduleOnce( () => { this.cup1Animation.play('cupAnimation');}, this.delay1)
          
        // }
        // if( this.score.isTwoCup){
        //     this.scheduleOnce( () => { this.cup2Animation.play('cupAnimation');}, this.delay2)         }
        //  if( this.score.isThreeCup){
        //     this.scheduleOnce( () => { this.cup3Animation.play('cupAnimation');}, this.delay3)         }
        // }).start();
    }
}
