# streamline-container

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type      | Default     |
| --------- | --------- | ----------- | --------- | ----------- |
| `mac`     | `mac`     |             | `boolean` | `false`     |
| `visible` | `visible` |             | `boolean` | `undefined` |


## Methods

### `setData(data: any) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `toggle() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `toggleTestFull(type: any) => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [streamline-sidebar](../streamline-sidebar)
- [streamline-search](../streamline-search)
- [streamline-ui-dropdown](../ui/streamline-ui-dropdown)
- [streamline-entries](../streamline-entries)
- [streamline-ui-drawer](../ui/streamline-ui-drawer)

### Graph
```mermaid
graph TD;
  streamline-container --> streamline-sidebar
  streamline-container --> streamline-search
  streamline-container --> streamline-ui-dropdown
  streamline-container --> streamline-entries
  streamline-container --> streamline-ui-drawer
  streamline-entries --> streamline-ui-dropdown
  streamline-ui-drawer --> streamline-ui-input
  style streamline-container fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
