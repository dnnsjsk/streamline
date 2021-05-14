/**
 * Overlay.
 *
 * @param {Object} props
 */
export default function Overlay( props ) {
	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
		<div onClick={ props.onClick } className="streamline__overlay" />
	);
}
