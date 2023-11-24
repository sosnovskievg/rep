

import IAction from "../IAction";
import Hero from "../../Hero";
import galController from "../../galController";
import ActionComponent from '../ActionComponent';
import Action from '../Action';

const {ccclass, property} = cc._decorator;

@ccclass('CollectBlueCrystalActionData')
export class CollectBlueCrystalActionData {
    @property(cc.Node) crystallNode: cc.Node = null;
    @property(cc.Node) crystallColliderNode: cc.Node = null;
    @property(galController) gal: galController = null;
    @property(cc.Node) blueCrystallPutActivate: cc.Node = null;

    public haveBlueCrystall: boolean = false;
}

@ccclass
export default class CollectBlueCrystalAction implements IAction {

    


    private data: CollectBlueCrystalActionData = null;

    constructor(data: CollectBlueCrystalActionData) {
        this.data = data;
    }



    public run(): Promise<void> {
        const hero = Hero.getInstance();

        if (!this.data.haveBlueCrystall) {
            this.data.haveBlueCrystall= true;
            this.data.blueCrystallPutActivate.active = true;
        this.data.crystallNode.opacity = 0;
        // this.data.gal.galInteract();
        this.data.crystallColliderNode.active = false;
        return hero.getBlueCrystall();
    }

    }

    // update (dt) {}
}
