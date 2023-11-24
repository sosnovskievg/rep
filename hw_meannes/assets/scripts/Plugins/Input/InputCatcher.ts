import InputSources from "./InputSources";
import InputTypes from "./InputTypes";
import Events from "../../Enums/Events";


const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu('Input/Catcher')
export default class InputCather extends cc.Component {
    @property({ type: cc.Enum(InputSources) }) inputSource = InputSources.Default;

    onEnable(): void {
        this.toggleSubscribe(true);
    };

    onDisable(): void {
        this.toggleSubscribe(false);
    }

    private toggleSubscribe(isOn: boolean): void {
        const type: string = isOn ? 'on' : 'off';

        this.node[type]('touchstart', this.onDown, this);
        this.node[type]('touchmove', this.onMove, this);
        this.node[type]('touchend', this.onUp, this);
        this.node[type]('touchcancel', this.onUp, this);
    }

    private onDown(eventTouch): void {
        cc.systemEvent.emit(Events.INPUT.toString(), InputTypes.Down, eventTouch, this.inputSource);
    }

    private onMove(eventTouch): void {
        cc.systemEvent.emit(Events.INPUT.toString(), InputTypes.Move, eventTouch, this.inputSource);
    }

    private onUp(eventTouch): void {
        cc.systemEvent.emit(Events.INPUT.toString(), InputTypes.Up, eventTouch, this.inputSource);
    }
}