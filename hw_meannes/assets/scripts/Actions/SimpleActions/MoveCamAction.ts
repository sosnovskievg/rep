import CameraBox from "../../Plugins/Camera/CameraBox";
import CameraController from "../../Plugins/Camera/CameraController";
import IAction from "../IAction";

const {ccclass, property} = cc._decorator;

@ccclass('MoveCamActionData')
export class MoveCamActionData {
    @property() speed: number = 300;
    @property(CameraBox) cameraBox: CameraBox = null;
}

export default class MoveCamAction implements IAction {
    private data: MoveCamActionData = null;

    constructor(data: MoveCamActionData) {
        this.data = data;
    }

    public run(): Promise<void> {
        const camera = CameraController.getInstance();

        return new Promise((resolve) => {
            // camera.setCameraBox(this.data.cameraBox, this.data.speed).then(() => resolve());
        });
    }
}