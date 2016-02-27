# Angular2 dynamic lazy loading

This is a demo showing how to lazy load Angular 2 components based entirely on the html definition provided in the app component.
The use case for this might be a CMS system where editors want to specify components for the page by simply using a custom tag in a WYSIWYG editor, or apps that have a large number of components that can be moved or removed for a specific page.

This approach uses directory conventions instead of a SystemJS config to load the component.

The following steps are performed by AsyncProvider in app/main.ts:

1. html is extracted from the body of the root component (provided in index.html)
2. The extracted html is analysed for custom tags 
3. AsyncProvider tries to load a component for each custom tag
4. An app level route is generated for each component with the tag name of the component as its base and capitalized name as route name
5. The previously extracted html is used as the template to render the app and defined components
6. App gets loaded using System.import and reads a static property on AsyncProvider to get route, component and template definitions.

## Installation

``
npm install
``

## Running

``
npm start
``

##Usage

Check the .app/main.ts to see an example

###TODO

1. Add some functionality for the demo components
2. Add tests
3. Improve flexibility by supporting subdirectories for components
4. Create an example of component minification (loading as system bundles)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT