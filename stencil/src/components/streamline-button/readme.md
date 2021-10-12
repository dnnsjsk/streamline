# streamline-button

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description | Type      | Default     |
| ------------- | -------------- | ----------- | --------- | ----------- |
| `adminUrl`    | `admin-url`    |             | `string`  | `undefined` |
| `header`      | `header`       |             | `string`  | `undefined` |
| `href`        | `href`         |             | `string`  | `undefined` |
| `icon`        | `icon`         |             | `string`  | `undefined` |
| `index`       | `index`        |             | `number`  | `undefined` |
| `indexInner`  | `index-inner`  |             | `number`  | `undefined` |
| `indexSub`    | `index-sub`    |             | `number`  | `undefined` |
| `isFavourite` | `is-favourite` |             | `boolean` | `undefined` |
| `path`        | `path`         |             | `string`  | `undefined` |
| `siteId`      | `site-id`      |             | `number`  | `undefined` |
| `text`        | `text`         |             | `string`  | `undefined` |
| `type`        | `type`         |             | `string`  | `undefined` |
| `typeSub`     | `type-sub`     |             | `string`  | `undefined` |


## Methods

### `toggleFavourite() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [streamline-entries](../streamline-entries)
 - [streamline-sidebar](../streamline-sidebar)

### Graph
```mermaid
graph TD;
  streamline-entries --> streamline-button
  streamline-sidebar --> streamline-button
  style streamline-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
