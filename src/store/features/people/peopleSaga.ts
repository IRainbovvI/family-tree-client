import { PayloadAction } from "@reduxjs/toolkit";
import {
  createPerson,
  fetchPeople,
  updatePerson,
} from "../../../api/peopleApi";
import {
  createPersonFailure,
  createPersonRequest,
  createPersonSuccess,
  fetchPeopleFailure,
  fetchPeopleRequest,
  fetchPeopleSuccess,
  updatePersonFailure,
  updatePersonRequest,
  updatePersonSuccess,
} from "./peopleSlice";
import { call, put, takeLatest } from "redux-saga/effects";
import { Person } from "../../../types";

function* handleFetchPeople(): Generator {
  try {
    const people: Person[] = (yield call(fetchPeople)) as Person[];
    yield put(fetchPeopleSuccess(people));
  } catch (error: any) {
    yield put(fetchPeopleFailure(error));
  }
}

function* handleCreatePerson(
  action: PayloadAction<Omit<Person, "_id">>
): Generator {
  try {
    const newPerson: Person = (yield call(
      createPerson,
      action.payload
    )) as Person;
    yield put(createPersonSuccess(newPerson));
  } catch (error: any) {
    yield put(createPersonFailure(error.message));
  }
}

function* handleUpdatePerson(
  action: PayloadAction<Partial<Person>>
): Generator {
  try {
    const updatedPerson: Person = (yield call(
      updatePerson,
      action.payload
    )) as Person;
    yield put(updatePersonSuccess(updatedPerson));
  } catch (error: any) {
    yield put(updatePersonFailure(error.message));
  }
}

export function* watchPeopleSagas(): Generator {
  yield takeLatest(fetchPeopleRequest.type, handleFetchPeople);
  yield takeLatest(createPersonRequest.type, handleCreatePerson);
  yield takeLatest(updatePersonRequest.type, handleUpdatePerson);
}
