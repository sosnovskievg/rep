

import IAction from "../IAction";
import Hero from "../../Hero";
import galController from "../../galController";

const {ccclass, property} = cc._decorator;

@ccclass('ChangeCartDirectionData')
export class ChangeCartDirectionData {

    @property(galController) gal: galController = null;

}

@ccclass
export default class ChangeCartDirection implements IAction {

    private data: ChangeCartDirectionData = null;

    constructor(data: ChangeCartDirectionData) {
        this.data = data;
    }

    public run(): Promise<void> {
        const hero = Hero.getInstance();

   
        return hero.stayOnCraneLadder();
    // }

    }

    // update (dt) {}
}
