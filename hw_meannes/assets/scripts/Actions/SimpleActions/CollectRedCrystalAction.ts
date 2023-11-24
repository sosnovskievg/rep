

import IAction from "../IAction";
import Hero from "../../Hero";
import galController from "../../galController";
import ActionComponent from "../ActionComponent";

const {ccclass, property} = cc._decorator;

@ccclass('CollectRedCrystalActionData')
export class CollectRedCrystalActionData {
    @property(cc.Node) crystallNode: cc.Node = null;
    @property(cc.Node) crystallColliderNode: cc.Node = null;
    @property(galController) gal: galController = null;
    @property(cc.Node) redCrystallPutActivate: cc.Node = null;



}

@ccclass
export default class CollectRedCrystalAction implements IAction {



    private data: CollectRedCrystalActionData = null;

    constructor(data: CollectRedCrystalActionData) {
        this.data = data;
    }



    public run(): Promise<void> {
        const hero = Hero.getInstance();
        this.data.redCrystallPutActivate.active = true;

        this.data.crystallNode.opacity = 0;
        // this.data.gal.galInteract();
        this.data.crystallColliderNode.active = false;

        return hero.getRedCrystall();

    }

    // update (dt) {}
}
