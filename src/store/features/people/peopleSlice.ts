import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person } from "../../../types";

interface PeopleState {
  people: Person[];
  loading: boolean;
  error: string | null;
}

const initialState: PeopleState = {
  people: [],
  loading: false,
  error: null,
};

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    fetchPeopleRequest: (state) => {
      state.loading = true;
    },
    fetchPeopleSuccess: (state, action: PayloadAction<Person[]>) => {
      state.loading = false;
      state.people = action.payload;
    },
    fetchPeopleFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      console.log(action.payload);
    },

    createPersonRequest: (
      state,
      action: PayloadAction<Omit<Person, "_id">>
    ) => {
      state.loading = true;
    },
    createPersonSuccess: (state, action: PayloadAction<Person>) => {
      state.loading = false;
      state.people.push(action.payload);
    },
    createPersonFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      console.log(action.payload);
    },

    updatePersonRequest: (state, action: PayloadAction<Partial<Person>>) => {
      state.loading = true;
    },
    updatePersonSuccess: (state, action: PayloadAction<Partial<Person>>) => {
      state.loading = false;
      state.people = state.people.map((person) =>
        person._id === action.payload._id
          ? { ...person, ...action.payload }
          : person
      );
    },
    updatePersonFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      console.log(action.payload);
    },
  },
});

export const {
  createPersonSuccess,
  createPersonFailure,
  createPersonRequest,
  fetchPeopleFailure,
  fetchPeopleRequest,
  fetchPeopleSuccess,
  updatePersonSuccess,
  updatePersonFailure,
  updatePersonRequest,
} = peopleSlice.actions;

export default peopleSlice.reducer;
