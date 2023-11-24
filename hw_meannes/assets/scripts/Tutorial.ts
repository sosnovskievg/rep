import ActionComponent from "./Actions/ActionComponent";
import Events from "./Enums/Events";
import Hero from "./Hero";
import galController from "./galController";
import joystickDrag from './joystickDrag';
// import CameraBox from './Plugins/Camera/CameraBox';
import CameraController, { CameraBoxes } from "./Plugins/Camera/CameraController";
import EasingTypes from "./Enums/EasingTypes";
import Score from "./Score";
import Analytics from './Analytics';
import Settings from "./Plugins/Settings";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Tutorial extends cc.Component {

    @property() delay: number = 10;
    @property(galController) gal: galController = null;
    @property(Score) score: Score = null;

    @property(joystickDrag) joystick: joystickDrag = null;
    @property(Hero) hero: Hero = null;
    @property(cc.Node) firstTutorState: cc.Node = null;
    @property(cc.Node) secondTutorState: cc.Node = null;
    @property(cc.Node) thirdTutorState: cc.Node = null;
    @property(cc.Node) fourthTutorState: cc.Node = null;
    @property(cc.Node) fifthTutorState: cc.Node = null;
    @property(cc.Node) sixTutorState: cc.Node = null;
    @property(cc.Node) sevenTutorState: cc.Node = null;
    @property(cc.Node) eightsTutorState: cc.Node = null;
    @property(cc.Node) ninethTutorState: cc.Node = null;
    @property(cc.Node) tenTutorState: cc.Node = null;
    @property(cc.Node) elevenTutorState: cc.Node = null;
    // @property(cc.Node) twelweTutorState: cc.Node = null;

    @property([CameraBoxes]) cameraBoxList: CameraBoxes[] = [];

    @property(cc.Camera)
    camera: cc.Camera = null; // The camera you want to check against
    // @property(cc.Node) camera: cc.Node = null;


    @property() cameraZoomSpeed: number = 100;

    @property(cc.Node) fish: cc.Node = null;
    @property(cc.Node) highlightNode: cc.Node = null;

    private isResult: boolean = false;
    private isActive: boolean = true;

    private inactiveTime: number = 0;
    private entryCameraPlayed: boolean = false;
    private tween: cc.Tween = null;

    private index = 0;



    protected onLoad(): void {

        cc.systemEvent.on(Events.TUTORIAL_HIDE.toString(), this.ontutorialHide, this);
        cc.systemEvent.on(Events.WIN.toString(), this.onResult, this);
        cc.systemEvent.on(Events.FAIL.toString(), this.onResult, this);


    }

    protected start(): void {
        const arrLength = this.cameraBoxList.length;
        this.cameraMove(arrLength);

    }

    private cameraMove(arrLength) {

        if (this.index < arrLength) {
            CameraController.getInstance().setCameraBox(this.cameraBoxList[this.index], this.cameraZoomSpeed, 0, EasingTypes.cubicInOut).then( () => {
                this.cameraMove(arrLength);
                this.index += 1;
            });  
        }

        else {
            this.joystick.activateJoystick();
            this.entryCameraPlayed = true;
            Analytics.introEnd();
            this.highlightNode.active = false;
            return;
        }

    }

    protected update(dt: number): void {

        if (!this.isResult && this.inactiveTime < this.delay && !this.gal.isAnimating && !this.joystick.isMoving && this.entryCameraPlayed) {
            this.inactiveTime += dt;

            if (this.inactiveTime >= this.delay) {
                // this.isActive = true;
                this.checkTutorState();
                this.show();
            }
        }
       
     

        const cameraPosition = this.camera.node.position;
        const viewportSize = cc.view.getViewportRect().size;

        // Calculate the visible area manually
        const visibleRect = new cc.Rect(
            cameraPosition.x - viewportSize.width / this.camera.zoomRatio / cc.view.getScaleX() / 2,
            cameraPosition.y - viewportSize.height /  this.camera.zoomRatio / cc.view.getScaleY()/ 2,
            viewportSize.width / this.camera.zoomRatio/ cc.view.getScaleX(),
            viewportSize.height / this.camera.zoomRatio / cc.view.getScaleY()
        );

        // Check if the element's bounding box intersects with the visible area
        const isInsideCamera = visibleRect.intersects(this.fish.getBoundingBoxToWorld());

        if (isInsideCamera) {
        } else {
            // The element is outside the camera's view
        }
    }

    private checkTutorState() {
        if (this.hero.isState1Played) {
            this.hero.tutorState = 2;
        }

        if (this.hero.isState2Played && this.hero.isState1Played) {
            this.hero.tutorState = 3;
        }
        if (this.hero.isState3Played && this.hero.isState2Played && this.hero.isState1Played) {
            this.hero.tutorState = 4;
        }

        if (this.hero.isState4Played && this.hero.isState3Played && this.hero.isState2Played && this.hero.isState1Played) {
            this.hero.tutorState = 5;
        }
        if (this.hero.isState5Played && this.hero.isState4Played && this.hero.isState3Played && this.hero.isState2Played && this.hero.isState1Played) {
            this.hero.tutorState = 6;
        }
        if (this.hero.isState6Played && this.hero.isState5Played && this.hero.isState4Played && this.hero.isState3Played && this.hero.isState2Played && this.hero.isState1Played) {
            this.hero.tutorState = 7;
        }
        // if (this.hero.isState7Played && this.hero.isState6Played && this.hero.isState5Played && this.hero.isState4Played && this.hero.isState3Played && this.hero.isState2Played && this.hero.isState1Played) {
        //     this.hero.isState8Played = true;
        // }
        if (this.hero.isState7Played && this.hero.isState6Played && this.hero.isState5Played && this.hero.isState4Played && this.hero.isState3Played && this.hero.isState2Played && this.hero.isState1Played) {
            this.hero.tutorState = 8;
        }
        if (this.hero.isState8Played && this.hero.isState7Played && this.hero.isState6Played && this.hero.isState5Played && this.hero.isState4Played && this.hero.isState3Played && this.hero.isState2Played && this.hero.isState1Played) {
            this.hero.tutorState = 9;
        }
        if (this.hero.isState9Played && this.hero.isState8Played && this.hero.isState7Played && this.hero.isState6Played && this.hero.isState5Played && this.hero.isState4Played && this.hero.isState3Played && this.hero.isState2Played && this.hero.isState1Played) {
            this.hero.tutorState = 10;
        }
        if (this.hero.isState10Played && this.hero.isState9Played && this.hero.isState8Played && this.hero.isState7Played && this.hero.isState6Played && this.hero.isState5Played && this.hero.isState4Played && this.hero.isState3Played && this.hero.isState2Played && this.hero.isState1Played) {
            this.hero.tutorState = 11;
        }
        // if (this.hero.isState11Played && this.hero.isState10Played && this.hero.isState9Played && this.hero.isState8Played && this.hero.isState7Played && this.hero.isState6Played && this.hero.isState5Played && this.hero.isState4Played && this.hero.isState3Played && this.hero.isState2Played && this.hero.isState1Played) {
        //     this.hero.tutorState = 12;
        // }

        if (this.hero.isState11Played && this.hero.isState10Played && this.hero.isState9Played && this.hero.isState8Played && this.hero.isState7Played && this.hero.isState6Played && this.hero.isState5Played && this.hero.isState4Played && this.hero.isState3Played && this.hero.isState2Played && this.hero.isState1Played) {
            this.hero.tutorState = 12;
        }

    }


    private show(): void {
        if (this.tween) {
            this.tween.stop();
        }
        switch (this.hero.tutorState) {
            case 1:
                this.firstTutorState.active = true;
                this.tween = new cc.Tween(this.firstTutorState).to(0.15, { opacity: 255 }).start();
                break;
            case 2:

                this.secondTutorState.active = true;
                this.tween = new cc.Tween(this.secondTutorState).to(0.15, { opacity: 255 }).start();

                break;
            case 3:
                this.thirdTutorState.active = true;
                this.tween = new cc.Tween(this.thirdTutorState).to(0.15, { opacity: 255 }).start();
                break;
            case 4:
                this.fourthTutorState.active = true;
                this.tween = new cc.Tween(this.fourthTutorState).to(0.15, { opacity: 255 }).start();

                break;
            case 5:
                this.fifthTutorState.active = true;
                this.tween = new cc.Tween(this.fifthTutorState).to(0.15, { opacity: 255 }).start();
                break;
            case 6:
                this.sixTutorState.active = true;
                this.tween = new cc.Tween(this.sixTutorState).to(0.15, { opacity: 255 }).start();
                break;
            case 7:
                this.sevenTutorState.active = true;
                this.tween = new cc.Tween(this.sevenTutorState).to(0.15, { opacity: 255 }).start();
                break;
            case 8:
                this.eightsTutorState.active = true;
                this.tween = new cc.Tween(this.eightsTutorState).to(0.15, { opacity: 255 }).start();
                break;
            case 9:
                this.ninethTutorState.active = true;
                this.tween = new cc.Tween(this.ninethTutorState).to(0.15, { opacity: 255 }).start();
                break;
            case 10:
                this.tenTutorState.active = true;
                this.tween = new cc.Tween(this.tenTutorState).to(0.15, { opacity: 255 }).start();
                break;
            case 11:

                this.elevenTutorState.active = true;
                this.tween = new cc.Tween(this.elevenTutorState).to(0.15, { opacity: 255 }).start();
                break;
            case 12:

            // this.hide();

                break;
            // case 13:

            //     break;
            default:
                break;
        }

    }


    private hide(): void {
        if (this.tween) {
            this.tween.stop();
        }
        switch (this.hero.tutorState) {
            case 1:
                this.firstTutorState.active = true;
                this.tween = new cc.Tween(this.firstTutorState).to(0.15, { opacity: 0 }).start();
                break;
            case 2:
                this.secondTutorState.active = true;
                this.tween = new cc.Tween(this.secondTutorState).to(0.15, { opacity: 0 }).start();
                break;
            case 3:
                this.thirdTutorState.active = true;
                this.tween = new cc.Tween(this.thirdTutorState).to(0.15, { opacity: 0 }).start();
                break;
            case 4:
                this.fourthTutorState.active = true;
                this.tween = new cc.Tween(this.fourthTutorState).to(0.15, { opacity: 0 }).start();
                break;
            case 5:
                this.fifthTutorState.active = true;
                this.tween = new cc.Tween(this.fifthTutorState).to(0.15, { opacity: 0 }).start();
                break;
            case 6:
                this.sixTutorState.active = true;
                this.tween = new cc.Tween(this.sixTutorState).to(0.15, { opacity: 0 }).start();
                break;
            case 7:
                this.sevenTutorState.active = true;
                this.tween = new cc.Tween(this.sevenTutorState).to(0.15, { opacity: 0 }).start();
                break;
            case 8:
                this.eightsTutorState.active = true;
                this.tween = new cc.Tween(this.eightsTutorState).to(0.15, { opacity: 0 }).start();
                break;
            case 9:
                this.ninethTutorState.active = true;
                this.tween = new cc.Tween(this.ninethTutorState).to(0.15, { opacity: 0 }).start();
                break;
            case 10:
                this.tenTutorState.active = true;
                this.tween = new cc.Tween(this.tenTutorState).to(0.15, { opacity: 0 }).start();
                break;
            case 11:
                // this.elevenTutorState.active = true;
                this.tween = new cc.Tween(this.elevenTutorState).to(0.15, { opacity: 0 }).start();
                break;
            case 12:
                this.twelweTutorState.active = true;
                this.tween = new cc.Tween(this.twelweTutorState).to(0.15, { opacity: 0 }).start();
                break;
            default:
                break;

            // this.tween = new cc.Tween(this.node).to(0.15, { opacity: 0 }).start();
        }
    }

    // private onActionRun(action: ActionComponent, parallelActions: ActionComponent[] = []): void {
    //     this.isActive = false;
    //     this.inactiveTime = 0;
    //     this.hide();


    // }

    // private onActionEnd(): void {
    //     this.isActive = true;
    //     this.inactiveTime = 0;
    // }

    private onResult(): void {
        if (!this.isResult) {
            this.isResult = true;
            this.hide();
        }
    }

    private ontutorialHide() {


        this.hide();
        this.inactiveTime = 0;
    }

}
