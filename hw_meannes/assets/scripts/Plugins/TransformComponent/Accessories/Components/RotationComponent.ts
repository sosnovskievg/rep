import SimpleTransformComponent from "../Base/SimpleTransformComponent";
import IConfiguration from "../Base/IConfiguration";

const { ccclass, property } = cc._decorator;

@ccclass('RotationConfiguration')
class RotationConfiguration implements IConfiguration {
    @property() rotation: number = 0;

    public applyTransform(node: cc.Node, transformReference: cc.Node) {
        node.angle = this.rotation;
    }

    public getData() {
        return { rotation: this.rotation };
    }

    public applyData(data: any) {
        this.rotation = data.rotation;
    }
}

@ccclass('RotationComponent')
export default class RotationComponent extends SimpleTransformComponent {

    @property({ type: RotationConfiguration, serializable: true, visible() { return this.isActive } }) configuration: RotationConfiguration = null;

    public execute(node: cc.Node, transformReference: cc.Node) {
        this.configuration && this.configuration.applyTransform(node, transformReference);
    }

    protected reset(isActive: boolean) {
        this.configuration = isActive ? new RotationConfiguration() : null;
    }

}
