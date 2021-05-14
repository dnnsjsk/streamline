import {
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalInputControl as InputControl,
	withFocusReturn,
} from '@wordpress/components';

/**
 * Search.
 *
 * @param {Object} props
 */
export default function Search( props ) {
	const Input = withFocusReturn( () => (
		<InputControl
			/* eslint-disable-next-line jsx-a11y/no-autofocus */
			autoFocus={ true }
			value={ props.value }
			onChange={ props.onChange }
			placeholder="Do something for me.."
		/>
	) );

	return (
		<div className="streamline__search">
			<Input />
		</div>
	);
}
