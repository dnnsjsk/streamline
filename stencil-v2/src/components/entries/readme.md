# streamline-entries



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [streamline-container](../container)

### Depends on

- [streamline-settings](../settings)
- [streamline-rows](../rows)

### Graph
```mermaid
graph TD;
  streamline-entries --> streamline-settings
  streamline-entries --> streamline-rows
  streamline-rows --> streamline-header
  streamline-rows --> streamline-row
  streamline-row --> streamline-dropdown
  streamline-container --> streamline-entries
  style streamline-entries fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
