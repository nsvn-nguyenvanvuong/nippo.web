import { $ } from 'core/providers';

$.ajaxPrefilter('*', (option: JQuery.AjaxSettings<any>) => {
    option.crossDomain = true;

    // withCredentials
    option.xhrFields = {
        withCredentials: true
    };

    if (option.url) {
        if (!option.url.match(/^https?:\/\//)) {
            option.url = `http://${`localhost:8080/webapi/${option.url}`.replace(/\/{2,}/g, '/')}`;
        }
    }
});