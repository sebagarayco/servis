import React from 'react';

const TimestampConverter = ({ timestamp }) => {
	// Convert the provided timestamp string to a Date object
	const dateObj = new Date(timestamp);

	// Create a new DateTimeFormat instance with the desired options
	const dateFormatter = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		timeZoneName: 'short',
	});

	// Format the Date object using the formatter
	const formattedDate = dateFormatter.format(dateObj);

	return (
		<div>
			<p>{formattedDate}</p>
		</div>
	);
};

export default TimestampConverter;