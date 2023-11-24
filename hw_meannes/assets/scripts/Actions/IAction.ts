export default interface IAction {
    run(): Promise<void>;
}
