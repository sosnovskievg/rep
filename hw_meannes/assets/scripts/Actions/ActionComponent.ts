import IAction from "./IAction";
import Action from "./Action";
import Events from "../Enums/Events";
import {ActionsActionData} from "./SimpleActions/SetActiveActionsAction";
import Cursor from "../Cursor";
import ActionType from "./ActionType";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ActionComponent extends cc.Component implements IAction {
    @property() isActiveOnLoad: boolean = false;
    @property({visible: function(this) {return this.isActiveOnLoad}}) isAutoStart: boolean = false;
    @property({visible: function(this) {return !(this.isActiveOnLoad && this.isAutoStart)}}) isInputDisabled: boolean = false;
    @property() isDisabledOnComplete: boolean = true;
    @property([ActionComponent]) parallelComplete: ActionComponent[] = [];
    @property(cc.Node) tint: cc.Node = null;
    @property(cc.Node) tutorialPosition: cc.Node = null;

    @property(Action) action: Action = null;

    public isComplete: boolean = false;

    public isActive: boolean = false;

    private opacityTween: cc.Tween = null;

    protected onLoad(): void {
        if (this.isActiveOnLoad) {
            this.show();
        } else {
            this.node.opacity = 0;
        }

        if (this.tint) {
            this.tint.opacity = 0;
        }

        cc.systemEvent.on(Events.SET_ACTIVE_ACTIONS.toString(), this.onSetActiveActions, this);
        cc.systemEvent.on(Events.HIDE_ALL_ACTIONS.toString(), this.onHideAllActions, this);

        this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseEnter, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
    }

    protected start(): void {
        if (this.isActive && this.isAutoStart) {
            this.run();
        }
    }

    onEnable(): void {
        this.toggleSubscribe(true);
    };

    onDisable(): void {
        this.toggleSubscribe(false);
        this.hideTint();
    }

    onDestroy() {
        this.node.off(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
        this.node.off(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
    }

    public run(): Promise<void> {
        if (!this.action) return Promise.resolve();
        this.hideTint();

        this.isComplete = true;

        for (const action of this.parallelComplete) {
            action.isComplete = true;
        }

        cc.systemEvent.emit(Events.ACTION_RUN.toString(), this, this.parallelComplete);

        return this.action.run().then(() => {
            cc.systemEvent.emit(Events.ACTION_END.toString());
        });
    }

    private show(): void {
        if (this.isActive) {
            return;
        }

        this.isActive = true;

        if (this.opacityTween) {
            this.opacityTween.stop();
        }

        this.opacityTween = new cc.Tween(this.node).to(0.15, {opacity: 255}).start();

        this.node.zIndex = 1;
    }

    private hide(): void {
        if (!this.isActive) {
            return;
        }

        this.hideTint();

        this.isActive = false;

        if (this.opacityTween) {
            this.opacityTween.stop();
        }

        this.opacityTween = new cc.Tween(this.node).to(0.15, {opacity: 0}).start();

        this.node.zIndex = 0;
    }

    private showTint(): void {
        if (!this.isActive) return;

        // document.body.style.cursor = 'pointer';

        if (this.tint) {
            this.tint.opacity = 255;
        }
    }

    private hideTint(): void {
        // document.body.style.cursor = 'auto'

        if (this.tint) {
            this.tint.opacity = 0;
        }
    }

    private toggleSubscribe(isOn: boolean): void {
        if (!this.isAutoStart && !this.isInputDisabled) {
            const type: string = isOn ? 'on' : 'off';

            this.node[type]('touchstart', this.onActionClick, this);
        }
    }

    private onSetActiveActions(actions: ActionsActionData[]): void {
        if (this.isDisabledOnComplete && this.isComplete) {
            return;
        }
        
        for (const actionData of actions) {
            if (this === actionData.action) {
                let isBlocked = false;

                for (const blockAction of actionData.blockActions) {
                    if (!(blockAction as ActionComponent).isComplete) {
                        isBlocked = true;
                        break;
                    }
                }

                if (!isBlocked) {
                    this.show();
                    return;
                }
            }
        }

        this.hide();
    }

    private onHideAllActions(): void {
        this.hide();
    }

    private onActionClick(event): void {
        Cursor.getInstance().onDown(event, this.isActive);

        if (!this.isActive) {
            return;
        }

        cc.systemEvent.emit(Events.HIDE_ALL_ACTIONS.toString());

        this.run();
    }

    onMouseEnter(event): void {
        Cursor.getInstance().onMove(event);

        if (this.enabled && this.isActive && !this.isInputDisabled) {
            this.showTint();
        }
    }

    onMouseLeave(event): void {
        if (this.enabled && this.isActive && !this.isInputDisabled) {
            this.hideTint();
        }
    }
}
