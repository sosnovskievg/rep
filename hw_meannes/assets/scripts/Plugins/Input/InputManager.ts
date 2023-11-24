import InputTypes from "./InputTypes";
import InputSources from "./InputSources";
import Events from "../../Enums/Events";


export default class InputManager extends cc.EventTarget {
    //#region properties

    public isLockedMultiTouch: boolean = false;

    private inactiveTime: number = 0;
    private currentTouchID: any = null;
    private static instance: InputManager = null;
    private wasInaction5Sec: boolean = false;
    private wasInaction10Sec: boolean = false;
    private wasInaction15Sec: boolean = false;
    private wasFirstTap: boolean = false;

    // #endregion

    private constructor() {
        super();
        this.subscribeEvents();
    }

    //#region public methods

    public resetInactionTime() {
        this.inactiveTime = 0;
    }

    public resetInactionEvents() {
        this.wasInaction5Sec = false;
        this.wasInaction10Sec = false;
        this.wasInaction15Sec = false;
        this.resetInactionTime();
    }

    public on<T extends Function>(key: number | string, callback: T, target?: any, useCapture?: boolean): T {
        return super.on('' + key, callback, target, useCapture);
    }

    public off<T extends Function>(key: number | string, callback: T, target?: any, useCapture?: boolean): void {
        super.off('' + key, callback, target);
    }

    public static getInstance(): InputManager {
        if (this.instance === null) {
            this.instance = new InputManager();
        }

        return this.instance;
    }

    //#endregion


    //#region protected methods

    protected subscribeEvents(): void {
        cc.systemEvent.on(Events.INPUT.toString(), this.onInput, this);
    }

    //#endregion


    //#region event handlers

    private onInput(type: InputTypes, eventTouch: cc.Event.EventTouch, touchSource: InputSources): void {
        if (type === InputTypes.Down && !this.wasFirstTap) {
            this.wasFirstTap = true;
            cc.systemEvent.emit(Events.FIRST_TAP.toString());
        }

        if (this.isLockedMultiTouch && this.currentTouchID !== null && this.currentTouchID !== eventTouch.getID()) return;

        if (type === InputTypes.Up) {
            this.currentTouchID = null;
        }

        if (type === InputTypes.Down) {
            this.currentTouchID = eventTouch.getID();
        }

        this.emit(InputTypes.None.toString(), { type, eventTouch, touchSource });
        this.emit(type.toString(), { type, eventTouch, touchSource });
    }

    //#endregion
}
