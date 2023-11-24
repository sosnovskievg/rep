import InputManager from "./Plugins/Input/InputManager";
import {InputManagerData} from "./Plugins/Input/InputManagerData";
import InputTypes from "./Plugins/Input/InputTypes";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Cursor extends cc.Component {
    @property(cc.Node) cursor: cc.Node = null;
    @property(cc.Node) inputZone: cc.Node = null;
    @property(cc.Animation) animation: cc.Animation = null;
    @property(cc.Prefab) activeActionEffect: cc.Prefab = null;

    onLoad () {
        const canvas = document.getElementById("GameCanvas");

        canvas.style.cursor = "none";

        this.inputZone.on('mousemove', this.onMove, this);

        InputManager.getInstance().on(InputTypes.None, this.onInput, this);

        Cursor.instance = this;
    }

    onInput(data: InputManagerData): void {
        switch (data.type) {
            case InputTypes.Down:
                this.onDown(data);
                break;
            case InputTypes.Up:
                this.onUp(data);
                break;
        }
    }

    onDown(data: InputManagerData, isActiveClick: boolean = false): void {
        if (this.animation) {
            this.animation.play();
        }

        if (this.activeActionEffect && isActiveClick) {
            const effect = cc.instantiate(this.activeActionEffect);
            effect.setParent(this.node.parent);
            effect.setPosition(this.node.position);
        }
    }

    onUp(data: InputManagerData): void { }

    onMove(event): void {
        event._propagationStopped = false;

        this.cursor.setPosition(event.getLocation());
    }

    static getInstance(): Cursor {
        if (this.instance) {
            return this.instance;
        }

        return null;
    }

    static instance: Cursor;
}
