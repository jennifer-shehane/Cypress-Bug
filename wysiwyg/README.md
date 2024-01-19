# WYSIWYG Editor

This package provides a WYSIWYG (What You See Is What You Get) editor component. It is built using Vuetify3, TypeScript, Vue.js 3, and TipTap. The editor allows users to edit HTML markup directly, providing a live preview of the changes. It's an excellent tool for developers who want to provide an easy-to-use, intuitive interface for users to edit HTML content.

## Installation

To install the necessary dependencies for this project, use the following command:

```bash
yarn install
```

## Commands
Use the following commands to run and build the application:

`yarn dev`: This command runs a standalone application.
`yarn build`: This command builds a WebComponent.

## API
The application includes a wysiwyg-editor WebComponent. This component allows you to edit an HTML markup that is passed to it. The passed content is treated as static. Once the markup is passed to the editor, its changes won't be reflected in the editor and only the initial markup is rendered.

### Passing an HTML markup to the editor
The component has a "content" attribute and a "content" slot which accepts the markup that will be rendered in the editor.

#### Example usage of the "content" attribute:
```<wysiwyg-editor content="<p>Hello, world!</p>"></wysiwyg-editor>```

#### Example usage of the "content" slot:
```
<wysiwyg-editor>
    <div slot="content"><p>Hello, world!</p></div>
</wysiwyg-editor>
```

In the above examples, the content that will be displayed in the editor is `<p>Hello, world!</p>`. Replace this with the actual content you want to display in the WYSIWYG editor.

### Reading the edited content:

To read the HTML markup from the editor, the application should use the WebComponent host component's `_getHTML` method.
An example:
```
<wysiwyg-editor id="editor">
....
</wysiwyg-editor>
```
To read:
"const editorContent:string = document.getElementById('editor')?._getHTML()"

###  VITEST issues:
- Vitest "test.each" doesn't catch test failures. Only the first sample failure is reported.
- Tests are failed running in an emulated DOM environment, but in the real DOM validation behaves differently.

