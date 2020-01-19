import { GET_SOURCE, GET_ARTICLES } from './type';

export const getSource = () => ({
  type: GET_SOURCE
});

export const getArticles = (request) => ({
  type: GET_ARTICLES,
  payload: request
})