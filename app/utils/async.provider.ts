
// Valid standard html5 elements according to https://www.w3.org/TR/html-markup/elements.html
let validElements = ["math", "svg", "a", "abbr", "address", "area", "article",
    "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "button",
    "button", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "command", "command",
    "command", "command", "datalist", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "embed",
    "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head",
    "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label",
    "legend", "li", "link", "map", "mark", "menu", "meta", "meta", "meta", "meta", "meta", "meta", "meter",
    "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "q",
    "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong",
    "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time",
    "title", "tr", "track", "u", "ul", "var", "video", "wbr"];

interface AsyncConfig {
    components: Array<Object>;
   routeConfig: Array<Object>;
   template: string
}

export default class AsyncProvider {
    static ASYNC_CONFIG: AsyncConfig;

    static SETUP(appTagName: string, componentFolder?: string): Promise<AsyncConfig> {
        if (!!componentFolder) {
            componentFolder = './app/components';
        }

        // We use only the first matching app tag (one root app)
        let appElement: HTMLElement = <HTMLElement>document.getElementsByTagName(appTagName).item(0);

        return this.createResolver(this.generateInfo(appElement, componentFolder), appElement);
    }

    private static generateInfo(appElement: HTMLElement, componentFolder: string): Array<Object> {
        let items: NodeList = appElement.getElementsByTagName('*');
        let componentRoutes:Array<any> = new Array();

        for (let index in items) {
            let item = (<Element>items[index]);

            if (!item.tagName)
                continue; 

            let tagName = item.tagName.toLowerCase();

            if (validElements.indexOf(tagName) < 0) {
                let routeName = tagName.charAt(0).toUpperCase() + tagName.substr(1);

                componentRoutes.push({
                    location: `${componentFolder}/${tagName}/${tagName}.component`,
                    path: `/${tagName}/...`,
                    name: routeName
                });
            }
        }

        return componentRoutes;
    }


    private static createResolver(componentRoutes: Array<any>, appElement: HTMLElement): Promise<AsyncConfig> {

        let asyncResolve = (resolve, reject) => {
            if (componentRoutes.length === 0) {
                resolve(new Array());
            }

            let components = new Array(),
                routeConfig = new Array();

            // Resolving promises one by one
            componentRoutes.forEach((component, i, routes) => {
                System.import(component.location).then((module) => {
                    components.push(module.default);

                    routeConfig.push({
                        path: componentRoutes[i].path,
                        name: componentRoutes[i].name,
                        component: module.default
                    });

                    if (routes.length === ++i) {

                        AsyncProvider.ASYNC_CONFIG = {
                            components: components,
                            routeConfig: routeConfig,
                            template: appElement.innerHTML.trim()
                        };

                        resolve(AsyncProvider.ASYNC_CONFIG);
                    }

                }, (err: Error) => {
                    reject(err);
                });

            });
        };

        return new Promise(asyncResolve);
    }
}

