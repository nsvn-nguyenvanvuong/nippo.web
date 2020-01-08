import { router } from "./providers";

router.setRoot("#root"); // change the root selector where the Router will render the views

router.onNotFound = function () { router.go("page-404") };

router.registerStaticView("page-404", {
    title: "Not Authorized",
    template: require("../views/404/index.html").default,
    navigatable: false // indicate that this route will not be accissible by navigating directly to it, and it will not be stored in the history
}); // register a template-only view