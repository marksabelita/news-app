import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSource, getArticles } from '../actions/news';
import Sources from './container/sources';
import Articles from './container/articles';
import Pagination from './container/pagination';
import Loader from './container/loader';

class News extends Component {

  constructor(props) {
    super(props);
    this.onClickSource = this.onClickSource.bind(this);
    this.onClickPagination = this.onClickPagination.bind(this);
  }
  
  componentDidMount() {
    const { getSource } = this.props;
    getSource();
  }

  onClickSource(id, pageNumber = null) {
    const { getArticles, page } = this.props;
    const displayPage = (pageNumber !== null) ? pageNumber : page;
    
    getArticles({id, page: displayPage});
  }

  onClickPagination(type) {
    let { page, sources, getArticles } = this.props;
    let newPage = (type === 'next' ) ? page + 1 : page - 1;
    getArticles({id: sources, page: newPage});
  }

  render() {
    const { sourceList, articles, totalResults, page, loading, sources } = this.props;

    return (
      <div className="mt-5 mb-5">      
        <Loader loading={ loading  }></Loader>  
        <div className="row">
          <div className="col-3 sources-holder">
            <Sources onClickSource={ this.onClickSource } sources={ sourceList } activeSource={ sources }></Sources>
          </div>
          
          <div className="col-8">
            <div className="row">
              <Articles articles={articles} ></Articles>
            </div>
          </div>
        </div>

        <div className="col-12">
          <Pagination onClickPagination={ this.onClickPagination } page = {page} totalResults= {totalResults} ></Pagination>
        </div>
      </div>
    )
  }
}

const mapStateToProp = (state) => {
  const { page, sourceList, articles, totalResults, sources, loading } = state.news;
  return {
    loading,
    page,
    sourceList,
    articles,
    totalResults,
    sources
  }
};

News.propTypes = {
  sources: PropTypes.string,
  sourceList: PropTypes.array,
  articles: PropTypes.array,
  loading: PropTypes.bool,
  page: PropTypes.number,
  totalResults: PropTypes.number,
  getSource: PropTypes.func.isRequired,
  getArticles: PropTypes.func.isRequired,
  onClickPagination: PropTypes.func.isRequired
};

export default connect(mapStateToProp, { getSource, getArticles })(News);