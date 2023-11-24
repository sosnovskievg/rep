import PlaySoundAction, {PlaySoundActionData} from "./Actions/SimpleActions/PlaySoundAction";
import Analytics from "./Analytics";
import AudioManager from './Plugins/Audio/AudioManager';
import InputManager from "./Plugins/Input/InputManager";
import {InputManagerData} from "./Plugins/Input/InputManagerData";
import InputSources from "./Plugins/Input/InputSources";
import InputTypes from "./Plugins/Input/InputTypes";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SoundButton extends cc.Component {
    @property(cc.Node) on: cc.Node = null;
    @property(cc.Node) off: cc.Node = null;

    @property(PlaySoundActionData) mainMusic: PlaySoundActionData = null;
    // AudioManager: AudioManager;
    private isActive: boolean = false;
    @property(AudioManager) audio: AudioManager = null;
    onLoad () {
        const isActive = cc.audioEngine.isActive || this.isActive;
        this.on.active = isActive;
        this.off.active = !isActive;

        cc.audioEngine.isActive = isActive;

        // cc.audioEngine.stopAll();
        this.audio.stopAll();
        if (isActive) {
            new PlaySoundAction(this.mainMusic).run();
        }

        InputManager.getInstance().on(InputTypes.Down, this.onInput, this);

        Analytics.subscribeToSetSound(() => {
            this.isActive = true;
            this.updateState();
        }, () => {
            this.isActive = false;
            this.updateState();
        })
    }

    private updateState(): void {
        this.on.active = this.isActive;
        this.off.active = !this.isActive;

        cc.audioEngine.isActive = this.isActive;
        // cc.audioEngine.stopAll();
        this.audio.stopAll();

        if (this.isActive) {
            new PlaySoundAction(this.mainMusic).run();
        }

        Analytics.setSound(this.isActive);
    }

    private onInput(data: InputManagerData): void {
        if (data.touchSource === InputSources.SoundButton) {
            this.isActive = !this.isActive;
            this.updateState();
        }
    }
}
