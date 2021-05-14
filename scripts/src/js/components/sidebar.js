import { Button, Toolbar, ToolbarItem } from '@wordpress/components';
import { Icon, menu, moveTo, wordpress } from '@wordpress/icons';

import { useStore as useInternal } from '../store/internal';
import { useStore as useLocal } from '../store/local';

/**
 * Sidebar.
 */
export default function Sidebar() {
	const setVisible = useInternal( ( state ) => state.setVisible );
	const active = useLocal( ( state ) => state.active );
	const setActive = useLocal( ( state ) => state.setActive );

	function toolbarButton( icon, text, callback ) {
		return (
			<ToolbarItem
				as={ Button }
				onClick={ () => setActive( callback ) }
				className={ active === callback && 'streamline-is-active' }
			>
				<Icon icon={ icon } size={ 24 } />
				<span>{ text }</span>
			</ToolbarItem>
		);
	}

	return (
		<div className="streamline__sidebar">
			<Toolbar label="Sidebar">
				<ToolbarItem
					onClick={ () => setVisible( false ) }
					as={ Button }
				>
					<Icon icon={ wordpress } size={ 24 } />
				</ToolbarItem>
				{ toolbarButton( menu, 'Menu', 'menu' ) }
				{ toolbarButton( moveTo, 'Tasks', 'tasks' ) }
			</Toolbar>
		</div>
	);
}
