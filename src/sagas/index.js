import { put, takeLatest, all, call } from 'redux-saga/effects';
import { FETCH_SOURCE, FETCH_ERROR, GET_SOURCE, FETCH_ARTICLES, GET_ARTICLES } from '../actions/type';
import axios from 'axios';
const hostname = window && window.location && window.location.hostname;
const API_URL = (hostname === 'localhost') ? 'http://localhost:8080/api' : '/api';

function getRequest(request) {
  return axios.request({
    method: 'get',
    url: request.url,
    params: request.params
  });
}

function* getArticles(request) {
  try {
    const { id, page } = request.payload;

    const url = `${API_URL}/news/${id}`
    const response = yield call(getRequest, { url, params: { page } });
    if (response.status === 200) {
      const { data } = response.data;
      const { totalResults, articles } = data;
      yield put({ type: FETCH_ARTICLES, payload: { totalResults, articles, page} });
    } else {
      throw response;
    }
  } catch (error) {
    yield put({ type: FETCH_ERROR, error });
  }
}

function* getSource() {
  try {
    const response = yield call(getRequest, { 'url': `${API_URL}/sources` });
    if (response.status === 200) {

      const { data } = response.data;
      yield put({ type: FETCH_SOURCE, payload: data });
    } else {
      throw response;
    }
  } catch (error) {
    yield put({ type: FETCH_ERROR, error });
  }
}

function* actionGetSource() {
  yield takeLatest(GET_SOURCE, getSource);
}

function* actionGetArticles() {
  yield takeLatest(GET_ARTICLES, getArticles);
}

export default function* rootSaga() {
  yield all([
    actionGetSource(),
    actionGetArticles()
  ]);
}