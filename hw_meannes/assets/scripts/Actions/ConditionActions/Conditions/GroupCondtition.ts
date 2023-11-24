import ICondition from "./ICondition";

export default class GroupCondtition implements ICondition {
    private conditions: ICondition[] = [];

    constructor(conditions: ICondition[]) {
        this.conditions = conditions;
    }

    public check(): boolean {
        if (!this.conditions?.length) return true;

        for (let i = 0; i < this.conditions.length; i++) {
            if (!this.conditions[i].check()) {
                return false;
            }
        }

        return true;
    }
}
