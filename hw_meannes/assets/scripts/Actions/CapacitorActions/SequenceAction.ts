import IAction from "../IAction";

export default class SequenceAction implements IAction {
    private actions: IAction[] = [];

    constructor(actions: IAction[]) {
        this.actions = actions;
    }

    public run(): Promise<void> {
        if (!this.actions?.length) return Promise.resolve();
        
        return new Promise((resolve) => {
            let promise = Promise.resolve();

            for (let i = 0; i < this.actions.length; i++) {
                promise = promise.then(() => this.actions[i].run());
            }

            promise.then(resolve);
        });
    }
}
