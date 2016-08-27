import React, { PropTypes } from 'react';
import Config from '../../config';
import '../../styles/flag-radio.css';

const FlagRadio = ({ selectedIndex, onChange }) => {
	const actualIndex = selectedIndex % Config.FlagColors.length;
	return (
		<div className="flag-radio">
		{
			Config.FlagColors.map((color, index) => {
				if (actualIndex === index) {
					return (
						<div className="flag-item-wrapper" key={index}>
							<div className="flag-radio-item flag-radio-selected" style={{ backgroundColor: color }} />
						</div>
					);
				}

				return (
					<div className="flag-item-wrapper" key={index}>
						<div className="flag-radio-item" style={{ backgroundColor: color }} onClick={() => onChange(index)} />
					</div>
				);
			})
		}
		</div>
	);
};

FlagRadio.propTypes = {
	selectedIndex: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired
};

export default FlagRadio;
