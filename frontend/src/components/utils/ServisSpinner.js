import React from 'react'
import { Button, Spinner } from 'react-bootstrap';

export default function ServisSpinner() {
	return (
		<div>
			<Button variant="warning" >
				<Spinner
					as="span"
					animation="border"
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
