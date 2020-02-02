export abstract class ViewModel implements IViewModel {
    public readonly $fetch!: IFetch;
    public readonly $router!: IGoto;

    public readonly $el!: HTMLElement;

    public readonly $const!: IConfigs;

    public readonly $parent!: ViewModel;

    public readonly $children!: ViewModel[];

    public readonly $valid!: boolean;

    public readonly $validate!: () => Promise<boolean>;

    public readonly $modal!: (name: string, params?: any) => Promise<any>;
}