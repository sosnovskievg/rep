import PlaySoundAction, {PlaySoundActionData} from "./Actions/SimpleActions/PlaySoundAction";

const {ccclass, property} = cc._decorator;

@ccclass('AttackEffectSoundData')
export class AttackEffectSoundData {
    @property() soundDelay: number = 0;
    @property(PlaySoundActionData) attackSound: PlaySoundActionData = null;
}

@ccclass('AttackEffectFxData')
export class AttackEffectFxData {
    @property() fxDelay: number = 0;
    @property(cc.Prefab) fx: cc.Prefab = null;
    @property(cc.Node) fxHolder: cc.Node = null;
}

@ccclass('AttackEffectAnimationData')
export class AttackEffectAnimationData {
    @property() animationDelay: number = 0;
    @property(cc.Animation) animation: cc.Animation = null;
    @property() animationName: string = '';
}

@ccclass('AttackEffectData')
export class AttackEffectData {
    @property(cc.Node) targets: cc.Node[] = [];

    @property(AttackEffectFxData) fx: AttackEffectFxData[] = [];

    @property(AttackEffectAnimationData) animations: AttackEffectAnimationData[] = [];

    @property(AttackEffectSoundData) sounds: AttackEffectSoundData[] = [];
}

@ccclass
export default class AttackEffects extends cc.Component {
    @property([AttackEffectData]) effects: AttackEffectData[] = [];

    public onAttack(target: cc.Node): void {
        for (const effect of this.effects) {
            if (effect.targets.includes(target)) {
                if (effect.fx && effect.fx.length) {
                    this.spawnFx(effect);
                }

                if (effect.animations && effect.animations.length) {
                    this.runAnimations(effect);
                }

                if (effect.sounds && effect.sounds.length) {
                    this.playSounds(effect);
                }

                return;
            }
        }
    }

    public spawnFx(effect: AttackEffectData): void {
        for (const fxData of effect.fx) {
            this.scheduleOnce((): void => {
                const fx = cc.instantiate(fxData.fx);

                fx.setParent(fxData.fxHolder || this.node);
                fx.setPosition(cc.v2());
                fx.setScale(1, 1);
            }, fxData.fxDelay);
        }
    }

    public runAnimations(effect: AttackEffectData): void {        
        for (const animationData of effect.animations) {
            this.scheduleOnce((): void => {
                animationData.animation.play(animationData.animationName);
            }, animationData.animationDelay);
        }
    }

    public playSounds(effect: AttackEffectData): void {
        for (const sound of effect.sounds) {
            if (sound.attackSound && sound.attackSound.clip) {
                this.scheduleOnce((): void => {
                    new PlaySoundAction(sound.attackSound).run();
                }, sound.soundDelay);
            }
        }
    }
}
