import Events from "../../Enums/Events";
import AudioManager from "../../Plugins/Audio/AudioManager";
import IAction from "../IAction";

const {ccclass, property} = cc._decorator;

@ccclass('PlaySoundActionData')
export class PlaySoundActionData {
    @property() volume: number = 1;
    @property() isLoop: boolean = false;

    @property({visible: function(this) {return this.isLoop}}) isDisableLoopOnEvent: boolean = false;
    @property({type: cc.Enum(Events), visible: function (this) {return this.isLoop && this.isDisableLoopOnEvent}}) disableLoopOnEvent: Events = Events.FIRST_ENEMY_DIE;
    
    @property(cc.AudioClip) clip: cc.AudioClip = null;
    @property(AudioManager) audioManager: AudioManager = null;
}

export default class PlaySoundAction implements IAction {
    private data: PlaySoundActionData = null;

    constructor(data: PlaySoundActionData) {
        this.data = data;
    }

    public run(): Promise<void> {
        if (!cc.audioEngine.isActive) {
            return Promise.resolve();
        }

        if (this?.data?.clip) {
            const audioId = this.data.audioManager.playSound(this.data.clip, this.data.isLoop, this.data.volume);

            if (this.data.isLoop && this.data.isDisableLoopOnEvent) {
                cc.systemEvent.once(this.data.disableLoopOnEvent.toString(), () => {
                    this.data.audioManager.stop(audioId);
                }, this);
            }
        }

        return Promise.resolve();
    }
}