import galController from "../../galController";
import IAction from "../IAction";

const {ccclass, property} = cc._decorator;

@ccclass('DelayActionData')
export class DelayActionData {
    @property() delay: number = 0;  
    @property(galController) gal: galController = null;

}

export default class DelayAction implements IAction {
    private data: DelayActionData = null;

    constructor(data: DelayActionData) {
        this.data = data;
    }

    public run(): Promise<void> {
        return new Promise((resolve) => {
            this.data.gal.galInteract();
            new cc.Component().scheduleOnce (() => {
                this.data.gal.stopAnimate();
                this.data.gal.stopGalMovement();
   
            },this.data.delay);
            new cc.Component().scheduleOnce(() => {
                resolve();
            }, this.data.delay);
        });
    }
}