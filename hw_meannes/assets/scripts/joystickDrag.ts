// import { Intersection, Touch, getPointByEvent } from '../../creator';
import CollisionCheck from './CollisionCheck';
import galController from './galController';
import Events from './Enums/Events';
const { ccclass, property } = cc._decorator;

@ccclass
export default class joystickDrag extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    @property(CollisionCheck) CollisionCheck: CollisionCheck = null;
    @property(galController) galController: galController = null;

    @property(cc.Node) joystickSprite: cc.Node = null;
    @property(cc.Node) joystickHolder: cc.Node = null;
    @property(cc.Node) backNode: cc.Node = null;
    @property(cc.Node) ellipseNode: cc.Node = null;
    @property(cc.Node) HeroNode: cc.Node = null;
    @property(cc.Node) idleNode: cc.Node = null;
    // @property(cc.Node) box: cc.Node = null;
    @property(cc.RigidBody) rigidBody: cc.RigidBody = null;


    @property(cc.Node) someNode: cc.Node = null;


    @property() tutorialExecutionTime: number = 3;
    @property() HandReturnTime: number = 3;

    private radius: number = 115;
    private x_pos: number;
    private y_pos: number;
    private def_x: number;
    private def_y: number;
    private slope: number;
    private point: number;
    private idleTime: number = 0;
    private lastPos: cc.Vec3;

    private isJoystickActive: boolean = true;


    public isMoving: boolean = false;



    onLoad() {

        this.def_x = this.joystickSprite.x;
        this.def_y = this.joystickSprite.y;

        this.backNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.backNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.backNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.backNode.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.backNode.on(cc.Node.EventType.TOUCH_START, this.backClick, this);

        this.disableJoystick();
    }
    private backClick(e: cc.Event.EventTouch) {
        if(this.isJoystickActive){

        this.joystickHolder.active = true;
        this.joystickHolder.opacity = 255;


        this.joystickHolder.setPosition(e.getLocation());
        }
    }

    private position_reset() {
        this.isMoving = false;
        this.galController.stopGalMovement();

        if(this.isJoystickActive){

        // this.isTutorialEnabled = true;
        this.joystickSprite.x = this.def_x;
        this.joystickSprite.y = this.def_y;
        this.joystickHolder.active = false;
        }

    }

    public disableJoystick(){
        this.isJoystickActive = false;
        this.joystickSprite.active = false;
        this.joystickHolder.active = false;

    }

    public activateJoystick(){
        this.isJoystickActive = true;
        this.joystickSprite.active = true;
        this.joystickHolder.active = true;

    }

    onTouchStart(e: cc.Event.EventTouch) {

        if(this.isJoystickActive){
        cc.systemEvent.emit(Events.TUTORIAL_HIDE.toString());
        this.isMoving = true;
        this.idleTime = 0;
        this.x_pos = this.joystickSprite.x;
        this.y_pos = this.joystickSprite.y;   
        return true;
        }

    }

    onTouchEnd(e: cc.Event.EventTouch) {
        
        this.position_reset();

    }

    onTouchCancel(e: cc.Event.EventTouch) {
        this.position_reset();

    }

    onTouchMove(e: cc.Event.EventTouch) {
        // if (!this.isMoving) return;

        if(this.isJoystickActive){

        this.lastPos = this.HeroNode.position;
        if (!this.isMoving) return;

        this.x_pos += e.getDelta().x;
        this.y_pos += e.getDelta().y;

        this.point = Math.sqrt(Math.pow(this.def_x - this.x_pos, 2) + Math.pow(this.def_y - this.y_pos, 2));


        this.slope = (this.y_pos - this.def_y) / (this.x_pos - this.def_x);

        const rotationAngle = Math.atan2((this.y_pos - this.def_y), (this.x_pos - this.def_x));

        const vector = cc.v2(this.radius * Math.cos(rotationAngle), this.radius * Math.sin(rotationAngle));
        const normalizedVector = vector.normalize();
        // this.joystickSprite.x = vector.x;
        // this.joystickSprite.y = vector.y;
        if (this.point >= this.radius) {

            this.joystickSprite.x = this.radius * Math.cos(rotationAngle);
            this.joystickSprite.y = this.radius * Math.sin(rotationAngle);
        }
        else{
        this.joystickSprite.x =  this.x_pos;
        this.joystickSprite.y = this.y_pos;
        }


        this.galController.moveGal(normalizedVector);


        this.galController.galrotate();
    }

    }




    protected update(dt: number): void {
             
        if (!this.isMoving) {
            this.idleTime += dt;

        }


    }

}
