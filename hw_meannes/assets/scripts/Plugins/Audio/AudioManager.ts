import Sounds from "./Sounds";
import Events from "../../Enums/Events";

const { ccclass, property } = cc._decorator;

@ccclass("SoundOptions")
export class SoundOptions {
    @property() volume: number = 1;
    @property() isLoop: boolean = false;
}


@ccclass("SoundConfig")
export class SoundConfig {
    @property({type: cc.Enum(Sounds)}) sound: Sounds = Sounds.None;
    @property(cc.AudioClip) clip: cc.AudioClip = null;
    @property(SoundOptions) options: SoundOptions = new SoundOptions();
}


@ccclass
export default class AudioManager extends cc.Component {
    private static instance: AudioManager = null;

    @property(SoundConfig) sounds: SoundConfig[] = [];

    protected onLoad(): void {
        if (AudioManager.instance !== null) {
            return;
        }

        AudioManager.instance = this;

        cc.systemEvent.on(Events.AUDIO_PLAY.toString(), this.onAudioPlay, this);
    }

    public play(sound: Sounds, options: SoundOptions | {} = {}): number {
        const config = this.sounds.find(s => s.sound === sound);

        if (config?.clip) {
            const opt = Object.assign({}, config.options, options);

            return this.playSound(config.clip, opt.isLoop, opt.volume);
        } else if (config) {
            cc.warn('No audio clip for sound: ', sound);
        } else {
            cc.warn('Can\'t find sound: ', sound);
        }

        return null;
    }

    public playSound(clip: cc.AudioClip, isLoop: boolean, volume: number): number {
        const actualVolume = volume * cc.audioEngine.getEffectsVolume();

        return cc.audioEngine.play(clip, isLoop, actualVolume);
    }

    public stop(audioId: number): void {
        if (audioId !== null && audioId !== undefined) {
            cc.audioEngine.stop(audioId);
        }
    }

    public stopAll(): void {
        cc.audioEngine.stopAll();
    }

    public pause(audioId: number): void {
        if (audioId !== null && audioId !== undefined) {
            cc.audioEngine.pause(audioId);
        }
    }

    public pauseAll(): void {
        cc.audioEngine.pauseAll();
    }

    public resume(audioId: number): void {
        if (audioId !== null && audioId !== undefined) {
            cc.audioEngine.resume(audioId);
        }
    }

    public resumeAll(): void {
        cc.audioEngine.resumeAll();
    }

    private onAudioPlay(sound: Sounds, optionsOrClip: SoundOptions | cc.AudioClip, isLoop: boolean = false, volume: number = 1): void {
        if (optionsOrClip instanceof cc.AudioClip) {
            this.playSound(optionsOrClip, isLoop, volume);
        } else {
            this.play(sound, optionsOrClip);
        }
    }

    public static getInstance(): AudioManager {
        return this.instance;
    }
}
