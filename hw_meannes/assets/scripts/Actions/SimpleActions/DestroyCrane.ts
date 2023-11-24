

import IAction from "../IAction";
import Hero from "../../Hero";
import galController from "../../galController";

const {ccclass, property} = cc._decorator;
@ccclass('DestroyCraneData')
export class DestroyCraneData {
    @property(galController) gal: galController = null;
    @property(cc.Collider) craneCollider: cc.Collider = null;

}

@ccclass
export default class DestroyCrane implements IAction {



    private data: DestroyCraneData = null;

    constructor(data: DestroyCraneData) {
        this.data = data;
    }



    public run(): Promise<void> {
        const hero = Hero.getInstance();
            this.data.craneCollider.destroy();
        // if (this.data.blueCrystall) {
            // this.data.gal.galInteract();


        return hero.destroyCrane();
    // }

    }

    // update (dt) {}
}
