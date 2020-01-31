import {
    Observable as _Observable,
    ObservableArray as _ObservableArray
} from 'knockout';

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
        bootstrap: () => void;
        home: (name: string) => IRouter;
        page404: (name: string) => IRouter;
        register: (name: string, url: string) => void;
        goto: {
            (nameOrUrl: string): void;
            (nameOrUrl: string, params: IParams): void;
        };
    }

    interface IGoto {
        (nameOrUrl: string): void;
        (nameOrUrl: string, params: IParams): void;
    }

    interface IFetch {
        (settings?: JQuery.AjaxSettings): JQuery.jqXHR;
        (url: string, settings?: JQuery.AjaxSettings): JQuery.jqXHR;
    }

    interface IBindingParams {
        virtual?: boolean;
        bindingName: string;
        validatable?: boolean;
        resources?: {
            [lang: string]: {
                [key: string]: string;
            }
        }
    }

    interface BindingConstructor {
        new(): any;
    }

    interface IDecoratorComponent {
        url?: string;
        title?: string;
        name: string;
        template: string;
    }

    interface ComponentConstructor {
        new(params: any, element: HTMLElement): any;
    }

    interface ElementRef {
        element: HTMLElement,
        templateNodes: Array<HTMLElement>
    }
}