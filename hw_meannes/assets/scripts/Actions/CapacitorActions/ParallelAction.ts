import IAction from "../IAction";

export default class ParallelAction implements IAction {
    private actions: IAction[] = [];

    constructor(actions: IAction[]) {
        this.actions = actions;
    }

    public run(): Promise<void> {
        if (!this.actions?.length) return Promise.resolve();
        
        return new Promise((resolve) => {
            const promiseGroup = [];

            for (let i = 0; i < this.actions.length; i++) {
                promiseGroup.push(this.actions[i].run());
            }

            Promise.any(promiseGroup).then(() => resolve());
        });
    }
}
