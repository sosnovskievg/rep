

import IAction from "../IAction";
import Hero from "../../Hero";
import galController from "../../galController";
import CollectBlueCrystalAction from "./CollectBlueCrystalAction";
import { Collider } from '../../../../creator';


const {ccclass, property} = cc._decorator;
@ccclass('putBlueCrystallData')
export class putBlueCrystallData {
    // @property(cc.Node) blueCrystall: cc.Node = null;
    @property(galController) gal: galController = null;
    @property(cc.Node) bag: cc.Node = null;
}

@ccclass
export default class putBlueCrystall implements IAction {

    private data: putBlueCrystallData = null;

    constructor(data: putBlueCrystallData) {
        this.data = data;
    }



    public run(): Promise<void> {
        const hero = Hero.getInstance();

        // if (this.data.blueCrystall) {
           
        // this.data.gal.galInteract();
        this.data.bag.active = false;
        return hero.putBlueCrystall();
    // }

    }

    // update (dt) {}
}
