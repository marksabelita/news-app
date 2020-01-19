import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const Articles = (props) => {
  const { articles } = props;
  const MAX_LENGTH_TITLE = 50;
  const MAX_LENGTH_DESCRIPTION = 150;

  if (articles.length > 0) {
    return articles.map((article, key) => {
      const { title, description, publishedAt } = article;

      const formattedDate = moment(publishedAt).format('LLLL');
      const imageUrl = (article.urlToImage && article.urlToImage != "null") ? article.urlToImage : "https://via.placeholder.com/213x120";
      return (
        <div className="col-4 articles" key={key} onClick={() => window.open(article.url, '_blank') } >
          <div className="article-holder">
            <img src={imageUrl} alt="image" className="img-thumbnail"/>
            <div className="description">
              <p className="font-weight-bold"> {`${title.substring(0, MAX_LENGTH_TITLE)}`} { title.length > MAX_LENGTH_TITLE ? '...' : '' }</p>
              <p className="date"> { formattedDate } </p>
              <p className="details"> {`${description.substring(0, MAX_LENGTH_DESCRIPTION)}`} { description.length > MAX_LENGTH_DESCRIPTION ? '...' : '' } </p>
            </div>
          </div>
        </div>
      );
    });
  }

  return null;
};


Articles.propTypes = {
  articles: PropTypes.array
};

export default Articles;