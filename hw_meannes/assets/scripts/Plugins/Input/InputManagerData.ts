import InputTypes from "./InputTypes";
import InputSources from "./InputSources";


export type InputManagerData = {
    eventTouch: cc.Event.EventTouch,
    touchSource: InputSources,
    type: InputTypes
};