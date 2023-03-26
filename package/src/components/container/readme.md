# streamline-container

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type      | Default     |
| -------- | --------- | ----------- | --------- | ----------- |
| `active` | `active`  |             | `""`      | `undefined` |
| `test`   | `test`    |             | `boolean` | `undefined` |


## Methods

### `toggle() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [streamline-search](../search)
- [streamline-dropdown](../dropdown)
- [streamline-entries](../entries)
- [streamline-bottom-bar](../bottom-bar)

### Graph
```mermaid
graph TD;
  streamline-container --> streamline-search
  streamline-container --> streamline-dropdown
  streamline-container --> streamline-entries
  streamline-container --> streamline-bottom-bar
  streamline-entries --> streamline-settings
  streamline-entries --> streamline-rows
  streamline-settings --> streamline-header
  streamline-rows --> streamline-row
  streamline-rows --> streamline-header
  streamline-row --> streamline-dropdown
  style streamline-container fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
