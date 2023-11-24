import AnchorComponent from "./Components/AnchorComponent";
import PositionComponent from "./Components/PositionComponent";
import RotationComponent from "./Components/RotationComponent";
import ScaleComponent from "./Components/ScaleComponent";
import SizeComponent from "./Components/SizeComponent";
import VisibilityComponent from "./Components/VisibilityComponent";


enum TransformComponentType {
    Position = 0,
    Scale = 1,
    Rotation = 2,
    // Visibility = 3,
    Anchor = 4,
    Size = 5,
    All = 6,
    Hide = 7,
};


const { ccclass, property } = cc._decorator;

@ccclass('TransformController')
export default class TransformController {
    @property({ type: cc.Enum(TransformComponentType) }) changeValueType: TransformComponentType = TransformComponentType.Hide;

    @property({ type: PositionComponent, visible() { return this.isPreferredTypeSelected(TransformComponentType.Position) } }) positionComponent: PositionComponent = new PositionComponent();
    @property({ type: ScaleComponent, visible() { return this.isPreferredTypeSelected(TransformComponentType.Scale) } }) scaleComponent: ScaleComponent = new ScaleComponent();
    @property({ type: RotationComponent, visible() { return this.isPreferredTypeSelected(TransformComponentType.Rotation) } }) rotationComponent: RotationComponent = new RotationComponent();
    // @property({ type: VisibilityComponent, visible() { return this.isPreferredTypeSelected(TransformComponentType.Visibility) } }) visibilityComponent: VisibilityComponent = new VisibilityComponent();
    @property({ type: AnchorComponent, visible() { return this.isPreferredTypeSelected(TransformComponentType.Anchor) } }) anchorComponent: AnchorComponent = new AnchorComponent();
    @property({ type: SizeComponent, visible() { return this.isPreferredTypeSelected(TransformComponentType.Size) } }) sizeComponent: SizeComponent = new SizeComponent();


    private _transformReference: cc.Node = null;
    public get transformReference(): cc.Node { return this._transformReference; }
    public set transformReference(v: cc.Node) { this._transformReference = v; }

    public setNodeTransform(node: cc.Node) {
        this.rotationComponent.execute(node, this.transformReference);
        this.positionComponent.execute(node, this.transformReference);
        this.sizeComponent.execute(node, this.transformReference);
        this.anchorComponent.execute(node, this.transformReference);
        this.scaleComponent.execute(node, this.transformReference);
        // this.visibilityComponent.execute(node, this.transformReference);
    }


    public clone(): TransformController {
        let a = new TransformController();

        a.rotationComponent.applyData(this.rotationComponent.getData())
        a.positionComponent.applyData(this.positionComponent.getData());
        a.sizeComponent.applyData(this.sizeComponent.getData());
        a.anchorComponent.applyData(this.anchorComponent.getData());
        a.scaleComponent.applyData(this.scaleComponent.getData());
        // a.visibilityComponent.applyData(this.visibilityComponent.getData());

        a.changeValueType = this.changeValueType;
        a.transformReference = this.transformReference;

        return a;
    }


    private isPreferredTypeSelected(type: TransformComponentType): boolean {
        return this.changeValueType === type || this.changeValueType === TransformComponentType.All;
    }

}
