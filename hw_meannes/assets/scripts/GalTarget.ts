import ActionComponent from "./Actions/ActionComponent";
import galController from "./galController";


const {ccclass, property} = cc._decorator;

@ccclass
export default class GalTarget extends cc.Component {

    @property(ActionComponent) actionComponent: ActionComponent = null;
    

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}


    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider): void {
        const gal = otherCollider.node.getComponent(galController);
        if (gal) {
            switch (selfCollider.name) {
                case 'coinPut':
                    
                    break;
            
                default:
                    break;
            }

            // if (this.actionComponent.isComplete) {

            //     return;
            // }

            // this.actionComponent.isComplete = true;

            gal.animate();
            
            this.actionComponent.action.run().then(() => {
                gal.stopAnimate();
            });
        
    
        }

    }

}
