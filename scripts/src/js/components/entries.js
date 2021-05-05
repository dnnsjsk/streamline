/**
 * Entries.
 */
import { Button } from '@wordpress/components';

export default function Entries( props ) {
	return (
		<ul tabIndex="-1" className="streamline__entries">
			{ props.items &&
				[ props.items ].map( ( item ) => {
					return Object.values( item ).map(
						( itemInner, indexInner ) => {
							return (
								<li
									className="streamline__entry"
									key={ indexInner }
								>
									<a href={ itemInner.href }>
										<span>{ itemInner.name }</span>
									</a>
									{ itemInner.children && (
										<ul className="streamline__entries--sub">
											{ Object.values(
												itemInner.children
											).map( ( itemSub, indexSub ) => {
												return (
													<li
														className="streamline__entry--sub"
														key={ indexSub }
													>
														<Button
															isTertiary
															href={
																itemSub.href
															}
														>
															{ itemSub.name }
														</Button>
													</li>
												);
											} ) }
										</ul>
									) }
								</li>
							);
						}
					);
				} ) }
		</ul>
	);
}
