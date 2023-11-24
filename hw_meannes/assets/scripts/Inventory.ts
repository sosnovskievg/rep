import Settings from "./Plugins/Settings";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Inventory extends cc.Component {

    @property(cc.Sprite) inventorySprite: cc.Sprite = null;


    @property(cc.Node) fishNode: cc.Node = null;
    @property(cc.Node) coinNode: cc.Node = null;
    @property(cc.Node) redCrystallNode: cc.Node = null;
    @property(cc.Node) blueCrystallNode: cc.Node = null;

    public isFishCollected: boolean = false;
    public isCoinCollected: boolean = false;
    public isRedCrystallCollected: boolean = false;
    public isBlueCrystallCollected: boolean = false;


    private settings: Settings = new Settings();


    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
          if(!this.isFishCollected && !this.isCoinCollected && !this.isRedCrystallCollected && !this.isBlueCrystallCollected){
            this.inventorySprite.enabled = false;
          }

          else this.inventorySprite.enabled = true;
          if(!this.settings.IS_LANDSCAPE)
          {
            this.fishNode.angle = 90;
            this.coinNode.angle = 90;
            this.redCrystallNode.angle = 90;
            this.blueCrystallNode.angle = 90;

          }
          else
          {
            this.fishNode.angle = 0;
            this.coinNode.angle = 0;
            this.redCrystallNode.angle = 0;
            this.blueCrystallNode.angle = 0;
          }

    }

    public fishInv(){
        if(this.isFishCollected){
            this.fishNode.active = true;
        }

        if(!this.isFishCollected){
            this.fishNode.active = false;
        }
    }

    public redCrystalInv(){
        if(this.isRedCrystallCollected){
            this.redCrystallNode.active = true;

        }

        if(!this.isRedCrystallCollected){
            this.redCrystallNode.active = false;

        }
    }

    public blueCrystalInv(){
        if(this.isBlueCrystallCollected){
            this.blueCrystallNode.active = true;
        }

        if(!this.isBlueCrystallCollected){
            this.blueCrystallNode.active = false;
        }    

    }

    public coinInv(){
        if(this.isCoinCollected){
            this.coinNode.active = true;
        }

        if(!this.isCoinCollected){
            this.coinNode.active = false;
        }    

    }

}
