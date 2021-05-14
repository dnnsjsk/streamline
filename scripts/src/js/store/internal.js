import create from 'zustand';

/**
 * Internal state.
 */
export const useStore = create( ( set ) => ( {
	visible: false,
	setVisible: ( value ) => set( { visible: value } ),
	menu: [],
	setMenu: ( value ) => set( { menu: value } ),
} ) );
