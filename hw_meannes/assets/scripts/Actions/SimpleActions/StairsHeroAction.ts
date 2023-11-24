import Hero from "../../Hero";
import IAction from "../IAction";

const {ccclass, property} = cc._decorator;

@ccclass('StairsHeroActionData')
export class StairsHeroActionData {
    @property(cc.Node) point: cc.Node = null;
}

export default class StairsHeroAction implements IAction {
    private data: StairsHeroActionData = null;

    constructor(data: StairsHeroActionData) {
        this.data = data;
    }

    public run(): Promise<void> {
        return Hero.getInstance().stairs(this.data.point);
    }
}