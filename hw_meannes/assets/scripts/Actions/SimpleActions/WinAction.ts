import Events from "../../Enums/Events";
import IAction from "../IAction";

export default class WinAction implements IAction {

    public run(): Promise<void> {
        cc.systemEvent.emit(Events.WIN.toString());

        return Promise.resolve();
    }
}