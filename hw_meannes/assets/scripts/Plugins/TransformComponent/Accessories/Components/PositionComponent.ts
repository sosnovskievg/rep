import SimpleTransformComponent from "../Base/SimpleTransformComponent";
import Settings from "../../../Settings";
import IConfiguration from "../Base/IConfiguration";

const { ccclass, property } = cc._decorator;

enum PositionType {
    Relative = 0,
    Absolute = 1,
}

enum LayerType {
    UI = 0,
    World = 1,
}


@ccclass('PositionConfiguration')
class PositionConfiguration implements IConfiguration {

    // #region fields

    @property({ type: cc.Enum(PositionType) }) positionType: PositionType = PositionType.Relative;
    @property({ type: cc.Enum(LayerType) }) layer: LayerType = LayerType.UI;

    @property(cc.Vec2) position: cc.Vec2 = cc.v2(0, 0);
    @property(cc.Vec2) offset: cc.Vec2 = cc.v2(0, 0);

    private settings: Settings = new Settings();

    // #endregion


    // #region public methods

    public applyTransform(node: cc.Node, transformReference: cc.Node, isCondsiderReferenceScale: boolean = false) {
        let newPosition = cc.v2();
        let targetPosition = this.position.clone();
        let referenceSize = this.checkTransformReference(transformReference, isCondsiderReferenceScale);

        if (this.positionType === PositionType.Relative) {
            if (!referenceSize) referenceSize = this.calculateReferenceSize();

            newPosition = this.calculatePositionByRefSize(targetPosition, referenceSize);
        } else if (this.positionType === PositionType.Absolute) {
            newPosition = targetPosition.clone().mul(this.layer === LayerType.UI ?
                this.settings.SCALE :
                1
            );
        }

        this.applyOffset(newPosition, this.offset, this.layer);
        this.applyPosition(node, newPosition)
    }

    // #endregion


    // #region private methods

    private checkTransformReference(transformReference: cc.Node, isCondsiderReferenceScale: boolean) {
        if (!transformReference) return null;

        return cc.size(
            transformReference.width * (isCondsiderReferenceScale ? transformReference.scaleX : 1),
            transformReference.height * (isCondsiderReferenceScale ? transformReference.scaleY : 1),
        );
    }

    private calculateReferenceSize(): cc.Size {
        let referenceSize = null

        if (this.layer === LayerType.UI) {
            referenceSize = cc.size(this.settings.GAME_WIDTH, this.settings.GAME_HEIGHT);
        } else if (this.layer === LayerType.World) {
            referenceSize = cc.size(this.settings.WORLD_HEIGHT, this.settings.WORLD_WIDTH);
        } else {
            referenceSize = cc.size(1, 1);
        }

        return referenceSize;
    }

    private applyOffset(targetPosition: cc.Vec2, offset: cc.Vec2, layer: LayerType) {
        return targetPosition.addSelf(offset.mul(layer === LayerType.UI ? this.settings.SCALE : 1));
    }

    private applyPosition(node: cc.Node, position: cc.Vec2) {
        node.setPosition(position);
    }

    private calculatePositionByRefSize(relativePositon: cc.Vec2, referenceSize: cc.Size) {
        return cc.v2(referenceSize.width * relativePositon.x, referenceSize.height * relativePositon.y);
    }

    // #endregion


    // #region import/export methods

    public getData() {
        return {
            positionType: this.positionType,
            layer: this.layer,
            position: this.position.clone(),
            offset: this.offset.clone(),
        };
    }

    public applyData(data: any) {
        this.positionType = data.positionType;
        this.layer = data.layer;
        this.position = data.position;
        this.offset = data.offset;
    }

    // #endregion
}


@ccclass('PositionComponent')
export default class PositionComponent extends SimpleTransformComponent {

    @property({ type: PositionConfiguration, serializable: true, visible() { return this.isActive } }) configuration: PositionConfiguration = null;

    public execute(node: cc.Node, transformReference: cc.Node) {
        this.configuration && this.configuration.applyTransform(node, transformReference);
    }

    protected reset(isActive: boolean) {
        this.configuration = isActive ? new PositionConfiguration() : null;
    }

}
