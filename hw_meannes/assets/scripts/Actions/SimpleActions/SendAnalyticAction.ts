import Analytics from "../../Analytics";
import Enemy from "../../Enemy";
import Events from "../../Enums/Events";
import Hero from "../../Hero";
import IAction from "../IAction";

const {ccclass, property} = cc._decorator;

@ccclass('SendAnalyticActionData')
export class SendAnalyticActionData {
    @property() eventName: string = '';
}

export default class SendAnalyticAction implements IAction {
    private data: SendAnalyticActionData = null;

    constructor(data: SendAnalyticActionData) {
        this.data = data;
    }

    public run(): Promise<void> {
        if (this.data.eventName) {
            Analytics.sendEvent(this.data.eventName);
        }

        return Promise.resolve();
    }
}
