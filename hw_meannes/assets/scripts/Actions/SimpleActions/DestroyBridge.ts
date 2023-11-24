

import IAction from "../IAction";
import Hero from "../../Hero";
import galController from "../../galController";
import goblinAnimationSwap from "../../goblinAnimationSwap";

const {ccclass, property} = cc._decorator;
@ccclass('DestroyBridgeData')
export class DestroyBridgeData {
    @property(galController) gal: galController = null;
    @property(cc.Animation) goblin1Animation: cc.Animation = null;
}

@ccclass
export default class DestroyBridge implements IAction {



    private data: DestroyBridgeData = null;

    constructor(data: DestroyBridgeData) {
        this.data = data;
    }



    public run(): Promise<void> {
        const hero = Hero.getInstance();
        // if (this.data.blueCrystall) {
            // this.data.gal.galInteract();
        this.data.goblin1Animation.play('goblin1_walk');
        return hero.stayOnCoinLadder();
    // }

    }

    // update (dt) {}
}
