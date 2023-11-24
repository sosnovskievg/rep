import Events from "../../Enums/Events";
import IAction from "../IAction";

const {ccclass, property} = cc._decorator;

@ccclass('ActionsActionData')
export class ActionsActionData {
    @property(cc.Component) action: cc.Component = null;
    @property([cc.Component]) blockActions: cc.Component[] = [];
}

@ccclass('SetActiveActionsActionData')
export class SetActiveActionsActionData {
    @property([ActionsActionData]) actions: ActionsActionData[] = [];
}

export default class SetActiveActionsAction implements IAction {
    private data: SetActiveActionsActionData = null;

    constructor(data: SetActiveActionsActionData) {
        this.data = data;
    }

    public run(): Promise<void> {
        cc.systemEvent.emit(Events.SET_ACTIVE_ACTIONS.toString(), this.data.actions);

        return Promise.resolve();
    }
}