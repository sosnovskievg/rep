export default interface IConfiguration {
    applyTransform(node: cc.Node, transformReference?: cc.Node, isConsiderReferenceScale?: boolean);
    getData();
    applyData(v: any);
}