import React from 'react'
import { Button, Spinner } from 'react-bootstrap';

export default function ServisSpinner() {
	return (
		<div className='loading-container'>
			<Button variant="outline-warning" >
				<Spinner
					as="span"
					animation="grow"
					size="lg"
					role="status"
					aria-hidden="true"
					className='loading-spinner'
				/>
				<h4>Loading...</h4>
			</Button>
		</div>
	)
}
