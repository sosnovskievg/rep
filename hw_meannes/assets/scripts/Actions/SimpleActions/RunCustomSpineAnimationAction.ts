import IAction from "../IAction";

const {ccclass, property} = cc._decorator;

@ccclass('RunCustomSpineAnimationActionData')
export class RunCustomSpineAnimationActionData {
    @property() animationName: string = '';
    @property() isLoop: boolean = false;
    @property(sp.Skeleton) spine: sp.Skeleton = null;
}

export default class RunCustomSpineAnimationAction implements IAction {
    private data: RunCustomSpineAnimationActionData = null;

    constructor(data: RunCustomSpineAnimationActionData) {
        this.data = data;
    }

    public run(): Promise<void> {
        return new Promise((resolve) => {
            this.data.spine.setAnimation(0, this.data.animationName, this.data.isLoop);

            const duration = this.data.spine.getCurrent(0)?.animation?.duration || 0;

            new cc.Component().scheduleOnce(() => {
                resolve();
            }, duration);
        });
    }
}
