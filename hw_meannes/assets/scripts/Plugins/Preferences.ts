//@ts-ignore
var ANDROID_URL = window.ANDROID_URL = 'https://apps.apple.com/us/app/karateka-rage/id1486387663';
//@ts-ignore
var IOS_URL = window.IOS_URL = 'https://apps.apple.com/us/app/karateka-rage/id1486387663';

interface TapjoyAPI {
    setPlayableBuild(name: string): void;
    setPlayableAPI(obj: object): void;
    objectiveComplete(): void;
    gameplayFinished(): void;
};



function sendEvent(event: 'startPlayPlayable' | 'finishPlayPlayable' | 'loadMainScene'): void;
function sendEvent(
    event: 'enterSection' | 'autoClick',
    params: {
        section: string;
    }
): void;
//@ts-ignore
function sendEvent(
    event: 'clickDownloadBar' | 'clickResurrection' | 'clickContent' | 'clickFinishDownload Bar' | 'clickFinishContent',
    params: {
        section: string;
        area: string;
    }
): void;

interface ByteDanceAPI {
    sendEvent: typeof sendEvent;
}

type GlobalType = {
    gameEnd: Function,
    TJ_API: TapjoyAPI,
    BD_API: ByteDanceAPI,
};


export default class Preferences {
    static REDIRECT_URL = '';

    //@ts-ignore
    static AD_NET: string = window.AD_NET || 'ggl';

    //@ts-ignore
    static ANALYTICS_ON: boolean = typeof window.ANALYTICS_ON === 'boolean' ? window.ANALYTICS_ON : false;

    //@ts-ignore
    static SOUND_ON: boolean = typeof window.SOUND_ON === 'boolean' ? window.SOUND_ON : true;

    static global: GlobalType = {
        // @ts-ignore
        gameEnd: window.gameEnd,

        //@ts-ignore
        TJ_API: window.TJ_API,

        //@ts-ignore
        BD_API: window.playableSDK,
    };
}

//@ts-ignore
window.AD_NET = Preferences.AD_NET;