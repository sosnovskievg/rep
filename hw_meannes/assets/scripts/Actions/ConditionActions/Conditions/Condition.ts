import ConditionType from "./ConditionType";
import GroupCondtition from "./GroupCondtition";
import ICondition from "./ICondition";
import PowerCondition, {PowerConditionData} from "./PowerCondition";

const {ccclass, property} = cc._decorator;

const manyConditionsTypes = [
    ConditionType.Group,
];

@ccclass('Condition')
export default class Condition implements ICondition {
    @property({type: cc.Enum(ConditionType)}) type: ConditionType = ConditionType.Group;

    // GroupCondition
    @property({type: [Condition], visible: function (this) {return manyConditionsTypes.includes(this.type)}}) conditions: Condition[] = [];

    // PowerCondition
    @property({type: PowerConditionData, visible: function (this) {return this.type === ConditionType.Power}}) powerConditionData: PowerConditionData = null;

    public check(): boolean {
        let result = true;

        if (manyConditionsTypes.includes(this.type) && !this.conditions?.length) return true;

        switch (this.type) {
            case ConditionType.Group:
                result = new GroupCondtition(this.conditions).check();
                break;
            case ConditionType.Power:
                result = new PowerCondition(this.powerConditionData).check();
                break;
            default:
                result = true;
                break;
        }

        return result;
    }
}
