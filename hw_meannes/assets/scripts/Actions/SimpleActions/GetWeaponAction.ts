import Enemy from "../../Enemy";
import Hero from "../../Hero";
import IAction from "../IAction";

const {ccclass, property} = cc._decorator;

@ccclass('GetWeaponActionData')
export class GetWeaponActionData {
    @property() powerPoints: number = 0;
    @property() hideDelay: number = 0;
    @property() heroAnimation: string = '';
    @property(cc.Node) weapon: cc.Node = null;
    @property(cc.Animation) powerSpheresAnimation: cc.Animation = null;
    @property() heroPowerAddDelay: number = 0;
}

export default class GetWeaponAction implements IAction {
    private data: GetWeaponActionData = null;

    constructor(data: GetWeaponActionData) {
        this.data = data;
    }

    public run(): Promise<void> {
        const hero = Hero.getInstance();

        if (this.data.weapon) {
            new cc.Component().scheduleOnce((): void => {
                new cc.Tween(this.data.weapon).to(0.15, {opacity: 0}).start();
            }, this.data.hideDelay);
        }

        return hero.getWeapon(this.data.powerPoints, this.data.powerSpheresAnimation, this.data.heroAnimation, this.data.heroPowerAddDelay);
    }
}
