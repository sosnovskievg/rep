// import { BoxCollider } from '../../creator';
// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class CollisionCheck extends cc.Component {


    @property (cc.Collider) MapCollider: cc.Collider = null;
    @property (cc.Collider) GalCollider: cc.Collider = null;
    public isIntersected: boolean = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabled = true;
        // this.MapCollider.node.on(cc.Node.EventType.TOUCH_START, this.checkCollision, this);
    }

    private checkCollision() {
        // if (cc.Intersection.polygonPolygon(this.MapCollider.world.points, this.GalCollider.world.points)) {
        //     this.isIntersected = true;


        // }
        // else this.isIntersected = false;

    }

    
    start() {

    }

    update (dt) {
        this.checkCollision();
    }
}
