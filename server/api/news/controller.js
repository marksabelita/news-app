const autoBind = require('auto-bind');
const NewsAPI = require('newsapi');
const responseHandler = require('../../utils/responseHandler');
const newsConfig = require('../../config/news');
const { API_COUNTRY, API_KEY, API_LANGUAGE } = newsConfig;
const newsapi = new NewsAPI(API_KEY);

class NewsController{
  constructor(){
    autoBind(this);
  }
  
  async getSources(request, response) {
    try {
      const data = await newsapi.v2.sources({
        language: API_LANGUAGE,
        country: API_COUNTRY,
        category: 'technology'
      });

      const { sources } = data;

      responseHandler.sendResponse(response, sources);
    } catch (error) {
      responseHandler.catchErrors(response, error);
    }
  }

  async getNewsBySource(request, response) {
    try {
      const { source } =  request.params;
      const { page } =  request.query;
      const queryString = { sources: source, page, language: API_LANGUAGE, pageSize: 10 };

      const data = await newsapi.v2.everything(queryString);

      responseHandler.sendResponse(response, data);
    } catch (error) {
      responseHandler.catchErrors(response, error);
    }
  }
}

module.exports = new NewsController();