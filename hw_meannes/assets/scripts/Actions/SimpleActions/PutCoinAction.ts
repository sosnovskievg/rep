

import IAction from "../IAction";
import Hero from "../../Hero";
import galController from "../../galController";

const {ccclass, property} = cc._decorator;

@ccclass('PutCoinActionData')
export class PutCoinActionData {
    @property(cc.Node) coinNode: cc.Node = null;
    @property(cc.Node) putCoinColliderNode: cc.Node = null;
    @property(galController) gal: galController = null;
    @property(cc.Node) inventoryCoin: cc.Node = null;
    @property(cc.Node) rocksCliff: cc.Node = null;
    public isPlayed:boolean = false;

}

@ccclass
export default class PutCoinAction implements IAction {



    private data:PutCoinActionData = null;
    constructor(data: PutCoinActionData) {
        this.data = data;
    }



    public run(): Promise<void> {
           
          
        if(this.data.inventoryCoin.active && !this.data.isPlayed){
            this.data.isPlayed = true;
       
        const hero = Hero.getInstance();
        this.data.coinNode.opacity = 255;
        // this.data.gal.galInteract();
        this.data.putCoinColliderNode.active = false;
            
        this.data.rocksCliff.active = true;
        return hero.putCoin();
        }
        else return;
    }

    // update (dt) {}
}
