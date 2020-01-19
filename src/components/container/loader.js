import React from 'react';
import PropTypes from 'prop-types';

const Loader = (props) => {
  const { loading } = props;
  
  if (loading) {
    return (<div className="loader loader-default is-active"></div>)
  }

  return null;
};


Loader.propTypes = {
  loading: PropTypes.bool
};

export default Loader;