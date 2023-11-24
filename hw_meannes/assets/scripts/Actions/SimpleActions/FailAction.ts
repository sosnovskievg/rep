import Events from "../../Enums/Events";
import IAction from "../IAction";

export default class FailAction implements IAction {

    public run(): Promise<void> {
        cc.systemEvent.emit(Events.FAIL.toString());

        return Promise.resolve();
    }
}