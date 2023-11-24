

import IAction from "../IAction";
import Hero from "../../Hero";
import galController from "../../galController";

const {ccclass, property} = cc._decorator;
@ccclass('DetonateTopCrystallsData')
export class DetonateTopCrystallsData {

    @property(galController) gal: galController = null;

}

@ccclass
export default class DetonateTopCrystalls implements IAction {



    private data: DetonateTopCrystallsData = null;

    constructor(data: DetonateTopCrystallsData) {
        this.data = data;
    }



    public run(): Promise<void> {
        const hero = Hero.getInstance();
        // this.data.redCrystallPutActivate.active = true;

        // if (this.data.blueCrystall) {
            // this.data.gal.galInteract();
        
        return hero.detonateTopCrystalls();
    // }

    }

    // update (dt) {}
}
