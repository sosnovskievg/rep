const {ccclass, property} = cc._decorator;

@ccclass
export default class goblinAnimationSwap extends cc.Component {

    @property(sp.Skeleton) goblinSkelet: sp.Skeleton = null;

   public goblinWalk(){
    this.goblinSkelet.setAnimation(0,'walk', true);
   
   }

   public goblinIdle(){
    this.goblinSkelet.setAnimation(0,'idle', true);
   
   }

    start () {

    }

    // update (dt) {}
}
