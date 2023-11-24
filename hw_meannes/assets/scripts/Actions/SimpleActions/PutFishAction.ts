

import IAction from "../IAction";
import Hero from "../../Hero";
import galController from "../../galController";
import ActionComponent from "../ActionComponent";
import Inventory from "../../Inventory";

const {ccclass, property} = cc._decorator;

@ccclass('PutFishActionData')
export class PutFishActionData {
    @property(cc.Node) fishNode: cc.Node = null;
    @property(cc.Node) putFishColliderNode: cc.Node = null;
    @property(galController) gal: galController = null;
    @property(ActionComponent) action: ActionComponent = null;
    @property(cc.Node) inventoryFish: cc.Node = null;


}

@ccclass
export default class PutFishAction implements IAction {


    private data:PutFishActionData = null;

    constructor(data: PutFishActionData) {
        this.data = data;
    }



    public run(): Promise<void> {
        if(this.data.inventoryFish.active){
        const fish = this.data.fishNode;
        const hero = Hero.getInstance();
        this.data.action.action.actions = null;

        fish.opacity = 255;   
        // this.data.gal.galInteract();
        // this.data.putFishColliderNode.active = false;

        return hero.putFish();
        }

        else return;
    }

    // update (dt) {}
}
