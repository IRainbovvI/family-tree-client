import axios from "axios";
import { Person } from "../types";
const API_URL = "http://localhost:3001/api/people";

export const fetchPeople = async (): Promise<Person[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createPerson = async (
  person: Omit<Person, "_id">
): Promise<Person> => {
  const response = await axios.post(API_URL, person);
  return response.data;
};

export const updatePerson = async (
  person: Partial<Person>
): Promise<Person> => {
  const response = await axios.put(API_URL + "/" + person._id, person);
  return response.data;
};
