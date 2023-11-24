import Hero from "../../Hero";
import IAction from "../IAction";

const {ccclass, property} = cc._decorator;

@ccclass('LooseWeaponActionData')
export class LooseWeaponActionData {
}

export default class LooseWeaponAction implements IAction {
    private data: LooseWeaponActionData = null;

    constructor(data: LooseWeaponActionData) {
        this.data = data;
    }

    public run(): Promise<void> {
        return Hero.getInstance().looseWeapon();
    }
}