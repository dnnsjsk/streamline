# streamline-container

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type      | Default     |
| --------- | --------- | ----------- | --------- | ----------- |
| `network` | `network` |             | `boolean` | `undefined` |
| `test`    | `test`    |             | `boolean` | `undefined` |
| `visible` | `visible` |             | `boolean` | `undefined` |


## Methods

### `setState(data: any) => Promise<unknown>`



#### Returns

Type: `Promise<unknown>`




## Dependencies

### Depends on

- [streamline-search](../search)
- [streamline-dropdown](../dropdown)
- [streamline-entries](../entries)
- [streamline-bottom-bar](../bottom-bar)
- [streamline-drawer](../drawer)

### Graph
```mermaid
graph TD;
  streamline-container --> streamline-search
  streamline-container --> streamline-dropdown
  streamline-container --> streamline-entries
  streamline-container --> streamline-bottom-bar
  streamline-container --> streamline-drawer
  streamline-entries --> streamline-settings
  streamline-entries --> streamline-rows
  streamline-settings --> streamline-header
  streamline-rows --> streamline-header
  streamline-rows --> streamline-row
  streamline-row --> streamline-dropdown
  streamline-drawer --> streamline-input
  style streamline-container fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
