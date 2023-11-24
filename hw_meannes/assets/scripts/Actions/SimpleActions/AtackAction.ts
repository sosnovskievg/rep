import Enemy from "../../Enemy";
import Events from "../../Enums/Events";
import Hero from "../../Hero";
import IAction from "../IAction";

const {ccclass, property} = cc._decorator;

@ccclass('AtackActionData')
export class AtackActionData {
    @property(Enemy) enemy: Enemy = null;
    @property(cc.Node) point: cc.Node = null;
}

export default class AtackAction implements IAction {
    private data: AtackActionData = null;

    constructor(data: AtackActionData) {
        this.data = data;
    }

    public run(): Promise<void> {
        return new Promise((resolve, reject) => {
            const hero = Hero.getInstance();
            const enemy = this.data.enemy;

            let promiseGroup = [];

            const isWin = hero.power.pointsCount >= enemy.power.pointsCount;

            if (isWin) {
                promiseGroup = [hero.atack(enemy, this.data.point), enemy.die(hero)];
            } else {
                promiseGroup = [enemy.atack(hero, this.data.point), hero.die(enemy)];
            }

            Promise.all(promiseGroup).then(() => {
                if (isWin) {
                    resolve();
                } else {
                    reject();

                    cc.systemEvent.emit(Events.FAIL.toString());
                }
            });
        });
    }
}
