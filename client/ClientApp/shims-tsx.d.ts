import {
    Observable as _Observable,
    ObservableArray as _ObservableArray
} from 'knockout';

declare module "*.json" {
    const value: IResources;
    export default value;
}

declare global {
    interface Observable<T> extends _Observable<T> {
    }

    interface ObservableArray<T = any> extends _ObservableArray<T> {
    }

    interface ReadonlyObservable<T = any> extends ko.ObservableFunctions<T> {
        (): T;
    }
    interface ReadonlyObservableArray<T = any> extends ReadonlyObservable<T[]>, ko.ObservableArrayFunctions<T> {
    }

    interface IComponent {
        url?: string;
        name: string;
        template: string;
    }

    interface IRoute {
        url: string;
        name: string;
    }

    interface IRouteConfigs {
        home: string;
        page404: string;
        params: Observable<IParams | null>;
    }

    interface IParams {
        [key: string]: any;
    }

    interface IRouter extends Observable<string> {
        readonly bootstrap: () => void;
        readonly home: (name: string) => IRouter;
        readonly page404: (name: string) => IRouter;
        readonly register: (name: string, url: string) => void;
        readonly goto: {
            (nameOrUrl: string): void;
            (nameOrUrl: string, params: IParams): void;
        };
        readonly title: Observable<string>;
    }

    interface IGoto {
        (nameOrUrl: string): void;
        (nameOrUrl: string, params: IParams): void;
    }

    interface IFetch {
        (settings?: JQuery.AjaxSettings): JQuery.jqXHR;
        (url: string, settings?: JQuery.AjaxSettings): JQuery.jqXHR;
    }

    interface IBindingOption {
        virtual?: boolean;
        bindingName: string;
        validatable?: boolean;
    }

    interface BindingConstructor {
        new(): any;
    }

    interface IComponentOption {
        url?: string;
        title?: string;
        name: string;
        template: string;
        resources?: IResources;
        mixins?: IMixinOption[];
    }

    interface ComponentConstructor {
        new(): any;
    }

    interface ElementRef {
        element: HTMLElement,
        templateNodes: Array<HTMLElement>
    }

    interface IMenu {
        readonly top: Observable<boolean>;
        readonly func: Observable<boolean>;
    }

    interface IConfigs {
        readonly lang: ko.Observable<string>;
        readonly invalid: Symbol;
        readonly startTime: number;
    }

    interface IResources {
        [lg: string]: IResource;
    }

    interface IResource {
        [key: string]: string;
    }

    interface IMixinOption {
        created?: (() => void) | ((params: any) => void) | ((params: any, element: HTMLElement) => void) | ((params: any, element: HTMLElement, templateNodes: HTMLElement[]) => void);
        mounted?: (() => void) | ((element: HTMLElement) => void) | ((element: HTMLElement, templateNodes: HTMLElement[]) => void);
        destroyed?: (() => void);
    }

    interface IWindow {
        readonly width: ReadonlyObservable<number>;
        readonly height: ReadonlyObservable<number>;
        readonly scrollX: ReadonlyObservable<number>;
        readonly scrollY: ReadonlyObservable<number>;
        readonly mode: ReadonlyObservable<'view' | 'modal'>;
    }

    interface IViewModelConstructor {
        new(): IViewModel;
        extend(extend: IMixinOption): IViewModelConstructor;
    }

    interface IViewModel {
        readonly $fetch: IFetch;
        readonly $router: IGoto;

        readonly $el: HTMLElement;

        readonly $menu: IMenu;

        readonly $const: IConfigs;

        readonly $window: IWindow;

        readonly $root: IViewModel;

        readonly $parent: IViewModel;

        readonly $children: IViewModel[];

        readonly $options: IComponentOption;

        readonly $valid: boolean;

        readonly $validate: () => Promise<boolean>;

        readonly $modal: {
            (name: string): Promise<any>;
            (name: string, params: any): Promise<any>;
        };

        readonly $close: {
            (): void;
            (result: any): void;
        };
    }

    interface IUseOption {
        install: () => void;
    }
}

declare module 'knockout' {
    interface ObservableExtenderOptions<T> {
        logChange: string;
    }

    const use: (options: IUseOption) => void;

    const mixin: (mixed: IMixinOption) => void;

    const ViewModel: IViewModelConstructor;
}