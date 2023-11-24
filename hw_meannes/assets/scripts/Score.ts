// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Result from "./Result";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Score extends cc.Component {

    // @property(Result) result: Result = null;

    @property(cc.Node) progressBarBack: cc.Node = null;
    @property(cc.Node) progressBar: cc.Node = null;
    @property() percentPerAction = 30;
    @property() pointsPerTickSubtract = 2;

    private progressBarBackWidth: number = 0;
    private progressBarWidth: number = 0;
    private barPercent: number = 0;



    public isGoblin1Dead: boolean = false;
    public isGoblin2Dead: boolean = false;
    public isGoblin3Dead: boolean = true;
    public isGoblin4Dead: boolean = false;
    public isGoblin5Dead: boolean = false;
    public isGoblin6Dead: boolean = false;

    // public isGoblin1Dead: boolean = true;
    // public isGoblin2Dead: boolean = false;
    // public isGoblin3Dead: boolean = true;
    // public isGoblin4Dead: boolean = true;
    // public isGoblin5Dead: boolean = true;
    // public isGoblin6Dead: boolean = true;

    // public isOneCup: boolean = false;
    // public isTwoCup: boolean = false;
    // public isThreeCup: boolean = false;



    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.progressBarBackWidth = this.progressBarBack.width;
        this.barPercent = this.progressBarBackWidth / 100;
    }

    public subtractPoint() {
        if (this.progressBar.width >= 0) {
            this.progressBar.width -= this.pointsPerTickSubtract;
        }
    }

    public addPoint() {
        this.progressBarWidth = this.percentPerAction * this.barPercent;
        this.progressBar.width += this.progressBarWidth;
        if(this.progressBar.width>= this.progressBarBack.width)
        {
            this.progressBar.width= this.progressBarBack.width;
        }
    }

    // public checkCup() {

    //     if(this.progressBar.width >= this.progressBarBack.width* 0.98){
    //         this.isOneCup = true;
    //         this.isTwoCup = true;
    //         this.isThreeCup = true;
    //     }
    //     else if(this.progressBar.width >= this.progressBarBack.width * 0.66 && this.progressBar.width < this.progressBarBack.width * 0.98){
    //         this.isOneCup = true;
    //         this.isTwoCup = true;
    //         this.isThreeCup = false;

    //     }
    //     else if(this.progressBar.width >= this.progressBarBack.width * 0.33 && this.progressBar.width < this.progressBarBack.width * 0.66){
    //         this.isOneCup = true;
    //         this.isTwoCup = false;
    //         this.isThreeCup = false;
    //     }
    //     else {
    //         this.isOneCup = false;
    //         this.isTwoCup = false;
    //         this.isThreeCup = false;

    //     }
        
        
    // }

    start() {

    }

    update(dt) {
        this.subtractPoint();
        // this.checkCup();
        
    }
}
