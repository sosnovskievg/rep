import IAction from "../IAction";
import Condition from "./Conditions/Condition";

const {ccclass, property} = cc._decorator;

@ccclass('ConditionActionData')
export class ConditionActionData {
    @property(Condition) condition: Condition = null;
}

export default class ConditionAction implements IAction {
    private data: ConditionActionData = null;

    constructor(data: ConditionActionData) {
        this.data = data;
    }

    public run(): Promise<void> {
        return new Promise((resolve, reject) => {
            const result = this.data.condition.check();

            if (result) {
                resolve();
            } else {
                reject();
            }
        });
    }
}
