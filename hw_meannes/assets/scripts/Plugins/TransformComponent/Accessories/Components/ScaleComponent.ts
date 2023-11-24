import SimpleTransformComponent from "../Base/SimpleTransformComponent";
import Settings from "../../../Settings";
import IConfiguration from "../Base/IConfiguration";

const { ccclass, property } = cc._decorator;


enum ProportionType {
    Proportional = 0,
    Unproportional = 1,
}

enum FitMode {
    Inscribe = 0,
    Describe = 1,
    FitWidth = 3,
    FitHeight = 4,
    Unproportional = 5,
    Default = 6,
}

enum SizeMode {
    Relative = 0,
    Constant = 1,
}

enum LayerType {
    UI = 0,
    World = 1,
}


@ccclass('ScaleConfiguration')
class ScaleConfiguration implements IConfiguration {

    // #region fields

    @property({ type: cc.Enum(SizeMode) }) sizeMode: SizeMode = SizeMode.Relative;
    @property({ type: cc.Enum(FitMode) }) fitMode: FitMode = FitMode.Inscribe;
    @property({ type: cc.Enum(LayerType) }) layer: LayerType = LayerType.UI;
    @property(cc.Vec2) desiredSize: cc.Vec2 = cc.v2();

    @property({ visible() { return this.sizeMode === SizeMode.Relative } }) padding: cc.Vec2 = cc.v2();

    private settings: Settings = new Settings();

    // #endregion


    // #region public methods

    public applyTransform(node: cc.Node, transformReference: cc.Node, isCondsiderReferenceScale: boolean = false) {
        let referenceSize: cc.Vec2 = this.checkTransformReference(transformReference, isCondsiderReferenceScale);
        if (!referenceSize) referenceSize = this.calculateReferenceSize();

        let newScale = cc.v2();
        let actualDesiredSize = this.calculateActualSize(referenceSize);
        let targetScale = cc.v2(
            actualDesiredSize.x / node.width,
            actualDesiredSize.y / node.height,
        );

        newScale = this.calculateTargetScale(this.fitMode, targetScale, cc.v2(node.scaleX, node.scaleY), actualDesiredSize);

        node.scaleX = newScale.x;
        node.scaleY = newScale.y
    }

    // #endregion


    // #region private methods

    private checkTransformReference(transformReference: cc.Node, isCondsiderReferenceScale: boolean): cc.Vec2 {
        if (!transformReference) return null;

        return cc.v2(
            transformReference.width * (isCondsiderReferenceScale ? transformReference.scaleX : 1),
            transformReference.height * (isCondsiderReferenceScale ? transformReference.scaleY : 1),
        );
    }

    private calculateReferenceSize(): cc.Vec2 {
        let referenceSize = null

        if (this.layer === LayerType.UI) {
            referenceSize = cc.v2(this.settings.GAME_WIDTH, this.settings.GAME_HEIGHT);
        } else if (this.layer === LayerType.World) {
            referenceSize = cc.v2(this.settings.WORLD_HEIGHT, this.settings.WORLD_WIDTH);
        } else {
            referenceSize = cc.v2(1, 1);
        }
        return referenceSize;
    }

    private calculateTargetScale(fitMode: FitMode, necessaryScale: cc.Vec2, currentNodeScale: cc.Vec2, desiredSize: cc.Vec2): cc.Vec2 {
        let ts = necessaryScale.clone();

        switch (true) {
            case (fitMode === FitMode.Inscribe): {
                ts.x = ts.y = Math.min(ts.x, ts.y);
            } break;

            case (fitMode === FitMode.Describe): {
                ts.x = ts.y = Math.max(ts.x, ts.y);
            } break;

            case (fitMode === FitMode.FitHeight): {
                ts.x = ts.y;
            } break;

            case (fitMode === FitMode.FitWidth): {
                ts.y = ts.x;
            } break;

            case (fitMode === FitMode.Unproportional): {
                if (this.sizeMode === SizeMode.Constant) {
                    ts = desiredSize.clone();
                }
            } break;

            case (fitMode === FitMode.Default): {
                ts = this.calculateTargetScale(FitMode.Inscribe, necessaryScale, currentNodeScale, desiredSize);
            } break;
        }

        return ts;
    }

    private calculateActualSize(referenceSize: cc.Vec2): cc.Vec2 {
        let desiredSize = null;

        switch (true) {
            case (this.sizeMode === SizeMode.Relative && this.layer === LayerType.UI): {
                desiredSize = this.calculateSizeByRelativeSize(this.desiredSize, referenceSize).sub(this.padding.mul(this.settings.SCALE));
            } break;

            case (this.sizeMode === SizeMode.Relative && this.layer === LayerType.World): {
                desiredSize = this.calculateSizeByRelativeSize(this.desiredSize, referenceSize);
            } break;

            case (this.sizeMode === SizeMode.Constant && this.layer === LayerType.UI): {
                desiredSize = this.desiredSize.clone().mul(this.settings.SCALE);
            } break;

            case (this.sizeMode === SizeMode.Constant && this.layer === LayerType.World): {
                desiredSize = this.desiredSize.clone();
            } break;

            default: {
                desiredSize = cc.v2(1, 1);
            } break;
        }

        return desiredSize;
    }

    private calculateSizeByRelativeSize(relativeSize: cc.Vec2, referenceSize: cc.Vec2): cc.Vec2 {
        return cc.v2(
            referenceSize.x * relativeSize.x,
            referenceSize.y * relativeSize.y,
        );
    }

    // #endregion


    // #region import/export methods

    public getData() {
        return {
            sizeMode: this.sizeMode,
            fitMode: this.fitMode,
            layer: this.layer,
            desiredSize: this.desiredSize,
            padding: this.padding,
        }
    }

    public applyData(data: any) {
        this.sizeMode = data.sizeMode;
        this.fitMode = data.fitMode;
        this.layer = data.layer;
        this.desiredSize = data.desiredSize.clone();
        this.padding = data.padding.clone();
    }

    // #endregion

}

@ccclass('ScaleComponent')
export default class ScaleComponent extends SimpleTransformComponent {


    @property({ type: ScaleConfiguration, serializable: true, visible() { return this.isActive } }) configuration: ScaleConfiguration = null;

    public execute(node: cc.Node, transformReference: cc.Node) {
        this.configuration && this.configuration.applyTransform(node, transformReference);
    }

    protected reset(isActive: boolean) {
        this.configuration = isActive ? new ScaleConfiguration() : null;
    }

}
