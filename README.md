# Data Transformer Playground

The Data Transformer Playground extension enables you to develop, debug and test Data Transformer scripts for use in the [Google Cloud Application Integration](https://cloud.google.com/application-integration) solution.

The Data Transformer Script task in Google Cloud Application Integration provides Jsonnet based data mapping. The task allows you to create Jsonnet scripts that define the mapping relationships for the specified source and target integration variables in your integrations.

This extension is intended to assist in the development and testing of those Jsonnet scripts. It allows you to create playgrounds, develop scripts, define external variables and test them against the Data Transformer Playground Jsonnet engine.

![Demo](https://github.com/andythehood/playground-vscodeext/blob/main/media/playground1.gif?raw=true)

## Features

- **Jsonnet Language Support** provides basic Jsonnet language support including colorization, syntax highlighting and semantic tokens for the Standard and additional Functions libraries.
- **Code completion** provides snippets and context sensitive help for the Standard and additional Functions libraries.
- **Document Formatting** using the [go-jsonnet](https://pkg.go.dev/github.com/google/go-jsonnet) formatter with its default options.
- **Snapshots** allow point in time copies of a playground to be taken.
- **Import and Export** of Playgrounds in JSON format for collaboration and sharing. Playground files are compatible with the [Data Transformer Web Application](https://datatransformer-playground.web.app).
- **Tracing** support for the `std.trace()` function, with the trace output copied to the Data Transformer Output window.

## Requirements

The Data Transformer Playground requires internet access to the Data Transformer Playground server at https://datatransformer-playground.web.app.

Playgrounds, scripts and variables definitions are stored in a local, workspace specific, storage location where the extension has read/write access. By default, this is the location defined by the Workspace's ExtensionContext.storageUri setting. Please see the Visual Studio Code documentation for [Data Storage](https://code.visualstudio.com/api/extension-capabilities/common-capabilities#data-storage) for more information.

The default playground location can be overridden using the `datatransformer.playground.playgroundStorageLocation` extension setting.

## Useful Links

The following links provide reference information on the functions available in the Jsonnet Standard library and the additional functions available in the Data Transformer functions library:

- [Jsonnet standard library functions reference](https://jsonnet.org/ref/stdlib.html)

- [Data Transformer additional functions reference](https://cloud.google.com/application-integration/docs/data-transformer-functions-reference)

## Extension Settings

This extension contributes the following settings:

- `datatransformer.playground.serverUrl`: URL of the Data Transformer Server. Default https://datatransformer-playground.web.app

- `datatransformer.playground.playgroundStorageLocation`: Local folder for storing playground. If not specified, this defaults to a Workspace specific storage location (ExtensionContext.storageUri). **_You must reopen the workspace after changing this value_**

## Known Issues

#### Disclaimer

_There may be some minor differences in the behaviour of the Data Transformer additional library functions implemented in this tool and those in the Google Cloud Application Integration product._

## Release Notes

### 0.2.0

- Add support for Jsonnet libraries

### 0.1.6

- Add resolveJsonPath and xsltTransform commands

### 0.1.5

- Add registerCommand disposables to context.subscriptions

- Prepend extension name to create unique view names

- Fix 'id already registered' bug due to overload of id parameter

### 0.1.4

- Add ability to add test case directly from output

### 0.1.3

- Fixes for iconpath on windows

### 0.1.2

- Add test case feature

### 0.1.1

- First release of Extension on Vscode Marketplace

### 0.1.0

- Initial pre-release of Data Transformer Playground
