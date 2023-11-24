import PlaySoundAction, { PlaySoundActionData } from "./Actions/SimpleActions/PlaySoundAction";
import AttackEffects from "./AttackEffects";
import Events from "./Enums/Events";
import Hero from "./Hero";
import PowerPoints from "./PowerPoints";
import Result from './Result';
import Score from "./Score";
import { Collider, RigidBody } from '../../creator';
import galController from "./galController";
import CameraController, { CameraBoxes } from "./Plugins/Camera/CameraController";
import EasingTypes from "./Enums/EasingTypes";

const { ccclass, property } = cc._decorator;

@ccclass('EnemyData')
export class EnemyData {
    @property() idleAnimation: string = 'idle_stand';
    @property() idleWinAnimation: string = 'idle_stand';
    @property() atackAnimation: string = 'attack';
    @property() additiveAttackAnimation: string = '';
    @property() deathAnimation: string = 'death_1';
    @property() deathAnimationDelay: number = 0;

    // @property(PlaySoundActionData) deathSound: PlaySoundActionData = null;

    // @property(PlaySoundActionData) rocksSound: PlaySoundActionData = null;
    // @property(PlaySoundActionData) ropeSound: PlaySoundActionData = null;
    // @property(PlaySoundActionData) explodeSound: PlaySoundActionData = null;
    // @property(PlaySoundActionData) hitSound: PlaySoundActionData = null;

    @property() deathSoundDelay: number = 0;

    @property(cc.Node) rotationHolder: cc.Node = null;
    @property(sp.Skeleton) spine: sp.Skeleton = null;
    @property(AttackEffects) attackEffects: AttackEffects = null;

    @property(cc.Node) disableOnDeath: cc.Node[] = [];

    @property() mixDuration: number = 0.15;



}

@ccclass
export default class Enemy extends cc.Component {
    @property([EnemyData]) enemies: EnemyData[] = [];
    @property(Score) score: Score = null;

    @property() heroAtackAnimation: string = 'attack_1';
    @property() heroDeathAnimation: string = 'death_back';
    @property() heroDeathAnimationDelay: number = 0;

    @property(PowerPoints) power: PowerPoints = null;
    @property(cc.Animation) powerSpheresAnimation: cc.Animation = null;
    @property(cc.Node) resultNode: cc.Node = null;

    @property(galController) galController: galController = null;


    @property(Result) resultClass: Result = null;

    @property(cc.Animation) goblin1Animation: cc.Animation = null;
    @property(cc.Animation) goblin2Animation: cc.Animation = null;
    @property(cc.Animation) goblin3Animation: cc.Animation = null;
    @property(cc.Animation) goblin4Animation: cc.Animation = null;
    @property(cc.Animation) goblin5Animation: cc.Animation = null;
    @property(cc.Animation) bagAnimation: cc.Animation = null;
    @property(cc.Animation) rocksAnimation: cc.Animation = null;
    @property(cc.Animation) fishAnimation: cc.Animation = null;

    @property(sp.Skeleton) goblinSpine: sp.Skeleton = null;
    @property(cc.RigidBody) goblinRigidBody: cc.RigidBody = null;


    @property(cc.Node) fishStairs: cc.Node = null;
    @property(cc.Node) coinCliff: cc.Node = null;

    @property(cc.Node) blueCrystallInBag: cc.Node = null;

    @property(CameraBoxes) cameraBoxGal: CameraBoxes = null;

    @property(PlaySoundActionData) deathSound: PlaySoundActionData = null;
    @property(PlaySoundActionData) deathSound2: PlaySoundActionData = null;

    @property(PlaySoundActionData) rocksSound: PlaySoundActionData = null;
    @property(PlaySoundActionData) hitSound: PlaySoundActionData = null;

    @property() heroPowerAddDelay: number = 0;


    @property() goblin1DeathSoundDelay = 0;
    @property() goblin1RocksSoundDelay = 0;
    @property() goblin5DeathSoundDelay = 0;
    @property() goblin5RocksSoundDelay = 0;



    protected onLoad(): void {
        this.setMixes();

        for (const enemy of this.enemies) {
            enemy.spine.setAnimation(0, enemy.idleAnimation, true);
        }
    }

    public atack(hero: Hero, point: cc.Node): Promise<void> {
        return new Promise((resolve) => {
            let duration = 0;

            for (const enemy of this.enemies) {
                if (enemy.rotationHolder) {
                    enemy.rotationHolder.scaleX = hero.node.x > this.node.x ? 1 : -1;
                }

                if (enemy.attackEffects) {
                    enemy.attackEffects.onAttack(point);
                }

                enemy.spine.setAnimation(0, enemy.atackAnimation, false);

                if (enemy.additiveAttackAnimation) {
                    enemy.spine.addAnimation(0, enemy.additiveAttackAnimation, false);
                }

                enemy.spine.addAnimation(0, enemy.idleWinAnimation, true);

                const atackDuration = enemy.spine.getCurrent(0)?.animation?.duration / enemy.spine.timeScale || 0;

                if (atackDuration > duration) {
                    duration = atackDuration;
                }
            }

            this.scheduleOnce((): void => {
                resolve();
            }, duration);
        });
    }



    // public die(hero: Hero): Promise<void> {
    // // TODO: Eto kostil
    // if (this.node.name === 'Enemy1') {
    //     cc.systemEvent.emit(Events.FIRST_ENEMY_DIE.toString());
    // }

    // return new Promise((resolve) => {
    //     this.node.zIndex = -1;

    //     let enemiesCount = this.enemies.length;
    //     let deathAnimationDelay = 0;

    //     for (const enemy of this.enemies) {
    //         if (enemy.rotationHolder) {
    //             enemy.rotationHolder.scaleX = hero.node.x > this.node.x ? 1 : -1;
    //         }

    //         if (enemy.deathAnimationDelay > deathAnimationDelay) {
    //             deathAnimationDelay = enemy.deathAnimationDelay;
    //         }

    //         this.scheduleOnce((): void => {
    //             enemy.spine.setAnimation(0, enemy.deathAnimation, false);

    //             if (enemy.deathSound && enemy.deathSound.clip) {
    //                 this.scheduleOnce((): void => {
    //                     new PlaySoundAction(enemy.deathSound).run();
    //                 }, enemy.deathSoundDelay);
    //             }

    //             const duration = enemy.spine.getCurrent(0)?.animation?.duration || 0;

    //             this.scheduleOnce((): void => {
    //                 enemiesCount -= 1;

    //                 for (const disableOnDeath of enemy.disableOnDeath) {
    //                     disableOnDeath.active = false;
    //                 }

    //                 if (enemiesCount === 0) {
    //                     if (this.powerSpheresAnimation) {
    //                         this.powerSpheresAnimation.play();

    //                         resolve();

    //                         this.scheduleOnce((): void => {
    //                             hero.power.addPoints(this.power.pointsCount);
    //                         }, this.heroPowerAddDelay);
    //                     } else {
    //                         hero.power.addPoints(this.power.pointsCount);
    //                         resolve();
    //                     }
    //                 }
    //             }, duration);
    //         }, enemy.deathAnimationDelay);
    //     }

    //     this.scheduleOnce((): void => {
    //         this.power.die();
    //     }, deathAnimationDelay);
    // });
    // }



    private setMixes(): void {
        for (const enemy of this.enemies) {
            //@ts-ignore
            const animations = enemy.spine?._skeleton?.data?.animations || [];

            for (const animation of animations) {
                for (const mixAnimation of animations) {
                    if (animation.name !== mixAnimation.name) {
                        enemy.spine.setMix(animation.name, mixAnimation.name, enemy.mixDuration);
                        enemy.spine.setMix(mixAnimation.name, animation.name, enemy.mixDuration);
                    }
                }
            }
        }
    }


    public attackGal(colliderSelf: Collider, otherCollider: Collider) {
        // new cc.Tween(colliderSelf.node).to(1, { position: cc.v2(otherCollider.node.x - 30, otherCollider.node.y) }).start().call(() => {
        //     this.goblinSpine.setAnimation(0, 'attack', false);
        // }).start();
        // this.scheduleOnce(() => {
        this.goblinSpine.setAnimation(0, 'idle', true);
        // }, 2);

    }

    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider): void {

        switch (selfCollider.node.name) {

            case 'Goblin1':
                if (otherCollider.node.name == 'HeroHolder') {
                    // this.attackGal(otherCollider);


                    this.attackGal(selfCollider, otherCollider);
                    otherCollider.destroy();
                    // this.scheduleOnce(() => {
                    //     this.goblin1Action();
                    // },
                    //     1);
                    this.goblin1Action();
                }
                if (otherCollider.node.name == 'coinPutGoblin' && this.coinCliff.opacity == 255) {
                    this.coinCliff.opacity = 0;
                    this.goblin1Die();
                    selfCollider.enabled = false;
                    otherCollider.enabled = false;
                    CameraController.getInstance().setCameraBox(this.cameraBoxGal, 100, 0, EasingTypes.cubicInOut);

                }
                break;

            case 'Goblin2':
                if (otherCollider.node.name == 'HeroHolder') {

                    this.attackGal(selfCollider, otherCollider);
                    this.galController.stopGalMovement();
                    otherCollider.destroy();
                    this.goblin2Animation.stop();
                    this.goblinRigidBody.linearVelocity = cc.v2(0, 0);

                    // this.scheduleOnce(() => {

                    // },
                    //     1);

                    this.goblin2Action();
                }
                break;
            case 'Goblin3':
                if (otherCollider.node.name == 'HeroHolder') {


                    this.attackGal(selfCollider, otherCollider);
                    otherCollider.destroy();
                    this.galController.stopGalMovement();

                    // this.scheduleOnce(() => {
                    //     this.goblin3Action();
                    // },
                    //     1);
                    this.goblin3Action();
                }
                break;
            case 'Goblin4':
                if (otherCollider.node.name == 'HeroHolder') {


                    this.attackGal(selfCollider, otherCollider);
                    otherCollider.destroy();
                    this.galController.stopGalMovement();

                    this.goblin4Action();

                }

                break;
            case 'Goblin5':
                if (otherCollider.node.name == 'HeroHolder') {


                    this.attackGal(selfCollider, otherCollider);
                    otherCollider.destroy();
                    this.galController.stopGalMovement();

                    this.goblin5Action();

                }

                if (otherCollider.node.name == 'goblin5FallCollider' && this.fishStairs.opacity == 255) {
                    this.goblin5Die();
                    selfCollider.enabled = false;
                }
                break;
            default:
                break;

        }
    }

    private goblin1Action() {
        this.galFail();
        this.goblin1Animation.stop();

    }

    private goblin1Die() {
        this.rocksAnimation.play('rocks_fall_goblin1');
        this.goblin1Animation.play('goblin1_fall');
        this.score.addPoint();
        this.score.isGoblin1Dead = true;

        this.scheduleOnce(() => {
            new PlaySoundAction(this.deathSound).run();
        }, this.goblin1DeathSoundDelay);
        this.scheduleOnce(() => {
            new PlaySoundAction(this.rocksSound).run();
        }, this.goblin1RocksSoundDelay);

    }

    private goblin2Action() {
        this.galFail();
        this.goblin2Animation.stop();

    }

    private goblin2Die() {
        this.score.addPoint();


    }

    private goblin3Action() {
        this.galFail();
        this.goblin3Animation.stop();

    }

    private goblin3Die() {
        this.score.addPoint();
        this.score.isGoblin3Dead = true;


    }
    private goblin4Action() {
        this.galFail();
        this.goblin4Animation.stop();

    }

    private goblin4Die() {
        this.goblin4Animation.play('goblin4_fall');
        this.bagAnimation.play('bag_explosion_goblin4');
        this.score.addPoint();
        this.score.isGoblin4Dead = true;


    }

    private goblin5Action() {
        this.galFail();
        this.goblin5Animation.stop();

    }

    private goblin5Die() {
        this.fishAnimation.play('fish_fly_goblin5');

        this.goblin5Animation.play('goblin5_fall');
        this.score.addPoint();
        this.score.isGoblin5Dead = true;

        this.scheduleOnce(() => {
            new PlaySoundAction(this.deathSound).run();
        }, this.goblin5DeathSoundDelay);
        this.scheduleOnce(() => {
            new PlaySoundAction(this.hitSound).run();
        }, this.goblin5RocksSoundDelay);

    }

    public galFail() {
        this.resultNode.opacity = 255;
        this.resultClass.onFail();
    }
}
