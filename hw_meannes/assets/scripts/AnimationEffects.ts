import PlaySoundAction, {PlaySoundActionData} from "./Actions/SimpleActions/PlaySoundAction";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AnimationEffects extends cc.Component {
    @property(cc.Prefab) fx: cc.Prefab = null;
    @property(cc.Node) fxHolder: cc.Node = null;

    @property(PlaySoundActionData) sound: PlaySoundActionData = null;

    public spawnFx(): void {
        if (this.fx && this.fxHolder) {
            const fx = cc.instantiate(this.fx);
            fx.setParent(this.fxHolder);
            fx.setPosition(cc.v2());
        }
    }

    public playSound(): void {
        if (this.sound && this.sound.clip) {
            new PlaySoundAction(this.sound).run();
        }
    }
}
