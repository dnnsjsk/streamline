import { state } from "../../store/internal";

export const setActions = () => {
  state.entriesActions = [
    {
      type: 'action',
      children: Object.assign(
        {},
        ...Array.from(
          Object.values(state.actions).map((item) => {
            return (
              item.condition &&
              Object.assign({
                [item.id]: {
                  ...state.actions[item.id],
                  type: 'action',
                },
              })
            );
          })
        )
      ),
    },
  ];
}
