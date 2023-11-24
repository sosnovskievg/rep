import CartController from "./CartController";
import Hero from "./Hero";
import Score from "./Score";
import PlaySoundAction, { PlaySoundActionData } from "./Actions/SimpleActions/PlaySoundAction";

const { ccclass, property } = cc._decorator;

@ccclass
export default class goblinAnimationSwap extends cc.Component {

    @property(sp.Skeleton) goblinSkelet: sp.Skeleton = null;
    @property(cc.Animation) goblin2Animation: cc.Animation = null;
    @property(cc.Animation) goblin3Animation: cc.Animation = null;
    @property(cc.Animation) cartAnimation: cc.Animation = null;
    @property(cc.Animation) craneDestroyAnimation: cc.Animation = null;
    @property(cc.Animation) bridgeFallAnimation: cc.Animation = null;
    @property(cc.Animation) topLeverAnimation: cc.Animation = null;
    @property(cc.Animation) botLeverAnimation: cc.Animation = null;
    @property(cc.Animation) goblin4Animation: cc.Animation = null;
    @property(cc.Animation) bagAnimation: cc.Animation = null;
    @property(cc.Animation) pile1Animation: cc.Animation = null;
    @property(cc.Animation) pile2Animation: cc.Animation = null;
    @property(cc.Animation) craneAnimation: cc.Animation = null;




    @property(Score) score: Score = null;
    @property(CartController) cart: CartController = null;

    @property(cc.Collider) goblinCollider: cc.Collider = null;
    @property(cc.Collider) craneCollider: cc.Collider = null;
    @property(cc.Collider) bagCollider: cc.Collider = null;
    @property(cc.RigidBody) goblinRigidBody: cc.RigidBody = null;



    public isCraneBroken: boolean = false;
    public isBridgeBroken: boolean = false;
    @property(cc.Node) isCartToBlue: cc.Node = null;
    @property(cc.Node) blueCrystallInBag: cc.Node = null;


    @property (cc.Node) coinStairsCollider: cc.Node = null;



    @property(PlaySoundActionData) explodeSound: PlaySoundActionData = null;
    @property(PlaySoundActionData) ropeSound: PlaySoundActionData = null;
    @property(PlaySoundActionData) deathSound2: PlaySoundActionData = null;

    @property() goblin2DeathSoundDelay = 0;
    @property() goblin2RocksSoundDelay = 0;

    @property() goblin4DeathSoundDelay = 0;
    @property() goblin4RocksSoundDelay = 0;

    private isCoinPlaced: boolean = false;

    public goblinWalk() {
        this.goblinSkelet.setAnimation(0, 'walk', true);

    }

    public goblinIdle() {
        this.goblinSkelet.setAnimation(0, 'idle', true);

    }

    public goblinTake() {
        this.goblinSkelet.setAnimation(0, 'take', false);
    }

    public goblinFall() {
        this.goblinSkelet.setAnimation(0, 'fall', false);

    }

    public goblinSleep() {
        this.goblinSkelet.setAnimation(0, 'sleep', true);

    }

    public goblinInteraction() {
        this.goblinSkelet.setAnimation(0, 'interaction', false);

    }

    public goblin2Death() {
        if (this.isCraneBroken) {

            this.craneDestroyAnimation.play('crane_fall_goblin2');
            
            this.goblin2Animation.stop();
            this.goblin2Animation.play('goblin2_fall');

            // this.goblinCollider.destroy();


            this.score.addPoint();
            this.score.isGoblin2Dead = true;
            this.pile1Animation.play('pilesDissapear');
            this.pile2Animation.play('pilesDissapear');
            this.scheduleOnce(() => {
                new PlaySoundAction(this.deathSound2).run();
            }, this.goblin2DeathSoundDelay);
            this.scheduleOnce(() => {
                new PlaySoundAction(this.ropeSound).run();
            }, this.goblin2RocksSoundDelay);
            
            this.scheduleOnce( () => {
                this.goblinCollider.node.active = false;

            },0.6);

        }
    }


    public goblin4Death() {
        if (this.blueCrystallInBag.active) {
            this.goblin4Animation.play('goblin4_fall');
            this.bagAnimation.play('bag_explosion_goblin4');
            this.score.addPoint();
            this.score.isGoblin4Dead = true;
            this.bagCollider.destroy();

            this.scheduleOnce(() => {
                new PlaySoundAction(this.deathSound2).run();
            }, this.goblin4DeathSoundDelay);
            this.scheduleOnce(() => {
                new PlaySoundAction(this.explodeSound).run();
            }, this.goblin4RocksSoundDelay);
    

        }
    }

    public goblin3Fall(){

        if(this.isBridgeBroken){
            this.bridgeFallAnimation.play('bridge_fall_goblin3');
            this.goblin3Animation.play('goblin3_fall');
            this.score.addPoint();
            this.score.isGoblin3Dead = true;
            // this.goblinCollider.destroy();
            // this.scheduleOnce( () => {},1);
            this.goblinCollider.node.active = false;
            
        }
    }

    public changeLane(){

        this.isCartToBlue.active = true;
        if(this.isCartToBlue){
            this.topLeverAnimation.play('lever_pull_left');
            this.botLeverAnimation.play('lever_pull_left');
        }
        else{
            this.topLeverAnimation.play('lever_pull_right');
            this.botLeverAnimation.play('lever_pull_right');
        }
        }
      


    start() {

    }

    public stopGoblin2(){
        if(this.isCoinPlaced) 
        {
            this.goblin2Animation.pause();
            this.craneAnimation.pause();
        }

    }

    public changeGoblinScale() {
        this.goblinSkelet.node.parent.scaleX = this.goblinSkelet.node.parent.scaleX * -1;

    }

    update (dt) {
        if(this.coinStairsCollider.active) this.isCoinPlaced = true;
    }
}
