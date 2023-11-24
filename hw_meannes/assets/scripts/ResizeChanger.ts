import Events from "./Enums/Events";
import Settings from "./Plugins/Settings";
import TransformComponent from "./Plugins/TransformComponent/TransformComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ResizeChanger extends cc.Component {
    @property() isChangingPosition: boolean = true;
    @property() positionLandscape: cc.Vec2 = cc.v2();
    @property() positionPortrait: cc.Vec2 = cc.v2();

    @property() isChangingSize: boolean = true;
    @property() sizeLandscape: cc.Size = cc.size(0, 0);
    @property() sizePortrait: cc.Size = cc.size(0, 0);

    @property() isActiveLandscape: boolean = true;
    @property() isActivePortrait: boolean = true;

    private settings: Settings = new Settings();

    onLoad () {
        if (this.isChangingPosition) {
            this.updatePosition();
        }

        if (this.isChangingSize) {
            this.updateSize();
        }

        this.updateIsActive();

        cc.systemEvent.on(Events.WINDOW_RESIZED.toString(), this.onWindowResized, this);
    }

    private updatePosition(): void {
        this.node.setPosition(this.settings.IS_LANDSCAPE ? this.positionLandscape : this.positionPortrait);
    }

    private updateSize(): void {
        this.node.setContentSize(this.settings.IS_LANDSCAPE ? this.sizeLandscape : this.sizePortrait);
    }

    private updateIsActive(): void {
        this.node.active = this.settings.IS_LANDSCAPE ? this.isActiveLandscape : this.isActivePortrait;
    }

    private updateAll(): void {
        if (this.isChangingPosition) {
            this.updatePosition();
        }

        if (this.isChangingSize) {
            this.updateSize();
        }

        this.updateIsActive();
    }

    onWindowResized(): void {
        this.updateAll();
    }
}
