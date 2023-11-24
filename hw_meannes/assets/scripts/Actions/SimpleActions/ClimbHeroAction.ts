import Hero from "../../Hero";
import IAction from "../IAction";

const {ccclass, property} = cc._decorator;

@ccclass('ClimbHeroActionData')
export class ClimbHeroActionData {
    @property(cc.Node) point: cc.Node = null;
    @property scaleX: number = 1;
}

export default class ClimbHeroAction implements IAction {
    private data: ClimbHeroActionData = null;

    constructor(data: ClimbHeroActionData) {
        this.data = data;
    }

    public run(): Promise<void> {
        return Hero.getInstance().climb(this.data.point, this.data.scaleX);
    }
}