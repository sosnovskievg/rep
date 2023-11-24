import EasingTypes from "../../Enums/EasingTypes";
import Events from "../../Enums/Events";
import Settings from "../Settings";
import CameraBox from "./CameraBox";
import FitModes from "./FitModes";
import StickModes from "./StickModes";

const { ccclass, menu, property } = cc._decorator;

@ccclass('CameraBoxes')
export class CameraBoxes {
    @property() isSameTransform: boolean = true;
    @property(CameraBox) landscape: CameraBox = new CameraBox();
    @property({type: CameraBox, visible: function () {return !this.isSameTransform}}) portrait: CameraBox = new CameraBox();
}

@ccclass
@menu('Camera/CameraController')
export default class CameraController extends cc.Component {
    @property(CameraBoxes) initialCameraBox: CameraBoxes = new CameraBoxes();

    private settings: Settings = new Settings();
    private zoomTween: cc.Tween = null;
    private moveTween: cc.Tween = null;
    private camera: cc.Camera = null;
    private target: cc.Node = null;

    private width: number = 0;
    private height: number = 0;
    private currentZoomRatio: number = 1;
    private zoomCoef: number = 1;

    private currentCameraBox: CameraBox = null;

    private targetCameraBox: CameraBox = null;
    private targetPos: cc.Vec2 = cc.v2();
    private targetZoomRatio: number = 1;

    private isMoving: boolean = false;

    private currentBoxes: CameraBoxes = null;

    onLoad () {
        this.camera = this.node.getComponent(cc.Camera);

        if (this.initialCameraBox) {
            this.setCameraBox(this.initialCameraBox);
        }

        cc.systemEvent.on(Events.WINDOW_RESIZED.toString(), this.onWindowResized, this);

        CameraController.instance = this;
    }

    update (dt) {
        if (!this.isMoving) {
            this.refreshCameraPosition();
        }


    }

    /**
     * @deprecated The method should not be used
     */
    public zoomCamera(zoom: number = 1, duration: number = 0): void {
        if (this.isMoving) {
            return;
        }

        if (this.zoomTween) {
            this.zoomTween.stop();
        }

        const interpol = {x: 0};
        const self = this;

        this.zoomTween = new cc.Tween(interpol).to(duration, {x: 1}, {
            easing: cc.easing.smooth, progress: (start, end, current, ratio) => {
                const newX = start + (end - start) * ratio;
                self.camera.zoomRatio = self.currentZoomRatio + self.currentZoomRatio * (zoom - 1) * newX;

                return newX;
            }
        }).call(() => {
            self.camera.zoomRatio = self.currentZoomRatio * zoom;
            self.zoomCoef *= zoom;
        }).start();
    }

    public setCameraBox(box: CameraBoxes, speed: number = 0, delay: number = 0, easing: EasingTypes = EasingTypes.quadInOut): Promise<void> {
        this.stopMove();
        if (!box || !box.landscape || this.isMoving) return Promise.reject();
        if (this.currentBoxes === box) return Promise.resolve();

        

        this.currentBoxes = box;

        const newBox = this.getCurrentBox();

        if (!speed || !this.currentCameraBox) {
            this.currentCameraBox = newBox;

            const targetBox = this.getTarget(this.currentCameraBox.defaultBox, this.currentCameraBox.isUsingSideRatio, this.currentCameraBox.minimalBox, this.currentCameraBox.sideRatio);
            this.node.setPosition(this.getCameraPosition(targetBox, this.currentCameraBox.focus));
            this.camera.zoomRatio = this.getZoomRatio(targetBox);

            this.captureTarget();
            this.refreshCameraZoomRatio();

            return Promise.resolve();
        } else {
            this.isMoving = true;
            this.targetCameraBox = newBox;

            this.stopTweens();

            return new Promise((resolve) => {
                cc.systemEvent.once(Events.WINDOW_RESIZED.toString(), () => {
                    resolve();
                }, this);

                const targetBox = this.getTarget(this.targetCameraBox.defaultBox, this.targetCameraBox.isUsingSideRatio, this.targetCameraBox.minimalBox, this.targetCameraBox.sideRatio);

                this.targetPos = this.getCameraPosition(targetBox, this.targetCameraBox.focus);
                this.targetZoomRatio = this.getZoomRatio(targetBox);

                const obj = {
                    currentPos: this.node.getPosition(),
                    endPos: this.targetPos,
                    currentZoomRatio: this.camera.zoomRatio,
                    endZoomRatio: this.targetZoomRatio,
                };

                const distance = Math.sqrt(Math.pow(this.targetPos.x - this.node.position.x, 2) + Math.pow(this.targetPos.y - this.node.position.y, 2));
                const duration = distance / speed;

                this.moveTween = new cc.Tween()
                    .target(obj)
                    .delay(delay)
                    .to(duration, {
                        currentPos: {
                            value: this.targetPos, 
                            progress: (start, end, current, t) => {
                                const newPos = start.lerp(this.targetPos, t, current);
                                this.node.setPosition(newPos);

                                return newPos;
                            },
                        }, 
                        currentZoomRatio: {
                            value: this.targetZoomRatio,
                            progress: (start, end, current, ratio) => {
                                const newZoomRatio = start + (this.targetZoomRatio - start) * ratio;
                                this.camera.zoomRatio = newZoomRatio;

                                return newZoomRatio;
                            },
                        },
                    }, {easing: cc.easing[EasingTypes[easing]]})
                    .call(() => {
                        this.isMoving = false;
                        this.currentCameraBox = this.targetCameraBox;
                        this.targetCameraBox = null;
                      
                        this.captureTarget();
                        // TODO:
                        // this.refreshCameraZoomRatio();

                        resolve();
                    })
                    .start();
            });
        }        
    }

    private getCurrentBox(): CameraBox {
        return (this.currentBoxes.isSameTransform || this.settings.IS_LANDSCAPE) ? this.currentBoxes.landscape : this.currentBoxes.portrait;
    }

    private stopTweens(): void {
        if (this.zoomTween) {
            this.zoomTween.stop();
        }

        if (this.moveTween) {
            this.moveTween.stop();
        }
    }

    private refreshCameraPosition(): void {
        if (!this.target) return;

        this.node.setPosition(this.getCameraPosition(this.target, this.currentCameraBox.focus));
    }

    private getCameraPosition(target: cc.Node, focus: cc.Vec2): cc.Vec2 {
        const targetWorldPosition = target.convertToWorldSpaceAR(cc.Vec2.ZERO);

        const offset = new cc.Vec2(target.width * target.scaleX * (focus.x - target.anchorX),
            target.height * target.scaleY * (focus.y - target.anchorY));

        const cameraWorldPosition = targetWorldPosition.add(offset);
        this.checkBorderBoxes(cameraWorldPosition, target);
        const cameraLocalPosition = this.node.getParent().convertToNodeSpaceAR(cameraWorldPosition);

        return cameraLocalPosition;
    }

    private checkBorderBoxes(cameraWorldPosition: cc.Vec2, target: cc.Node): void {
        const halfWidth = this.width * 0.5;
        const halfHeight = this.height * 0.5;

        const selfTopRight = cc.v2(cameraWorldPosition.x + halfWidth, cameraWorldPosition.y + halfHeight);
        const selfBotLeft = cc.v2(cameraWorldPosition.x - halfWidth, cameraWorldPosition.y - halfHeight);

        const newTopRight = selfTopRight.clone();
        const newBotLeft = selfBotLeft.clone();

        const obw = 0.5 * target.width * target.scaleX;
        const obh = 0.5 * target.height * target.scaleY;
        const oboxWorld = target.convertToWorldSpaceAR(cc.Vec2.ZERO);
        const oboxTopRight = cc.v2(oboxWorld.x + obw, oboxWorld.y + obh);
        const oboxBotLeft = cc.v2(oboxWorld.x - obw, oboxWorld.y - obh);

        if (selfTopRight.x > oboxTopRight.x) {
            newTopRight.x = oboxTopRight.x;
        }

        if (selfTopRight.y > oboxTopRight.y) {
            newTopRight.y = oboxTopRight.y;
        }

        if (selfBotLeft.x < oboxBotLeft.x) {
            newBotLeft.x = oboxBotLeft.x;
        }

        if (selfBotLeft.y < oboxBotLeft.y) {
            newBotLeft.y = oboxBotLeft.y;
        }

        switch (this.currentCameraBox.stickMode) {
            case StickModes.Top:
                cameraWorldPosition.x = newBotLeft.x + (newTopRight.x - newBotLeft.x) * 0.5;
                cameraWorldPosition.y = newTopRight.y - halfHeight;
                break;

            case StickModes.Bottom:
                cameraWorldPosition.x = newBotLeft.x + (newTopRight.x - newBotLeft.x) * 0.5;
                cameraWorldPosition.y = newBotLeft.y + halfHeight;
                break;

            case StickModes.Right:
                cameraWorldPosition.x = newTopRight.x - halfWidth;
                cameraWorldPosition.y = newBotLeft.y + (newTopRight.y - newBotLeft.y) * 0.5;
                break;

            case StickModes.Left:
                cameraWorldPosition.x = newBotLeft.x + halfWidth;
                cameraWorldPosition.y = newBotLeft.y + (newTopRight.y - newBotLeft.y) * 0.5;
                break;

            case StickModes.None:
            default:
                cameraWorldPosition.x = newBotLeft.x + (newTopRight.x - newBotLeft.x) * 0.5;
                cameraWorldPosition.y = newBotLeft.y + (newTopRight.y - newBotLeft.y) * 0.5;
                break;
        }
    }

    private captureTarget(): void {
        this.target = this.getTarget(this.currentCameraBox.defaultBox, this.currentCameraBox.isUsingSideRatio, this.currentCameraBox.minimalBox, this.currentCameraBox.sideRatio);
    }

    private getTarget(defaultBox: cc.Node, isUsingSideRatio: boolean = false, minimalBox: cc.Node = null, minSideRatio: number = 1.35): cc.Node {
        if (isUsingSideRatio && minimalBox) {
            const gw = this.settings.GAME_WIDTH;
            const gh = this.settings.GAME_HEIGHT;
            const sideRatio = Math.max(gw / gh, gh / gw);

            return sideRatio > minSideRatio ? defaultBox : minimalBox;
        } else {
            return defaultBox;
        }
    }

    private refreshCameraZoomRatio(): void {
        if (!this.target) return;

        const zoomRatio = this.getZoomRatio(this.target);

        this.camera.zoomRatio = zoomRatio;
        this.currentZoomRatio = zoomRatio;

        this.width = this.settings.GAME_WIDTH / zoomRatio;
        this.height = this.settings.GAME_HEIGHT / zoomRatio;
    }

    private getZoomRatio(target: cc.Node): number {
        const tw = target.width;
        const th = target.height;
        const gw = this.settings.GAME_WIDTH;
        const gh = this.settings.GAME_HEIGHT;

        const zX = gw / tw;
        const zY = gh / th;

        let zoomRatio = 1;

        switch (this.currentCameraBox.fitMode) {
            case FitModes.Width:
                zoomRatio = zX;
                break;
            case FitModes.Height:
                zoomRatio = zY;
                break;
            case FitModes.Inscribe:
                zoomRatio = Math.max(zX, zY);
                break;
            case FitModes.Default:
            case FitModes.Describe:
                zoomRatio = Math.min(zX, zY);
                break;
            case FitModes.None:
                zoomRatio = 1;
                break;
        }

        zoomRatio *= this.zoomCoef;

        return zoomRatio;
    }

    private onWindowResized(settings: Settings): void {
        this.width = settings.GAME_WIDTH;
        this.height = settings.GAME_HEIGHT;

        if (this.isMoving) {
            this.stopTweens();

            this.isMoving = false;
            this.targetCameraBox = null;
        }

        this.currentCameraBox = this.getCurrentBox();

        this.captureTarget();
        this.refreshCameraZoomRatio();
    }

    static getInstance(): CameraController {
        if (this.instance) {
            return this.instance;
        }

        return null;
    }

    public stopMove(): void {
        if (this.isMoving) {
            this.stopTweens();

            this.isMoving = false;
            this.targetCameraBox = null;
        }
    }

    static instance: CameraController;
}