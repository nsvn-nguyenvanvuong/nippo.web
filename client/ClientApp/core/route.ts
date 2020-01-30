import { ko } from "./providers";

const a = Object.assign
    , d = Object.defineProperty
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
        const hash = location.hash.substring(1)
            , params = router.params || {};

        a(router, { params });

        if (hash) {
            // code at here
            router('home');
            console.log(hash);
        } else {
            router.goto(((router as any).home as string));
        }
    };

d(router, 'set', {
    value: function set(home?: string, notFound?: string) {
        if (!(router as any).home) {
            d(router, 'home', { value: home });

            d(router, 'notFound', { value: notFound });

            hashchange();
        }
    }
});

d(router, 'goto', {
    value: function goto(nameOrUrl: string, params: IParams = {}) {
        const matchParams = /\:[$_a-zA-Z0-9]+(\?)?/g
            , removeParams = /\/\:[$_a-zA-Z0-9]+(\?)?/g
            , routes: IRoute[] = (router as any).routes
            , route = routes.find(r => r.name === nameOrUrl || r.url.replace(removeParams, '') === nameOrUrl);

        if (route) {
            const urls = [route.url.replace(removeParams, '')]
                , $match: null | string[] = route.url.match(matchParams);

            if ($match) {
                for (const p in $match) {
                    const key = $match[p].replace(/[\:\?]/g, '');

                    if (params[key]) {
                        urls.push(params[key]);
                    }
                }
            }

            // raise change of url 
            a(router, { params });

            location.hash = urls.join('/');
        } else {
            location.hash = `/${nameOrUrl}`.replace(/\/+/g, '/');
        }
    }
});

d(router, 'routes', { value: [] });

d(router, 'register', {
    value: function register(name: string, url: string) {
        const routes: IRoute[] = (router as any).routes
            , notExist = routes.every((v: IRoute) => v.name !== name);

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