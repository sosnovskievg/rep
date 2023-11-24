import FitModes from "./FitModes";
import StickModes from "./StickModes";

const { ccclass, menu, property } = cc._decorator;

@ccclass('CameraBox')
@menu('Camera/CameraBox')
export default class CameraBox {
    @property() isUsingSideRatio: boolean = false;
    @property({ visible() { return this.isUsingSideRatio; } }) sideRatio: number = 1.35;

    @property(cc.Vec2) focus: cc.Vec2 = cc.v2(.5, .5);
    @property(cc.Node) defaultBox: cc.Node = null;
    @property({ type: cc.Node, visible() { return this.isUsingSideRatio; } }) minimalBox: cc.Node = null;

    @property({ type: cc.Enum(StickModes) }) stickMode: StickModes = StickModes.None;
    @property({ type: cc.Enum(FitModes) }) fitMode: FitModes = FitModes.Default;
}
