import React, { PropTypes } from 'react';
import Config from '../../config';
import '../../styles/recurrence-radio.css';

const RecurrenceRadio = ({ selectedIndex, onChange }) => {
	const actualIndex = selectedIndex % Config.RecurrenceTypes.length;
	return (
		<div className="recurrence-radio">
		{
			Config.RecurrenceTypes.map((type, index) => {
				if (actualIndex === index) {
					return (
						<div className="recurrence-item-wrapper" key={index}>
							<div className="recurrence-radio-item recurrence-radio-selected">{type}</div>
						</div>
					);
				}

				return (
					<div className="recurrence-item-wrapper" key={index}>
						<div className="recurrence-radio-item" onClick={() => onChange(index)}>{type}</div>
					</div>
				);
			})
		}
		</div>
	);
};

RecurrenceRadio.propTypes = {
	selectedIndex: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired
};

export default RecurrenceRadio;
