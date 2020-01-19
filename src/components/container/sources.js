import React from 'react';
import PropTypes from 'prop-types';

const Sources = (props) => {
  const { sources, onClickSource, activeSource } = props;
  
  if (sources.length > 0) {
    return sources.map(source => {
      
      return (
        <a key={source.id} className={`nav-link ${(activeSource == source.id) ? 'active' : ''}`} id={source.id} data-toggle="pill" onClick={() => onClickSource(source.id, 1) }> {source.name} </a>
      )
    })
  }

  return null;
};


Sources.propTypes = {
  sources: PropTypes.array,
  onClickSource: PropTypes.func.isRequired,
  activeSource: PropTypes.string
};

export default Sources;