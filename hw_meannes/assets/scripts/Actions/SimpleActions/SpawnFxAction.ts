import IAction from "../IAction";

const {ccclass, property} = cc._decorator;

@ccclass('SpawnFxActionData')
export class SpawnFxActionData {
    @property(cc.Prefab) prefab: cc.Prefab = null;
    @property(cc.Node) holdeer: cc.Node = null;
    @property(Number) offsetX: number = 0;
    @property(Number) offsetY: number = 0;

}

export default class SpawnFxAction implements IAction {
    private data: SpawnFxActionData = null;

    constructor(data: SpawnFxActionData) {
        this.data = data;
    }

    public run(): Promise<void> {
        const fx = cc.instantiate(this.data.prefab);

        fx.setParent(this.data.holdeer.parent);
        // const worldPos = parent.convertToWorldSpaceAR(cc.v2(this.data.holdeer.x,this.data.holdeer.y));
        fx.setPosition(cc.v2(this.data.holdeer.x + this.data.offsetX,this.data.holdeer.y+ this.data.offsetY));
        fx.setScale(1, 1);

        return Promise.resolve();
    }
}