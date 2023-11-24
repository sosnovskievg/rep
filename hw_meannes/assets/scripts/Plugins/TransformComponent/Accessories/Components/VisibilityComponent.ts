import SimpleTransformComponent from "../Base/SimpleTransformComponent";
import IConfiguration from "../Base/IConfiguration";

const { ccclass, property } = cc._decorator;

@ccclass('VisibilityConfiguration')
class VisibilityConfiguration implements IConfiguration {
    @property(cc.Float) opacity: number = 255;
    @property(cc.Color) color: cc.Color = cc.color(255, 255, 255, 255);

    public applyTransform(node: cc.Node, transformReference: cc.Node) {
        node.opacity = this.opacity;
        node.color = this.color;
    }

    public getData() {
        return {
            opacity: this.opacity,
            color: this.color.clone(),
        };
    }

    public applyData(data: any) {
        this.opacity = data.opacity;
        this.color = data.color;
    }
}


@ccclass('VisibilityComponent')
export default class VisibilityComponent extends SimpleTransformComponent {

    @property({ type: VisibilityConfiguration, serializable: true, visible() { return this.isActive } }) configuration: VisibilityConfiguration = null;

    public execute(node: cc.Node, transformReference: cc.Node) {
        this.configuration && this.configuration.applyTransform(node, transformReference);
    }

    protected reset(isActive: boolean) {
        this.configuration = isActive ? new VisibilityConfiguration() : null;
    }

}