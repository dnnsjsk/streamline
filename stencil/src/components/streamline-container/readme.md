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
- [streamline-dropdown](../streamline-dropdown)
- [streamline-entries](../streamline-entries)

### Graph
```mermaid
graph TD;
  streamline-container --> streamline-sidebar
  streamline-container --> streamline-search
  streamline-container --> streamline-dropdown
  streamline-container --> streamline-entries
  streamline-entries --> streamline-dropdown
  style streamline-container fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
