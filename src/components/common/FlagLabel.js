import React, { PropTypes } from 'react';
import Config from '../../config';
import '../../styles/flag-label.css';

const FlagLabel = ({ flagIndex }) => {
  const backgroundColor = Config.FlagColors[flagIndex % Config.FlagColors.length];
  return (
    <div className="flag-label" style={{ backgroundColor }} />
  );
};

FlagLabel.propTypes = {
  flagIndex: PropTypes.number.isRequired
};

export default FlagLabel;
