import ActionType from "./ActionType";
import GroupAction from "./CapacitorActions/GroupAction";
import IAction from "./IAction";
import ParallelAction from "./CapacitorActions/ParallelAction";
import SequenceAction from "./CapacitorActions/SequenceAction";
import ActionComponent from "./ActionComponent";
import AtackAction, { AtackActionData } from "./SimpleActions/AtackAction";
import DelayAction, { DelayActionData } from "./SimpleActions/DelayAction";
import MoveCamAction, { MoveCamActionData } from "./SimpleActions/MoveCamAction";
import MoveHeroAction, { MoveHeroActionData } from "./SimpleActions/MoveHeroAction";
import SetActiveActionsAction, { SetActiveActionsActionData } from "./SimpleActions/SetActiveActionsAction";
import GetWeaponAction, { GetWeaponActionData } from "./SimpleActions/GetWeaponAction";
import StairsHeroAction, { StairsHeroActionData } from "./SimpleActions/StairsHeroAction";
import ClimbHeroAction, { ClimbHeroActionData } from "./SimpleActions/ClimbHeroAction";
import RunAnimationAction, { RunAnimationActionData } from "./SimpleActions/RunAnimationAction";
import SpawnFxAction, { SpawnFxActionData } from "./SimpleActions/SpawnFxAction";
import RunCustomSpineAnimationAction, { RunCustomSpineAnimationActionData } from "./SimpleActions/RunCustomSpineAnimationAction";
import LooseWeaponAction, { LooseWeaponActionData } from "./SimpleActions/LooseWeaponAction";
import PlaySoundAction, { PlaySoundActionData } from "./SimpleActions/PlaySoundAction";
import WinAction from "./SimpleActions/WinAction";
import FailAction from "./SimpleActions/FailAction";
import ConditionAction, { ConditionActionData } from "./ConditionActions/ConditionAction";
import SendAnalyticAction, { SendAnalyticActionData } from "./SimpleActions/SendAnalyticAction";
import { CollectBlueCrystalActionData } from './SimpleActions/CollectBlueCrystalAction';
import CollectBlueCrystalAction from './SimpleActions/CollectBlueCrystalAction';
import CollectRedCrystalAction, { CollectRedCrystalActionData } from './SimpleActions/CollectRedCrystalAction';
import CollectFishAction, { CollectFishData } from './SimpleActions/CollectFishAction';
import DetonateTopCrystalls, { DetonateTopCrystallsData } from "./SimpleActions/DetonateTopCrystalls";
import CollectCoinAction from './SimpleActions/CollectCoinAction';
import { CollectCoinActionData } from './SimpleActions/CollectCoinAction';
import PutCoinAction, { PutCoinActionData } from "./SimpleActions/PutCoinAction";
import PutFishAction, { PutFishActionData } from './SimpleActions/PutFishAction';
import putBlueCrystall, { putBlueCrystallData } from './SimpleActions/putBlueCrystall';
import DestroyCrane, { DestroyCraneData } from "./SimpleActions/DestroyCrane";
import { DestroyBridgeData } from "./SimpleActions/DestroyBridge";
import DestroyBridge from './SimpleActions/DestroyBridge';
import ChangeCartDirection from './SimpleActions/ChangeCartDirection';
import { ChangeCartDirectionData } from './SimpleActions/ChangeCartDirection';
import DelayActionWithoutInteract, { DelayActionWithoutInteractData } from "./SimpleActions/DelayActionWithoutInteract";
// import DelayActionWithoutInteract from './SimpleActions/DelayActionWithoutInteract';

const { ccclass, property } = cc._decorator;

const manyActionsTypes = [
    ActionType.SequenceAction,
    ActionType.ParallelAction,
    ActionType.GroupAction,
];

@ccclass('Action')
export default class Action implements IAction {
    @property({ type: cc.Enum(ActionType) }) type: ActionType = ActionType.Delay;

    // ManyActions
    @property({ type: [Action], visible: function (this) { return manyActionsTypes.includes(this.type) } }) actions: Action[] = [];

    // DelayAction
    @property({ type: DelayActionData, visible: function (this) { return this.type === ActionType.Delay } }) delayActionData: DelayActionData = null;

    // DelayActionWithoutInteract
    @property({ type: DelayActionWithoutInteractData, visible: function (this) { return this.type === ActionType.DelayWOInteract } }) delayActionWithoutInteractData: DelayActionWithoutInteractData = null;

    // MoveCamAction
    @property({ type: MoveCamActionData, visible: function (this) { return this.type === ActionType.MoveCam } }) moveCamActionData: MoveCamActionData = null;

    // MoveHeroAction
    @property({ type: MoveHeroActionData, visible: function (this) { return this.type === ActionType.MoveHero } }) moveHeroActionData: MoveHeroActionData = null;

    // StairsHeroAction
    @property({ type: StairsHeroActionData, visible: function (this) { return this.type === ActionType.StairsHero } }) stairsHeroActionData: StairsHeroActionData = null;

    // ClimbHeroAction
    @property({ type: ClimbHeroActionData, visible: function (this) { return this.type === ActionType.ClimbHero } }) climbHeroActionData: ClimbHeroActionData = null;

    // AtackAction
    @property({ type: AtackActionData, visible: function (this) { return this.type === ActionType.Atack } }) atackActionData: AtackActionData = null;

    // GetWeaponAction
    @property({ type: GetWeaponActionData, visible: function (this) { return this.type === ActionType.GetWeapon } }) getWeaponActionData: GetWeaponActionData = null;

    // LooseWeaponAction
    @property({ type: LooseWeaponActionData, visible: function (this) { return this.type === ActionType.LooseWeapon } }) looseWeaponActionData: LooseWeaponActionData = null;

    // SetActiveActions
    @property({ type: SetActiveActionsActionData, visible: function (this) { return this.type === ActionType.SetActiveActions } }) setActiveActionsActionData: SetActiveActionsActionData = null;

    // ActionComponent
    @property({ type: cc.Component, visible: function (this) { return this.type === ActionType.ActionComponent } }) actionComponent: cc.Component = null;

    // RunAnimationAction
    @property({ type: RunAnimationActionData, visible: function (this) { return this.type === ActionType.RunAnimation } }) runAnimationActionData: RunAnimationActionData = null;

    // RunCustomSpineAnimationAction
    @property({ type: RunCustomSpineAnimationActionData, visible: function (this) { return this.type === ActionType.RunCustomSpineAnimation } }) runCustomSpineAnimationActionData: RunCustomSpineAnimationActionData = null;

    // SpawnFxAction
    @property({ type: SpawnFxActionData, visible: function (this) { return this.type === ActionType.SpawnFx } }) spawnFxActionData: SpawnFxActionData = null;

    // GetBlueCrystall
    @property({ type: CollectBlueCrystalActionData, visible: function (this) { return this.type === ActionType.CollectBlueCrystalAction } }) CollectBlueCrystalActionData: CollectBlueCrystalActionData = null;

    // GetRedCrystall
    @property({ type: CollectRedCrystalActionData, visible: function (this) { return this.type === ActionType.CollectRedCrystalAction } }) CollectRedCrystalActionData: CollectRedCrystalActionData = null;

    // GetFish
    @property({ type: CollectFishData, visible: function (this) { return this.type === ActionType.CollectFishAction } }) CollectFishData: CollectFishData = null;

    // DetonateTopCrystall
    @property({ type: DetonateTopCrystallsData, visible: function (this) { return this.type === ActionType.DetonateTopCrystalls } }) DetonateTopCrystallsData: DetonateTopCrystallsData = null;

    // GetCoin
    @property({ type: CollectCoinActionData, visible: function (this) { return this.type === ActionType.CollectCoin } }) CollectCoinActionData: CollectCoinActionData = null;

    // PutCoin
    @property({ type: PutCoinActionData, visible: function (this) { return this.type === ActionType.PutCoin } }) PutCoinActionData: PutCoinActionData = null;

    // PutFish
    @property({ type: PutFishActionData, visible: function (this) { return this.type === ActionType.PutFish } }) PutFishActionData: PutFishActionData = null;

    // PutBlueCrystalInABag
    @property({ type: putBlueCrystallData, visible: function (this) { return this.type === ActionType.PutBlueCrystall } }) putBlueCrystallData: putBlueCrystallData = null;

    // DestroyCran
    @property({ type: DestroyCraneData, visible: function (this) { return this.type === ActionType.DestroyCrane } }) DestroyCraneData: DestroyCraneData = null;

    // DestroyBridge
    @property({ type: DestroyBridgeData, visible: function (this) { return this.type === ActionType.DestroyBridge } }) DestroyBridgeData: DestroyBridgeData = null;

    // ChangeCartDirection
    @property({ type: ChangeCartDirectionData, visible: function (this) { return this.type === ActionType.ChangeCartDirection } }) ChangeCartDirectionData: ChangeCartDirectionData = null;


    // PlaySoundAction
    @property({ type: PlaySoundActionData, visible: function (this) { return this.type === ActionType.PlaySound } }) playSoundActionData: PlaySoundActionData = null;

    // ConditionAction
    @property({ type: ConditionActionData, visible: function (this) { return this.type === ActionType.Condition } }) conditionActionData: ConditionActionData = null;

    @property({ type: Action, visible: function (this) { return this.type === ActionType.Condition } }) successAction: Action = null;
    @property({ type: Action, visible: function (this) { return this.type === ActionType.Condition } }) failAction: Action = null;

    @property({ type: SendAnalyticActionData, visible: function (this) { return this.type === ActionType.SendAnalytic } }) sendAnalyticActionData: SendAnalyticActionData = null;

    public run(): Promise<void> {
        let promise = Promise.resolve();

        if (manyActionsTypes.includes(this.type) && !this.actions?.length) return promise;

        switch (this.type) {
            case ActionType.SequenceAction:
                promise = new SequenceAction(this.actions).run();
                break;
            case ActionType.CollectBlueCrystalAction:
                promise = new CollectBlueCrystalAction(this.CollectBlueCrystalActionData).run();
                break;
            case ActionType.CollectCoin:
                promise = new CollectCoinAction(this.CollectCoinActionData).run();
                break;
            case ActionType.PutBlueCrystall:
                promise = new putBlueCrystall(this.putBlueCrystallData).run();
                break;
            case ActionType.DestroyCrane:
                promise = new DestroyCrane(this.DestroyCraneData).run();
                break;
            case ActionType.ChangeCartDirection:
                promise = new ChangeCartDirection(this.ChangeCartDirectionData).run();
                break;
            case ActionType.DestroyBridge:
                promise = new DestroyBridge(this.DestroyBridgeData).run();
                break;
            case ActionType.PutFish:
                promise = new PutFishAction(this.PutFishActionData).run();
                break;
            case ActionType.PutCoin:
                promise = new PutCoinAction(this.PutCoinActionData).run();
                break;
            case ActionType.DetonateTopCrystalls:
                promise = new DetonateTopCrystalls(this.DetonateTopCrystallsData).run();
                break;
            case ActionType.CollectRedCrystalAction:
                promise = new CollectRedCrystalAction(this.CollectRedCrystalActionData).run();
                break;
            case ActionType.CollectFishAction:
                promise = new CollectFishAction(this.CollectFishData).run();
                break;
            case ActionType.ParallelAction:
                promise = new ParallelAction(this.actions).run();
                break;
            case ActionType.GroupAction:
                promise = new GroupAction(this.actions).run();
                break;
            case ActionType.Delay:
                promise = new DelayAction(this.delayActionData).run();
                break;
            case ActionType.DelayWOInteract:
                promise = new DelayActionWithoutInteract(this.delayActionWithoutInteractData).run();
                break;
            case ActionType.MoveHero:
                promise = new MoveHeroAction(this.moveHeroActionData).run();
                break;
            case ActionType.StairsHero:
                promise = new StairsHeroAction(this.stairsHeroActionData).run();
                break;
            case ActionType.ClimbHero:
                promise = new ClimbHeroAction(this.climbHeroActionData).run();
                break;
            case ActionType.MoveCam:
                promise = new MoveCamAction(this.moveCamActionData).run();
                break;
            case ActionType.Atack:
                promise = new AtackAction(this.atackActionData).run();
                break;
            case ActionType.GetWeapon:
                promise = new GetWeaponAction(this.getWeaponActionData).run();
                break;
            case ActionType.LooseWeapon:
                promise = new LooseWeaponAction(this.looseWeaponActionData).run();
                break;
            case ActionType.SetActiveActions:
                promise = new SetActiveActionsAction(this.setActiveActionsActionData).run();
                break;
            case ActionType.ActionComponent:
                promise = (this.actionComponent as ActionComponent).run();
                break;
            case ActionType.RunAnimation:
                promise = new RunAnimationAction(this.runAnimationActionData).run();
                break;
            case ActionType.RunCustomSpineAnimation:
                promise = new RunCustomSpineAnimationAction(this.runCustomSpineAnimationActionData).run();
                break;
            case ActionType.SpawnFx:
                promise = new SpawnFxAction(this.spawnFxActionData).run();
                break;
            case ActionType.PlaySound:
                promise = new PlaySoundAction(this.playSoundActionData).run();
                break;
            case ActionType.Win:
                promise = new WinAction().run();
                break;
            case ActionType.Fail:
                promise = new FailAction().run();
                break;
            case ActionType.Condition:
                promise = new ConditionAction(this.conditionActionData).run().then(() => this.successAction.run(), () => this.failAction.run());
                break;
            case ActionType.SendAnalytic:
                promise = new SendAnalyticAction(this.sendAnalyticActionData).run();
                break;
            default:
                promise = Promise.resolve();
                break;
        }

        return promise;
    }
}
