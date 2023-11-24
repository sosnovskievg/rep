import ActionComponent from "./Actions/ActionComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RunInitialPoint extends cc.Component {

    @property(ActionComponent) action: ActionComponent = null;
    @property(ActionComponent) actionNoIntro: ActionComponent = null;

    protected onLoad(): void {
        if (window.IS_RESTART) {
            this.actionNoIntro.run();
        } else {
            this.action.run();
        }
    }
}
