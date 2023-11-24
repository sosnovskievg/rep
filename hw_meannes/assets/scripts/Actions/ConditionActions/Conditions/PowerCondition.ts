import Enemy from "../../../Enemy";
import Hero from "../../../Hero";
import ICondition from "./ICondition";

const {ccclass, property} = cc._decorator;

@ccclass('PowerConditionData')
export class PowerConditionData {
    @property(Enemy) enemy: Enemy = null;
}

export default class PowerCondition implements ICondition {
    private data: PowerConditionData = null;

    constructor(data: PowerConditionData) {
        this.data = data;
    }

    public check(): boolean {
        const hero = Hero.getInstance();
        const enemy = this.data.enemy;

        return hero.power.pointsCount >= enemy.power.pointsCount;
    }
}
