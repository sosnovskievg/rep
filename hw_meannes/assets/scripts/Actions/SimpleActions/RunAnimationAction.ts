import IAction from "../IAction";

const {ccclass, property} = cc._decorator;

@ccclass('RunAnimationActionData')
export class RunAnimationActionData {
    @property() animationName: string = '';
    @property(cc.Animation) animation: cc.Animation = null;
}

export default class RunAnimationAction implements IAction {
    private data: RunAnimationActionData = null;

    constructor(data: RunAnimationActionData) {
        this.data = data;
    }

    public run(): Promise<void> {
        return new Promise((resolve) => {
            this.data.animation.play(this.data.animationName);
            
            this.data.animation.once(cc.Animation.EventType.FINISHED, () => {
                resolve();
            })
        });
    }
}