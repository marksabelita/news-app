

import React from 'react';
import PropTypes from 'prop-types';

const Pagination = (props) => {
  const { page, totalResults, onClickPagination } = props;
  if( totalResults > 0) {
    const startArticle = (page > 1) ? page * 20 - 20 : page;
    const lastArticle = (page > 1) ? page * 20 : 20;
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          <li className="pages"> 
            { startArticle } - { lastArticle }  of { totalResults}
          </li>
          <li className="page-item" disabled={page === 1}>
            <a className="page-link" onClick={ () => onClickPagination('prev') }>Previous</a>
          </li>
          <li className="page-item">
            <a className="page-link" onClick={ () => onClickPagination('next') }>Next</a>
          </li>
        </ul>
      </nav>
    );
  }

  return null;
};


Pagination.propTypes = {
  articles: PropTypes.array,
  page: PropTypes.number,
  totalResults: PropTypes.number,
  onClickPagination: PropTypes.func.isRequired
};

export default Pagination;