import { Fragment, render, useEffect, useState } from '@wordpress/element';
import { ScrollLock, KeyboardShortcuts } from '@wordpress/components';
import Overlay from './components/overlay';
import { Box } from './components/box';

import '../scss/streamline.scss';

/**
 * App.
 */

export function App() {
	const [ active, setActive ] = useState( '' );
	const [ items, setItems ] = useState( [] );

	const toggleActive = () => {
		setActive( active !== true );
	};
	const removeActive = () => {
		setActive( false );
	};

	const obj = [];
	const go = {};

	document.querySelectorAll( '.menu-top > a' ).forEach( ( item ) => {
		const name = item.innerText.replace( /(\r\n|\n|\r)/gm, '' );
		const href = item.getAttribute( 'href' );

		const subMenu = item.closest( 'li.menu-top' );
		const subArr = [];

		if ( subMenu ) {
			subMenu.querySelectorAll( 'a' ).forEach( ( itemSub ) => {
				const nameSub = itemSub.innerText.replace(
					/(\r\n|\n|\r)/gm,
					''
				);
				const hrefSub = itemSub.getAttribute( 'href' );

				subArr.push( {
					name: nameSub,
					href: hrefSub,
				} );
			} );
		}

		obj.push( {
			name,
			href,
			children: subArr,
		} );
	} );

	obj.push( go );

	useEffect( () => {
		setItems( obj );
		setActive( false );
	}, [] );

	return (
		<Fragment>
			<KeyboardShortcuts
				bindGlobal={ true }
				shortcuts={ {
					'command+k': toggleActive,
					esc: removeActive,
				} }
			/>
			{ active && (
				<div className="streamline__inner">
					<Overlay onClick={ removeActive } />
					{ items && <Box items={ items } /> }
					<ScrollLock />
				</div>
			) }
		</Fragment>
	);
}
render( <App />, document.getElementById( `streamline` ) );
