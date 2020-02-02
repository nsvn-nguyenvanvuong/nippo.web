export abstract class ViewModel {
    public readonly fetch!: IFetch;
    public readonly router!: IGoto;

    public readonly $el!: HTMLElement;

    public readonly $const!: IConfigs;

    public readonly $parent!: ViewModel;
}