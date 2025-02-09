import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import peopleReducer from "./features/people/peopleSlice";
import { watchPeopleSagas } from "./features/people/peopleSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { people: peopleReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watchPeopleSagas);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
