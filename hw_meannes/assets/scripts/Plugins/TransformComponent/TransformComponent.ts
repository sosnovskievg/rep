import Settings from "../Settings";
import Events from "../../Enums/Events";
import TransformController from "./Accessories/TransformController";

const { ccclass, property, menu } = cc._decorator;

@ccclass
@menu('Transform/TransformComponent')
export default class TransformComponent extends cc.Component {
    @property(cc.Node) transformReference: cc.Node = null;

    @property _isSameTransform: boolean = true;
    @property
    set isSameTransform(v: boolean) {
        this._isSameTransform = v;

        if (this._isSameTransform) {
            this.commonTransform = this.landscapeTransform.clone();

            this.landscapeTransform = null;
            this.portraitTransform = null;
        } else {
            this.landscapeTransform = this.commonTransform.clone();
            this.portraitTransform = this.commonTransform.clone();

            this.commonTransform = null;
        }
    };
    get isSameTransform(): boolean { return this._isSameTransform };


    @property _isDependingOnSideRatio: boolean = false;
    @property
    set isDependingOnSideRatio(v: boolean) {
        this._isDependingOnSideRatio = v;

        if (this.isDependingOnSideRatio) {
            if (this.isSameTransform) {
                this.commonTransformBelowSideRatio = this.commonTransform.clone();
            } else {
                this.portraitTransformBelowSideRatio = this.portraitTransform.clone();
                this.landscapeTransformBelowSideRatio = this.landscapeTransform.clone();
            }
        } else {
            this.commonTransformBelowSideRatio = null;
            this.portraitTransformBelowSideRatio = null;
            this.landscapeTransformBelowSideRatio = null;
        }
    }

    get isDependingOnSideRatio(): boolean {
        return this._isDependingOnSideRatio;
    }

    @property({ visible() { return this.isDependingOnSideRatio; } }) limitSideRatio: number = 1.35;


    @property({ type: TransformController, visible() { return this.isSameTransform; } }) commonTransform: TransformController = new TransformController();
    @property({ type: TransformController, visible() { return this.isSameTransform && this.isDependingOnSideRatio; } }) commonTransformBelowSideRatio: TransformController = new TransformController();

    @property({ type: TransformController, visible() { return !this.isSameTransform; } }) landscapeTransform: TransformController = new TransformController();
    @property({ type: TransformController, visible() { return !this.isSameTransform && this.isDependingOnSideRatio; } }) landscapeTransformBelowSideRatio: TransformController = new TransformController();

    @property({ type: TransformController, visible() { return !this.isSameTransform; } }) portraitTransform: TransformController = new TransformController();
    @property({ type: TransformController, visible() { return !this.isSameTransform && this.isDependingOnSideRatio; } }) portraitTransformBelowSideRatio: TransformController = new TransformController();


    private settings: Settings = new Settings();

    onLoad() {
        this.subscribeEvents();

        if (this.commonTransform) this.commonTransform.transformReference = this.transformReference;
        if (this.commonTransformBelowSideRatio) this.commonTransformBelowSideRatio.transformReference = this.transformReference;
        if (this.landscapeTransform) this.landscapeTransform.transformReference = this.transformReference;
        if (this.landscapeTransformBelowSideRatio) this.landscapeTransformBelowSideRatio.transformReference = this.transformReference;
        if (this.portraitTransform) this.portraitTransform.transformReference = this.transformReference;
        if (this.portraitTransformBelowSideRatio) this.portraitTransformBelowSideRatio.transformReference = this.transformReference;
    }

    private subscribeEvents() {
        cc.systemEvent.on(Events.WINDOW_RESIZED.toString(), this.onSizeChanged, this);
    }

    private getCurrentTransform(): TransformController {
        let currentTransform = null;

        let sideRatio = Math.max(this.settings.GAME_WIDTH, this.settings.GAME_HEIGHT) / Math.min(this.settings.GAME_WIDTH, this.settings.GAME_HEIGHT);
        let isUsingTransformBelowSideRatio = this.isDependingOnSideRatio && (sideRatio < this.limitSideRatio);


        if (this.isSameTransform) {
            currentTransform = isUsingTransformBelowSideRatio ? this.commonTransformBelowSideRatio : this.commonTransform;
        } else {
            if (this.settings.IS_LANDSCAPE) {
                currentTransform = isUsingTransformBelowSideRatio ? this.landscapeTransformBelowSideRatio : this.landscapeTransform;
            } else {
                currentTransform = isUsingTransformBelowSideRatio ? this.portraitTransformBelowSideRatio : this.portraitTransform;
            }
        }

        return currentTransform;
    }

    public onSizeChanged() {
        const transform = this.getCurrentTransform();
        transform.setNodeTransform(this.node);
    }
}
