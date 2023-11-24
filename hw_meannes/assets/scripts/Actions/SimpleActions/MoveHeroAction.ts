import Hero from "../../Hero";
import IAction from "../IAction";

const {ccclass, property} = cc._decorator;

@ccclass('MoveHeroActionData')
export class MoveHeroActionData {
    @property(cc.Node) point: cc.Node = null;
}

export default class MoveHeroAction implements IAction {
    private data: MoveHeroActionData = null;

    constructor(data: MoveHeroActionData) {
        this.data = data;
    }

    public run(): Promise<void> {
        return Hero.getInstance().move(this.data.point);
    }
}