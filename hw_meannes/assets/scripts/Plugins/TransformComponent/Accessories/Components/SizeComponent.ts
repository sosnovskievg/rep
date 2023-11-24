import SimpleTransformComponent from "../Base/SimpleTransformComponent";
import IConfiguration from "../Base/IConfiguration";

const { ccclass, property } = cc._decorator;

@ccclass('SizeConfiguration')
class SizeConfiguration implements IConfiguration {
    @property(cc.Size) size: cc.Size = cc.size(1, 1);

    public applyTransform(node: cc.Node) {
        // node.angle = this.rotation;
        node.width = this.size.width;
        node.height = this.size.height;
    }

    public getData() {
        return { size: this.size.clone() };
    }

    public applyData(data: any) {
        this.size = data.size;
    }
}


@ccclass('SizeComponent')
export default class SizeComponent extends SimpleTransformComponent {

    @property({ type: SizeConfiguration, serializable: true, visible() { return this.isActive } }) configuration: SizeConfiguration = null;

    public execute(node: cc.Node, transformReference: cc.Node) {
        this.configuration && this.configuration.applyTransform(node);
    }

    protected reset(isActive: boolean) {
        this.configuration = isActive ? new SizeConfiguration() : null;
    }

}
