import DetonateTopCrystalls from './SimpleActions/DetonateTopCrystalls';
enum ActionType {
    SequenceAction = 0,
    ParallelAction = 10,
    GroupAction = 20,

    Delay = 30,
    MoveHero = 40,
    MoveCam = 50,
    Atack = 60,
    GetWeapon = 70,
    StairsHero = 80,
    ClimbHero = 90,
    LooseWeapon = 95,

    SetActiveActions = 100,

    ActionComponent = 110,

    RunAnimation = 120,
    RunCustomSpineAnimation = 140,
    SpawnFx = 130,

    PlaySound = 150,

    Win = 160,
    Fail = 180,

    Condition = 190,

    SendAnalytic = 200,

    CollectBlueCrystalAction,

    CollectRedCrystalAction,

    CollectFishAction,

    DetonateTopCrystalls,

    CollectCoin,

    PutCoin,

    PutFish,

    PutBlueCrystall,

    DestroyCrane,

    DestroyBridge,

    ChangeCartDirection,

    DelayWOInteract,
}

export default ActionType;