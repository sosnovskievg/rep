const {ccclass, property} = cc._decorator;

@ccclass
export default class PowerPoints extends cc.Component {
    @property() startPointsCount: number = 0;

    @property(cc.Label) pointsLabel: cc.Label = null;

    private changeSpeed: number = 10;

    private currentPointsCount: number = 0;
    private currentLabelPointsCount: number = 0;


    private changeTime: number = 0.5;
    private currentDifference: number = 1;

    public get pointsCount(): number {
        return this.currentPointsCount;
    }
    
    protected onLoad(): void {
        this.currentPointsCount = this.startPointsCount;
        this.currentLabelPointsCount = this.currentPointsCount;
        this.pointsLabel.string = '' + this.currentPointsCount;
    }

    protected update(dt: number): void {
        if (this.currentLabelPointsCount !== this.currentPointsCount) {
            this.currentLabelPointsCount += dt * this.currentDifference / this.changeTime; //dt * this.changeSpeed;

            if (this.currentLabelPointsCount > this.currentPointsCount) {
                this.currentLabelPointsCount = this.currentPointsCount;
            }

            this.pointsLabel.string = '' + Math.round(this.currentLabelPointsCount);
        }
    }

    public addPoints(count: number): void {
        this.currentPointsCount += count;

        if (count > 0) {
            this.currentDifference = count;
        }
    }

    public die(): void {
        new cc.Tween(this.pointsLabel.node).to(1, {y: this.pointsLabel.node.y + 50, scale: 0}, {easing: cc.easing.cubicInOut}).start();
        new cc.Tween(this.node).to(1, {opacity: 0}, {easing: cc.easing.cubicInOut}).start();
    }
}
