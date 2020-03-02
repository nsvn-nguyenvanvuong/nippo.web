export abstract class ViewModel implements IViewModel {
    public readonly $fetch!: IFetch;
    public readonly $router!: IGoto;

    public readonly $el!: HTMLElement;

    public readonly $menu!: IMenu;

    public readonly $const!: IConfigs;

    public readonly $root!: ViewModel;

    public readonly $parent!: ViewModel;

    public readonly $children!: ViewModel[];

    public readonly $valid!: boolean;

    public readonly $validate!: () => Promise<boolean>;

    public readonly $modal!: (name: string, params?: any) => Promise<any>;

    public readonly $close!: (result?: any) => void;

    public readonly $forceUpdate!: () => void;

    public readonly $nextTick!: (callback: () => void) => number;
}