import { GET_SOURCE, FETCH_SOURCE, GET_ARTICLES, FETCH_ARTICLES } from '../actions/type'

const initialState = {
  loading: false,
  page: 1,
  sources: "",
  error: {},
  sourceList: [],
  articles: [],
  totalResults: 0
}

export default function (state = initialState, action) {
  switch (action.type) { 
    case GET_SOURCE:
      return { ...state, loading: true };
    case GET_ARTICLES:
      return { ...state, sources: action.payload.id, loading: true };
    case FETCH_SOURCE:
      return { ...state, sourceList: action.payload, loading: false };
    case FETCH_ARTICLES:
      return { 
        ...state, 
        totalResults: action.payload.totalResults, 
        articles: action.payload.articles,
        page: action.payload.page,
        loading: false
      };
    default:
      return state;
  }
}