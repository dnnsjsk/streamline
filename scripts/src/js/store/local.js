import create from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Local state.
 */
export const useStore = create(
	persist(
		( set ) => ( {
			active: false,
			setActive: ( value ) => set( { active: value } ),
		} ),
		{
			name: 'streamline',
		}
	)
);
