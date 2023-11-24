import PlaySoundAction, { PlaySoundActionData } from "./Actions/SimpleActions/PlaySoundAction";
import AttackEffects from "./AttackEffects";
import Enemy, { EnemyData } from "./Enemy";
import PowerPoints from "./PowerPoints";
import Inventory from "./Inventory";
import Score from "./Score";
import goblinAnimationSwap from './goblinAnimationSwap';
import Tutorial from "./Tutorial";
import CameraController, { CameraBoxes } from "./Plugins/Camera/CameraController";
import EasingTypes from "./Enums/EasingTypes";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Hero extends cc.Component {
    
    @property(Inventory) inventoryNode: Inventory = null;
    @property(Score) score: Score = null;
    @property(goblinAnimationSwap) goblinAnimation: goblinAnimationSwap = null;
    // @property(Tutorial) tutorial: Tutorial = null;

    @property() haveSwordOnStart: boolean = false;

    @property() moveSpeed: number = 200;
    @property() stairsSpeed: number = 150;
    @property() climbSpeed: number = 100;

    @property() idleAnimationWithSword: string = 'idle';
    @property() idleAnimationWithoutSword: string = 'idle_no_sword';

    @property() runUpAnimationWithSword: string = 'run_ne';
    @property() runDownAnimationWithSword: string = 'run_sw';
    @property() runUpAnimationWithoutSword: string = 'run_ne';
    @property() runDownAnimationWithoutSword: string = 'run_sw';

    @property() stairsUpAnimationWithSword: string = 'run_ne';
    @property() stairsDownAnimationWithSword: string = 'run_sw';
    @property() stairsUpAnimationWithoutSword: string = 'run_ne';
    @property() stairsDownAnimationWithoutSword: string = 'run_sw';

    @property() climbUpAnimationWithSword: string = 'run_ne';
    @property() climbDownAnimationWithSword: string = 'run_sw';
    @property() climbUpAnimationWithoutSword: string = 'run_ne';
    @property() climbDownAnimationWithoutSword: string = 'run_sw';

    @property() hideSwordUpAnimation: string = 'sword_in_ne';
    @property() hideSwordDownAnimation: string = 'sword_in_sw';
    @property() showSwordUpAnimation: string = 'sword_out_ne';
    @property() showSwordDownAnimation: string = 'sword_out_sw';

    @property() mixDuration: number = 0.1;

    @property(cc.Node) holder: cc.Node = null;
    @property(sp.Skeleton) spine: sp.Skeleton = null;
    @property(PowerPoints) power: PowerPoints = null;
    @property(AttackEffects) attackEffects: AttackEffects = null;

    @property(PlaySoundActionData) runSound: PlaySoundActionData = null;
    @property() runSoundDelay: number = 0;
    @property() runSoundDelta: number = 0.25;

    @property(PlaySoundActionData) climbSound: PlaySoundActionData = null;
    @property() climbSoundDelay: number = 0;
    @property() climbSoundDelta: number = 0.25;

    @property(PlaySoundActionData) deathSound: PlaySoundActionData = null;

    @property(cc.Animation) goblin6Fall: cc.Animation = null;
    @property(cc.Animation) goblin6FloorFall: cc.Animation = null;
    @property(cc.Animation) crystalExplodeAnimation: cc.Animation = null;

    @property(cc.Node) blueCrystallInBag: cc.Node = null;
    @property(cc.Sprite) bagSprite: cc.Sprite = null;

    @property(cc.SpriteFrame) bagSpriteFrame: cc.SpriteFrame = null;

    @property(cc.Node) coinLadderColliderNode: cc.Node = null;
    @property(cc.Node) craneLadderColliderNode: cc.Node = null;

    @property(cc.Collider) explodeCollider: cc.Collider = null;

    @property(CameraBoxes) cameraBoxGoblin1: CameraBoxes = null;

    @property(cc.Animation) craneDestroyAnimation: cc.Animation = null;
    @property(cc.Animation) goblin2Animation: cc.Animation = null;
    @property(cc.Animation) craneAnimation: cc.Animation = null;

    @property(PlaySoundActionData) interactSound: PlaySoundActionData = null;

    @property(PlaySoundActionData) pickSound: PlaySoundActionData = null;

    @property(PlaySoundActionData) explodeSound: PlaySoundActionData = null;
    @property(PlaySoundActionData) deathSound2: PlaySoundActionData = null;


    @property() goblin6DeathSoundDelay = 0;
    @property() goblin6RocksSoundDelay = 0;

    private haveSword: boolean = false;
    private haveBlueCrystall: boolean = false;
    private haveRedCrystall: boolean = false;
    private haveFish: boolean = false;
    private haveCoin: boolean = false;

    public tutorState = 1;

    public isState1Played: boolean = false;
    public isState2Played: boolean = false;
    public isState3Played: boolean = false;
    public isState4Played: boolean = false;
    public isState5Played: boolean = false;
    public isState6Played: boolean = false;
    public isState7Played: boolean = false;
    public isState8Played: boolean = false;
    public isState9Played: boolean = false;
    public isState10Played: boolean = false;
    public isState11Played: boolean = false;
    // public isState12Played: boolean = false;

    private isChangedOnce: boolean = false;




    private get idleAnimation(): string {
        return this.haveSword ? this.idleAnimationWithSword : this.idleAnimationWithoutSword;
    }

    private get runUpAnimation(): string {
        return this.haveSword ? this.runUpAnimationWithSword : this.runUpAnimationWithoutSword;
    }

    private get runDownAnimation(): string {
        return this.haveSword ? this.runDownAnimationWithSword : this.runDownAnimationWithoutSword;
    }

    private get stairsUpAnimation(): string {
        return this.haveSword ? this.stairsUpAnimationWithSword : this.stairsUpAnimationWithoutSword;
    }

    private get stairsDownAnimation(): string {
        return this.haveSword ? this.stairsDownAnimationWithSword : this.stairsDownAnimationWithoutSword;
    }

    private get climbUpAnimation(): string {
        return this.haveSword ? this.climbUpAnimationWithSword : this.climbUpAnimationWithoutSword;
    }

    private get climbDownAnimation(): string {
        return this.haveSword ? this.climbDownAnimationWithSword : this.climbDownAnimationWithoutSword;
    }


    protected onLoad(): void {
        this.setMixes();

        this.haveSword = this.haveSwordOnStart;

        this.spine.setAnimation(0, this.idleAnimation, true);

        Hero.instance = this;
    }

    protected update(dt: number): void {
        if(this.score.isGoblin3Dead)
        {
            this.isState8Played = true;
        }

        if(!this.goblinAnimation.isBridgeBroken && !this.goblinAnimation.isCartToBlue && this.isState7Played) {
            this.isState8Played = true;
            // this.tutorState = 8;
        }


    }


    public move(point: cc.Node): Promise<void> {
        return new Promise((resolve) => {
            this.spine.node.scaleX = 1;
            const duration = this.getDistanceToPoint(point) / this.moveSpeed;

            this.playLoopSound(this.runSound, duration, this.runSoundDelta, this.runSoundDelay);

            this.rotateToPoint(point);

            const animation = point.y > this.node.y ? this.runUpAnimation : this.runDownAnimation;
            this.spine.setAnimation(0, animation, true);

            new cc.Tween(this.node).to(duration, { position: point.position }).call(() => {
                this.spine.setAnimation(0, this.idleAnimation, true);
                resolve();
            }).start();
        });
    }
   
    public stairs(point: cc.Node): Promise<void> {
        return new Promise((resolve) => {
            const duration = this.getDistanceToPoint(point) / this.stairsSpeed;

            this.playLoopSound(this.runSound, duration, this.runSoundDelta, this.runSoundDelay);

            this.rotateToPoint(point);

            const animation = point.y > this.node.y ? this.stairsUpAnimation : this.stairsDownAnimation;
            this.spine.setAnimation(0, animation, true);

            new cc.Tween(this.node).to(duration, { position: point.position }).call(() => {
                this.spine.setAnimation(0, this.idleAnimation, true);
                resolve();
            }).start();
        });
    }

    public climb(point: cc.Node, scaleX: number): Promise<void> {
        return new Promise((resolve) => {
            // this.rotateToPoint(point);
            this.holder.scaleX = scaleX;

            const hideSwordAnimation = point.y > this.node.y ? this.hideSwordUpAnimation : this.hideSwordDownAnimation;

            this.spine.setAnimation(0, hideSwordAnimation, false);
            const hideSwordDuration = this.spine.getCurrent(0)?.animation?.duration || 0;

            this.scheduleOnce((): void => {
                const duration = this.getDistanceToPoint(point) / this.climbSpeed;

                const animation = point.y > this.node.y ? this.climbUpAnimation : this.climbDownAnimation;
                this.spine.setAnimation(0, animation, true);

                this.playLoopSound(this.climbSound, duration, this.climbSoundDelta, this.climbSoundDelay);

                new cc.Tween(this.node).to(duration, { position: point.position }).call(() => {
                    const showSwordAnimation = point.y > this.node.y ? this.showSwordUpAnimation : this.showSwordDownAnimation;

                    this.spine.setAnimation(0, showSwordAnimation, false);
                    const showSwordDuration = this.spine.getCurrent(0)?.animation?.duration || 0;

                    this.scheduleOnce((): void => {
                        this.spine.setAnimation(0, this.idleAnimation, true);
                        resolve();
                    }, showSwordDuration);
                }).start();
            }, hideSwordDuration);
        });
    }

    public getWeapon(points: number, powerSpheresAnimation: cc.Animation, animation: string, powerAddDelay: number = 0): Promise<void> {
        return new Promise((resolve) => {
            let duration = 0;

            if (animation) {
                this.spine.setAnimation(0, animation, false);
                this.spine.addAnimation(0, this.idleAnimation, true);

                duration = this.spine.getCurrent(0)?.animation?.duration || 0;

                this.scheduleOnce((): void => {
                    this.haveSword = true;
                }, duration + 0.25);
            }

            this.scheduleOnce((): void => {
                if (powerSpheresAnimation) {
                    powerSpheresAnimation.play();

                    this.scheduleOnce((): void => {
                        this.power.addPoints(points);
                        resolve();
                    }, powerAddDelay);
                } else {
                    resolve();
                }
            }, duration);
        });
    }

    public getBlueCrystall(): Promise<void> {
        // if(this.haveRedCrystall) this.haveRedCrystall = false; // дописать инвентарь
        if (!this.haveBlueCrystall) {
            return new Promise((resolve) => {
                this.haveBlueCrystall = true;
                this.inventoryNode.isBlueCrystallCollected = true;
                this.inventoryNode.blueCrystalInv();
                this.isState6Played = true;
                if(this.isState1Played){
                // this.tutorState = 3;
                }
                new PlaySoundAction(this.pickSound).run();
                resolve();
            });
        }
    }

    public getRedCrystall(): Promise<void> {
        // if(this.haveBlueCrystall) this.haveBlueCrystall = false; // дописать инвентарь
        if (!this.haveRedCrystall) {

            return new Promise((resolve) => {
                this.haveRedCrystall = true;
                this.inventoryNode.isRedCrystallCollected = true;
                this.inventoryNode.redCrystalInv();
                this.isState9Played = true;
              
                new PlaySoundAction(this.pickSound).run();
                resolve();
            });
        }
    }


    public getFish(): Promise<void> {
        if (!this.haveFish) {

            return new Promise((resolve) => {
                this.haveFish = true;
                this.inventoryNode.isFishCollected = true;
                this.inventoryNode.fishInv();
                this.isState7Played = true;

                // this.tutorState = 8;

                new PlaySoundAction(this.pickSound).run();
                resolve();
            });
        }
    }

    public putFish(): Promise<void> {
        if (this.haveFish) {

            return new Promise((resolve) => {
                this.haveFish = false;
                this.inventoryNode.isFishCollected = false;
                this.inventoryNode.fishInv();
                this.isState8Played = true;
                // this.tutorState = 12;
                new PlaySoundAction(this.interactSound).run();
                resolve();
            });
        }
    }

    public getCoin(): Promise<void> {
        if (!this.haveCoin) {

            return new Promise((resolve) => {
                this.inventoryNode.isCoinCollected = true;
                this.inventoryNode.coinInv();
                this.haveCoin = true;
                this.isState1Played = true;
                if(this.isState2Played){
                // this.tutorState = 4;
                }
                new PlaySoundAction(this.pickSound).run();
                resolve();
            });
        }
    }

    public putCoin(): Promise<void> {
        if (this.haveCoin) {
            this.haveCoin = false;

            return new Promise((resolve) => {
                this.inventoryNode.isCoinCollected = false;
                this.inventoryNode.coinInv();
                this.isState2Played = true;
                this.coinLadderColliderNode.active = true;
                new PlaySoundAction(this.interactSound).run();

                resolve();
            });
        }
        else return;
    }


    public detonateTopCrystalls(): Promise<void> {
        if (this.haveRedCrystall) {
           
            return new Promise((resolve) => {
                this.haveRedCrystall = false;
                this.inventoryNode.isRedCrystallCollected = false;
                this.inventoryNode.redCrystalInv();
                this.score.addPoint();
                this.score.isGoblin6Dead = true;
                this.isState11Played = true;

                this.crystalExplodeAnimation.play('gold_fall_goblin6');
                this.goblin6FloorFall.play('gold_fall_goblin6');
                this.goblin6Fall.play('goblin6_fall');
                this.explodeCollider.destroy();
                new PlaySoundAction(this.interactSound).run();

                this.scheduleOnce(() => {
                    new PlaySoundAction(this.deathSound2).run();
                }, this.goblin6DeathSoundDelay);
                this.scheduleOnce(() => {
                    new PlaySoundAction(this.explodeSound).run();
                }, this.goblin6RocksSoundDelay);
        
                resolve();
            });
        
    }
    }

    public putBlueCrystall(): Promise<void> {
        if (this.haveBlueCrystall) {
            return new Promise((resolve) => {
                this.haveBlueCrystall = false;
                this.inventoryNode.isBlueCrystallCollected = false;
                this.inventoryNode.blueCrystalInv();
                this.blueCrystallInBag.active = true;
                this.isState10Played = true;
                
                if (this.blueCrystallInBag.active){
                    this.bagSprite.spriteFrame = this.bagSpriteFrame;
                }
                new PlaySoundAction(this.interactSound).run();

                // this.goblin6FloorFall.play('gold_fall_goblin6');
                // this.goblin6Fall.play('goblin6_fall');
                resolve();
            });
        }
    }

    
    public destroyCrane(): Promise<void> {
        

            return new Promise((resolve) => {
                this.goblinAnimation.isCraneBroken = true;
                // this.tutorState = 2;
                this.isState4Played = true;
                this.craneLadderColliderNode.active = true;
                this.craneDestroyAnimation.play('craneDestroyAnimation');
                new PlaySoundAction(this.interactSound).run();
                resolve();
            });
        
    }

    public stayOnCoinLadder(): Promise<void> {
        return new Promise((resolve) => {
         
            this.isState3Played = true;
            CameraController.getInstance().setCameraBox(this.cameraBoxGoblin1, 100, 0, EasingTypes.cubicInOut);
            this.coinLadderColliderNode.active = false;
            resolve();
        });
    }

    public stayOnCraneLadder(): Promise<void> {
        return new Promise((resolve) => {
      
            this.isState5Played = true;
            this.craneLadderColliderNode.active = false;
            this.goblin2Animation.resume('goblin2_walk');
            this.craneAnimation.resume('crane_move_goblin2');
           resolve();
        });
    }


    public looseWeapon(): Promise<void> {
        return new Promise((resolve) => {
            this.haveSword = false;

            resolve();
        });
    }

    public atack(enemy: Enemy, point: cc.Node): Promise<void> {
        return new Promise((resolve) => {
            this.rotateToPoint(enemy.node);

            if (this.attackEffects) {
                this.attackEffects.onAttack(point);
            }

            this.spine.setAnimation(0, enemy.heroAtackAnimation, false);
            this.spine.addAnimation(0, this.idleAnimation, true);

            const duration = this.spine.getCurrent(0)?.animation?.duration || 0;

            this.scheduleOnce((): void => {
                resolve();
            }, duration);
        });
    }

    public die(enemy: Enemy): Promise<void> {
        return new Promise((resolve) => {
            // TODO:
            this.node.zIndex = enemy.node.zIndex - 0.1;

            this.scheduleOnce((): void => {
                enemy.power.addPoints(this.power.pointsCount);
                this.power.die();

                this.spine.setAnimation(0, enemy.heroDeathAnimation, false);
                new PlaySoundAction(this.deathSound).run();

                const duration = this.spine.getCurrent(0)?.animation?.duration || 0;

                this.scheduleOnce((): void => {
                    resolve();
                }, duration);
            }, enemy.heroDeathAnimationDelay);
        });
    }

    private playLoopSound(sound: PlaySoundActionData, duration: number, delta: number, delay: number = 0): void {
        const soundsCount = Math.round((duration - delay) / delta);

        for (let i = 0; i < soundsCount; i++) {
            this.scheduleOnce((): void => {
                new PlaySoundAction(sound).run();
            }, delay + delta * i);
        }
    }

    private setMixes(): void {
        //@ts-ignore
        const animations = this.spine?._skeleton?.data?.animations || [];

        for (const animation of animations) {
            for (const mixAnimation of animations) {
                if (animation.name !== mixAnimation.name) {
                    this.spine.setMix(animation.name, mixAnimation.name, this.mixDuration);
                    this.spine.setMix(mixAnimation.name, animation.name, this.mixDuration);
                }
            }
        }
    }

    private getDistanceToPoint(point: cc.Node): number {
        const distance = Math.sqrt(Math.pow(point.position.x - this.node.position.x, 2) + Math.pow(point.position.y - this.node.position.y, 2));
        return distance;
    }

    private rotateToPoint(point: cc.Node): void {
        this.holder.scaleX = point.x > this.node.x ? 1 : -1;
    }

    static getInstance(): Hero {
        if (this.instance) {
            return this.instance;
        }

        return null;
    }

    static instance: Hero;
}
