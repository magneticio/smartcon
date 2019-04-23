import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { routerReducer, routerMiddleware } from "react-router-redux";

import * as Profile from "./Profile";
import * as Sessions from "./Sessions";

export default function create(history, initialState) {
  const reducers = {
    sessions: Sessions.reducer,
    profile: Profile.reducer
  };

  const middleware = [thunk, routerMiddleware(history)];
  if (process.env.NODE_ENV !== "production") {
    middleware.push(createLogger());
  }

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === "development";
  if (
    isDevelopment &&
    typeof window !== "undefined" &&
    window.devToolsExtension
  ) {
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });

  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
}
