import { _, ko } from 'core/providers';

ko.use({
    install: () => {
        _.each(ko, (v: any) => {
            if (v['prototype'] && v['prototype']['createChildContext']) {
                const $createChildContext: () => any = v['prototype']['createChildContext'];

                v['prototype']['createChildContext'] = function () {
                    const ctx = this
                        , args: any = [].slice.apply(arguments, [])
                        , $childContext = $createChildContext.apply(ctx, args);

                    let $parent = $childContext['$parent'],
                        $component = $childContext['$component'];

                    while (!$component && $parent) {
                        $component = $parent['$component'];

                        $parent = $parent['$parent'];
                    }

                    $childContext['$vm'] = $component || $childContext.$data;

                    return $childContext;
                };
            }
        });
    }
});