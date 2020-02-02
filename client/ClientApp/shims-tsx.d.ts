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
    }

    interface ComponentConstructor {
        new(): any;
    }

    interface ElementRef {
        element: HTMLElement,
        templateNodes: Array<HTMLElement>
    }

    interface IConfigs {
        readonly lang: ko.Computed<string>;
        readonly invalid: Symbol;
        readonly startTime: number;
    }

    interface IResources {
        [lg: string]: IResource;
    }

    interface IResource {
        [key: string]: string;
    }

    interface IViewModel {
        readonly $el: HTMLElement;
        readonly $const: IConfigs;
        readonly $parent: IViewModel;
        readonly $children: IViewModel[];
        readonly $valid: boolean;
        readonly $validate: () => Promise<boolean>;
    }
}

declare module 'knockout' {
    interface ObservableFunctions<T> {
        readonly vm: IViewModel;
    }

    interface ObservableExtenderOptions<T> {
        logChange: string;
    }
}