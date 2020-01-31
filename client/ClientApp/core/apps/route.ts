import { ko } from "core/providers";

const a = Object.assign
    , d = Object.defineProperty
    , routes: IRoute[] = []
    , configs: IRouteConfigs = {
        home: '',
        page404: '',
        params: ko.observable(null)
    }
    , title = ko.observable('')
    , router: IRouter = ko.observable('') as any
    , path2RegExp = function (path: string | string[]) {
        if (path instanceof Array) {
            path = '(' + path.join('|') + ')';
        }

        path = path
            .replace(/\/\(/g, '(?:/')
            .replace(/\+/g, '__plus__')
            .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function (_, slash, format, __, capture, optional) {
                slash = slash || '';

                return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')' + (optional || '');
            })
            .replace(/([\/.])/g, '\\$1')
            .replace(/__plus__/g, '(.+)')
            .replace(/\*/g, '(.*)');

        return new RegExp('^' + path + '$', 'i');
    }
    , hashchange = function hashchange() {
        const hash = location.hash.substring(1);

        if (hash) {
            router.goto(hash);
        } else {
            router.goto(configs.home);
        }
    };

d(router, 'home', {
    value: function home(home: string) {
        if (!configs.home) {
            a(configs, { home });
        }
    }
});

d(router, 'page404', {
    value: function page404(page404: string) {
        if (!configs.page404) {
            a(configs, { page404 });
        }
    }
});

d(router, 'bootstrap', {
    value: function bootstrap() { hashchange(); }
});

d(router, 'goto', {
    value: function goto(nameOrUrl: string, params: IParams = {}) {
        const matchParams = /\:[$_a-zA-Z0-9]+(\?)?/g
            , removeParams = /\/\:[$_a-zA-Z0-9]+(\?)?/g
            , firstRun = nameOrUrl !== location.hash.substring(1)
            , matchUrl = (url: string) => path2RegExp(url).test(nameOrUrl)
            , route = routes.find(r => r.name === nameOrUrl || matchUrl(r.url));

        if (firstRun) {
            configs.params(null);
        }

        if (!route) {
            router(configs.page404);

            location.hash = `/${nameOrUrl}`.replace(/\/+/g, '/');
        } else {
            const isUrl = matchUrl(route.url)
                , rawUrl = route.url.replace(removeParams, '')
                , tokens = [...(isUrl ? nameOrUrl : rawUrl).split(/\//)]
                , $match: null | string[] = route.url.match(matchParams);

            if ($match) {
                for (const p in $match) {
                    const idx = (!!tokens[0] ? 1 : 2) + Number(p)
                        , keyName = $match[p].replace(/[\:\?]/g, '');

                    if (params[keyName]) {
                        if (idx === tokens.length) {
                            tokens.push(params[keyName]);
                        }
                    } else {
                        params[keyName] = tokens[idx];
                    }
                }

                // raise change of url
                if (isUrl || firstRun || !ko.toJS(configs.params)) {
                    configs.params(ko.toJS(params));
                }
            }

            router(route.name);

            location.hash = `/${tokens.filter((r: string) => !!r).join('/')}`.replace(/\/+/g, '/');
        }
    }
});

d(router, 'title', {
    value: title
});

d(router, 'register', {
    value: function register(name: string, url: string) {
        const notExist = routes.every((v: IRoute) => v.name !== name);

        if (notExist) {
            routes.push({ url, name });
        }
    }
});

if (!window.addEventListener) {
    window.onhashchange = hashchange;
} else {
    window.addEventListener('hashchange', hashchange);
}

export { router };
export const params = configs.params;