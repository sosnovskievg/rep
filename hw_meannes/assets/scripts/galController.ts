import Hero from "./Hero";
import Events from './Enums/Events';

enum GalMovementState {
    Idle = 0,
    MoveLeft,
    MoveRight,
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class galController extends Hero {

    @property(sp.Skeleton) galSkelet: sp.Skeleton = null;

    @property(cc.Node) joystickController: cc.Node = null;

    @property(cc.RigidBody) rigidBodyGal: cc.RigidBody = null;
    @property(cc.PhysicsCollider) GalPhysicsCollider: cc.PhysicsCollider = null;

    @property(cc.RigidBody) rigidBodyBlueCrystall: cc.RigidBody = null;
    @property(cc.PhysicsCollider) blueCrystallCollider: cc.PhysicsCollider = null;


    private currentGalMovementState: GalMovementState = GalMovementState.Idle;

    public isAnimating: boolean = false;

    // LIFE-CYCLE CALLBACKS:

    // onLoad() {
     
    // }

    // start() {

    // }

    public galrotate() {
        if (this.isAnimating) return;

        if ([GalMovementState.Idle, GalMovementState.MoveRight].includes(this.currentGalMovementState) && this.joystickController.x < 0) {
            this.currentGalMovementState = GalMovementState.MoveLeft;
            this.galSkelet.setAnimation(0, 'run_sw', true);
            this.galSkelet.node.scaleX = -0.3;
        }
        if ([GalMovementState.Idle, GalMovementState.MoveLeft].includes(this.currentGalMovementState) && this.joystickController.x > 0) {
            this.currentGalMovementState = GalMovementState.MoveRight;
            this.galSkelet.setAnimation(0, 'run_sw', true);
            this.galSkelet.node.scaleX = 0.3;
        }
    }

    public moveGal(normalizedVector: cc.Vec2) {
        if (this.isAnimating) return;

        this.rigidBodyGal.linearVelocity = normalizedVector.mul(100);
    }



    public stopGalMovement() {
        if (this.isAnimating) return;

        this.currentGalMovementState = GalMovementState.Idle;
        this.rigidBodyGal.linearVelocity = cc.Vec2.ZERO;
        this.galSkelet.setAnimation(0, 'idle', true);


    }


    public animate() {
        if (this.isAnimating) return;

        this.stopGalMovement();
    
        this.isAnimating = true;
        cc.systemEvent.emit(Events.TUTORIAL_HIDE.toString());
        
    }

    public stopAnimate() {
        this.isAnimating = false;
    }

    update(dt) {
        // this.galrotate();
    }

    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider): void {
        
    }

    public galInteract(){
        this.galSkelet.setAnimation(0, 'interruction', false);
  
    }

    public galWin(){
    this.galSkelet.setAnimation(0,'win',false);
    this.galStop();

    }

    public galLose(){
        this.stopGalMovement();
       this.isAnimating = true;
       this.galStop();
    this.galSkelet.setAnimation(0,'death_back',false);

    }


    public galStop() {
        this.rigidBodyGal.linearVelocity = cc.v2(0,0);
    }
    
}
