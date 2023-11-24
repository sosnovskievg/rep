export default class Analytics {
    static subscribeToSetSound(onSetSoundOn: Function, onSetSoundOff: Function): void {
        // window.addEventListener('message', function (message) {
        //     if (message.source !== (window.opener || window.parent)) return;

        //     const data = message.data;

        //     if (data?.type === 'game_client.music') {
        //         if (data.payload?.value) {
        //             onSetSoundOn();
        //         } else {
        //             onSetSoundOff();
        //         }
        //     }
        // });
    }

    static setFirstClick(): void {
        this.sendEvent('firstClick');
    }

    static setWin(): void {
        this.sendEvent('win');
    }

    static setFail(): void {
        this.sendEvent('fail');
    }

    static setRestart(): void {
        this.sendEvent('retry');
    }

    static setReady(): void {
        this.sendEvent('playablePageView');
    }

    static setLogo(): void {
        this.sendEvent('logo');
    }

    static setNextLevels(): void {
        this.sendEvent('iconswin');
    }

    static setFailInstall(): void {
        this.sendEvent('failInstall');
    }

    static setWinInstall(): void {
        this.sendEvent('winInstall');
    }

    static setLoad(): void {
        if (!window.IS_RESTART) {
            this.sendEvent('playableStart');
        }
    }

    static introEnd(): void {
        this.sendEvent('introEnd');

    }

    static setSound(isActive: boolean): void {
        this.sendEvent('sound');
    }


    static sendEvent(type: string, payload: any = false): void {
        // const msg = {
        //     type: type,
        // };

        // if (payload) {
        //     msg.payload = payload;

        //     console.log('PostMessage: ' + type, payload);
        // } else {
        //     console.log('PostMessage: ' + type);
        // }

        // (window.opener || window.parent)?.postMessage(msg, '*');

        const playableName = "hw_ph_meannes1";
        const currentChannel = window.currentChannel || 'default';

        if (window.gtag) {
            window.gtag("event", type, {
                eventPlayable: playableName,
                channel: currentChannel,
            });
        }

        console.log(type, playableName, currentChannel);
    }
}
