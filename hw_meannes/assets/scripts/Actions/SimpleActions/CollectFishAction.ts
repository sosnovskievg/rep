

import IAction from "../IAction";
import Hero from "../../Hero";
import galController from "../../galController";

const {ccclass, property} = cc._decorator;

@ccclass('CollectFishData')
export class CollectFishData {
    @property(cc.Node) fishNode: cc.Node = null;
    @property(cc.Node) collectFishColliderNode: cc.Node = null;
    @property(galController) gal: galController = null;
    @property(cc.Node) putFishNode: cc.Node = null;
}

@ccclass
export default class CollectFishAction implements IAction {




    private data: CollectFishData = null;

    constructor(data: CollectFishData) {
        this.data = data;
    }



    public run(): Promise<void> {
        const hero = Hero.getInstance();
        this.data.putFishNode.active = true;   
        this.data.fishNode.opacity = 0;
        // this.data.gal.galInteract();
        this.data.collectFishColliderNode.active = false;

        return hero.getFish();

    }

    // update (dt) {}
}
