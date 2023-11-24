

import IAction from "../IAction";
import Hero from "../../Hero";
import galController from "../../galController";
import Score from "../../Score";

const {ccclass, property} = cc._decorator;

@ccclass('CollectCoinActionData')
export class CollectCoinActionData {
    @property(cc.Node) coinNode: cc.Node = null;
    @property(cc.Node) collectCoinColliderNode: cc.Node = null;
    @property(galController) gal: galController = null;
    @property(Score) score: Score = null;
    @property(cc.Node) putCoinNode: cc.Node = null;

}

@ccclass
export default class CollectCoinAction implements IAction {

    private data: CollectCoinActionData = null;

    constructor(data: CollectCoinActionData) {
        this.data = data;
    }
  
    public run(): Promise<void> {
        const hero = Hero.getInstance();
        this.data.putCoinNode.active = true;   
        this.data.coinNode.opacity = 0;
        // this.data.gal.galInteract();
        this.data.collectCoinColliderNode.active = false;
        // this.data.score.addPoint();
        return hero.getCoin();

    }

    // update (dt) {}
}
