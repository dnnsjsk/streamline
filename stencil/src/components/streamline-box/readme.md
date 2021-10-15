# streamline-box

<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [streamline-container](../streamline-container)

### Depends on

- [streamline-sidebar](../streamline-sidebar)
- [streamline-search](../streamline-search)
- [streamline-entries](../streamline-entries)

### Graph
```mermaid
graph TD;
  streamline-box --> streamline-sidebar
  streamline-box --> streamline-search
  streamline-box --> streamline-entries
  streamline-sidebar --> streamline-button
  streamline-entries --> streamline-button
  streamline-entries --> streamline-post
  streamline-container --> streamline-box
  style streamline-box fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
