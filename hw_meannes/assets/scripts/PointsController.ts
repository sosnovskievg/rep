// import ActionComponent from "./Actions/Components/ActionComponent";
import InputManager from "./Plugins/Input/InputManager";
import {InputManagerData} from "./Plugins/Input/InputManagerData";
import InputSources from "./Plugins/Input/InputSources";
import InputTypes from "./Plugins/Input/InputTypes";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PointsController extends cc.Component {
    // @property(ActionComponent) action1: ActionComponent = null;
    // @property(ActionComponent) action2: ActionComponent = null;
    // @property(ActionComponent) action3: ActionComponent = null;
    // @property(ActionComponent) action4: ActionComponent = null;

    private currentState: number = 0;

    private isLeftComplete: boolean = false;

    private isAnimating: boolean = false;

    // start () {
    //     InputManager.getInstance().on(InputTypes.Down, (data: InputManagerData) => {
    //         if (this.isAnimating) return;

    //         if (data.touchSource === InputSources.Point1) {
    //             this.point1();
    //         } else if (data.touchSource === InputSources.Point2) {
    //             this.point2();
    //         } else if (data.touchSource === InputSources.Point3) {
    //             this.point3();
    //         } else if (data.touchSource === InputSources.Point4) {
    //             this.point4();
    //         }
    //     }, this);

    //     this.action4.node.active = false;
    //     this.action2.node.active = false;
    // }

    // private point1(): void {
    //     if (this.currentState === 0 || this.currentState === 3) {
    //         this.currentState = 1;

    //         console.log(1);

    //         this.action1.node.active = false;
    //         this.action3.node.active = false;

    //         this.isAnimating = true;

    //         this.action1.run().then(() => {
    //             this.action2.node.active = true;
    //             this.isAnimating = false;
    //         });
    //     }
    // }

    // private point2(): void {
    //     if (this.currentState === 1) {
    //         this.currentState = 2;

    //         console.log(2);

    //         this.action2.node.active = false;

    //         this.isAnimating = true;

    //         this.action2.run().then(() => {
    //             !this.isLeftComplete && (this.action4.node.active = true);
    //             this.isAnimating = false;
    //         });
    //     }
    // }

    // private point3(): void {
    //     if (this.currentState === 0 && !this.isLeftComplete) {
    //         this.currentState = 3;

    //         console.log(3);

    //         this.isLeftComplete = true;

    //         this.isAnimating = true;

    //         this.action1.node.active = false;
    //         this.action3.node.active = false;

    //         this.action3.run().then(() => {
    //             this.action1.node.active = true;
    //             this.isAnimating = false;
    //         });
    //     }
    // }

    // private point4(): void {
    //     if (this.currentState === 2 && !this.isLeftComplete) {
    //         this.currentState = 4;

    //         console.log(4);

    //         this.isLeftComplete = true;

    //         this.isAnimating = true;

    //         this.action4.node.active = false;

    //         this.action4.run().then(() => {
    //             this.isAnimating = false;
    //         });
    //     }
    // }
}
