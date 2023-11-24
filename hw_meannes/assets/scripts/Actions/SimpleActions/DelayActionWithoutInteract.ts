import IAction from "../IAction";

const {ccclass, property} = cc._decorator;

@ccclass('DelayActionWithoutInteractData')
export class DelayActionWithoutInteractData {

    @property() delay: number = 0;  

}

export default class DelayActionWithoutInteract implements IAction {
    private data: DelayActionWithoutInteractData = null;

    constructor(data: DelayActionWithoutInteractData) {
        this.data = data;
    }

    public run(): Promise<void> {
        return new Promise((resolve) => {

            new cc.Component().scheduleOnce(() => {
                resolve();
            }, this.data.delay);
        });
    }
}