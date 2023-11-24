import SimpleTransformComponent from "../Base/SimpleTransformComponent";
import IConfiguration from "../Base/IConfiguration";

const { ccclass, property } = cc._decorator;

@ccclass('AnchorConfiguration')
class AnchorConfiguration implements IConfiguration {
    @property(cc.Vec2) anchor: cc.Vec2 = cc.v2(.5, .5);

    public applyTransform(node: cc.Node) {
        node.setAnchorPoint(this.anchor);
    }

    public getData() {
        return { anchor: this.anchor.clone() };
    }

    public applyData(data: any) {
        this.anchor = data.anchor;
    }
}


@ccclass('AnchorComponent')
export default class AnchorComponent extends SimpleTransformComponent {

    @property({ type: AnchorConfiguration, serializable: true, visible() { return this.isActive } }) configuration: AnchorConfiguration = null;

    public execute(node: cc.Node, transformReference: cc.Node) {
        this.configuration && this.configuration.applyTransform(node);
    }

    protected reset(isActive: boolean) {
        this.configuration = isActive ? new AnchorConfiguration() : null;
    }

}
