import { useEffect, useState } from '@wordpress/element';
import { filterDeep } from 'deepdash-es/standalone';

import Entries from './entries';
import Search from './search';

/**
 * App.
 */

export function Box( props ) {
	const [ value, setValue ] = useState( '' );
	const [ obj, setObj ] = useState( [] );

	const data = props.items;

	function onValueChange( nextValue ) {
		setValue( nextValue );
		console.log( nextValue );

		const newObj =
			obj === null || nextValue === ''
				? data
				: filterDeep(
						obj.filter(
							( val ) => Object.keys( val ).length !== 0
						),
						function ( o ) {
							return o.name
								.toLowerCase()
								.includes( nextValue.toLowerCase() );
						},
						{ childrenPath: 'children' }
				  );

		setObj( newObj );
	}

	useEffect( () => {
		setObj( data );
	}, [] );

	return (
		<div className="streamline__box">
			<Search
				value={ value }
				onChange={ ( nextValue ) => onValueChange( nextValue ) }
			/>
			<Entries items={ obj } />
		</div>
	);
}
