import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { createPersonRequest } from "../store/features/people/peopleSlice";

interface AddPersonProps {
  handleClose: () => void;
  openAdd: boolean;
}

const AddPerson: React.FC<AddPersonProps> = ({ handleClose, openAdd }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [firstParent, setFirstParent] = useState("");
  const [secondParent, setSecondParent] = useState("");
  const [nameError, setNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const dispatch = useDispatch();
  const people = useSelector((state: RootState) => state.people.people);

  const validateForm = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

    const ageNumber = Number(age);
    if (!age || isNaN(ageNumber) || ageNumber <= 0) {
      setAgeError(true);
      isValid = false;
    } else {
      setAgeError(false);
    }

    return isValid;
  };

  const handleAddSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch(
      createPersonRequest({
        name,
        age: Number(age),
        firstParent: firstParent || undefined,
        secondParent: firstParent && secondParent ? secondParent : undefined,
      })
    );

    handleClose();
    setName("");
    setAge("");
    setFirstParent("");
    setSecondParent("");
  };

  return (
    <Dialog open={openAdd} onClose={handleClose}>
      <form>
        <DialogTitle>Add Person</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            error={nameError}
            helperText={nameError ? "Name is required" : ""}
            sx={{ margin: "10px 0" }}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            label="Age"
            variant="outlined"
            fullWidth
            value={age}
            error={ageError}
            helperText={ageError ? "Enter a valid positive number" : ""}
            onChange={(e) => setAge(e.target.value)}
            required
          />

          <FormControl fullWidth sx={{ margin: "10px 0" }}>
            <InputLabel>First Parent</InputLabel>
            <Select
              value={firstParent}
              onChange={(e) => setFirstParent(e.target.value)}
              displayEmpty
            >
              <MenuItem value="">
                <span>&nbsp;&nbsp;</span>
              </MenuItem>
              {people.map((person) => (
                <MenuItem key={person._id} value={person._id}>
                  {person.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ margin: "10px 0" }}>
            <InputLabel>Second Parent</InputLabel>
            <Select
              value={secondParent}
              onChange={(e) => setSecondParent(e.target.value)}
              displayEmpty
              disabled={!firstParent}
            >
              <MenuItem value="">
                <span>&nbsp;&nbsp;</span>
              </MenuItem>
              {people
                .filter((person) => person._id !== firstParent)
                .map((person) => (
                  <MenuItem key={person._id} value={person._id}>
                    {person.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" onClick={handleAddSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddPerson;
