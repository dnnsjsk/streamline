# streamline-container

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type      | Default     |
| --------- | --------- | ----------- | --------- | ----------- |
| `mac`     | `mac`     |             | `boolean` | `false`     |
| `visible` | `visible` |             | `boolean` | `undefined` |


## Methods

### `toggle() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `toggleTest() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [streamline-box](../streamline-box)

### Graph
```mermaid
graph TD;
  streamline-container --> streamline-box
  streamline-box --> streamline-sidebar
  streamline-box --> streamline-search
  streamline-box --> streamline-entries
  streamline-sidebar --> streamline-button
  streamline-search --> streamline-button
  streamline-entries --> streamline-button
  streamline-entries --> streamline-post
  style streamline-container fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
