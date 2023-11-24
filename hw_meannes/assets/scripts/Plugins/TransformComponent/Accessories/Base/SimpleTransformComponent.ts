import IConfiguration from "./IConfiguration";

const { ccclass, property } = cc._decorator;

type ConfigurationData = {
    isActive: boolean,
    config: any,
}

@ccclass('SimpleTransformComponent')
export default abstract class SimpleTransformComponent {
    @property({ visible: false }) private _isActive: boolean = false;
    @property()
    protected set isActive(v: boolean) { this._isActive = v; this.reset(v); };
    protected get isActive(): boolean { return this._isActive; };

    protected configuration: IConfiguration = null;

    public disable() { this.isActive = false; }
    public enable() { this.isActive = true; }


    public abstract execute(node: cc.Node, transformReference: cc.Node);
    protected abstract reset(isActive: boolean);




    public getData(): ConfigurationData {
        const configurationData = this.configuration ? this.configuration.getData() : null;

        return {
            isActive: this.isActive,
            config: configurationData,
        };
    }

    public applyData(data: ConfigurationData) {
        if (!data) return;

        this.isActive = data.isActive;
        if (data.config && this.configuration) this.configuration.applyData(data.config);
    }

}