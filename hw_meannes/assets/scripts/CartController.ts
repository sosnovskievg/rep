// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class CartController extends cc.Component {

    @property(cc.Animation) cartAnimation: cc.Animation = null;
    @property(cc.Animation) goblin3Animation: cc.Animation = null;

    @property(cc.Node) isCartToBlue: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}


    public cartController(){
        if(this.isCartToBlue.active){
            this.cartAnimation.play('cart_move_blue_goblin3');
            // this.goblin3Animation.play('goblin3_work');
        }
        else{
            this.cartAnimation.play('cart_move_green_goblin3');
            // this.goblin3Animation.play('goblin3_walk');
        }
    }

    

    public goblin3Work(){
        this.goblin3Animation.play('goblin3_work');
    }

    public goblin3Walk(){
        this.goblin3Animation.play('goblin3_walk');
    }

    start () {

    }

    // update (dt) {}
}
