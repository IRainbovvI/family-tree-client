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
import { updatePersonRequest } from "../store/features/people/peopleSlice";

interface UpdatePersonProps {
  handleClose: () => void;
  openUpdate: boolean;
}

const UpdatePerson: React.FC<UpdatePersonProps> = ({
  handleClose,
  openUpdate,
}) => {
  const dispatch = useDispatch();
  const people = useSelector((state: RootState) => state.people.people);

  const [selectedPersonId, setSelectedPersonId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [nameError, setNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);

  const handlePersonChange = (id: string) => {
    setSelectedPersonId(id);
    const person = people.find((p) => p._id === id);
    if (person) {
      setName(person.name);
      setAge(person.age.toString());
    }
  };

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

  const handleUpdateSubmit = () => {
    if (!validateForm()) return;

    dispatch(
      updatePersonRequest({
        _id: selectedPersonId,
        name,
        age: Number(age),
      })
    );

    handleClose();
    setSelectedPersonId("");
    setName("");
    setAge("");
  };

  return (
    <Dialog open={openUpdate} onClose={handleClose}>
      <DialogTitle>Edit Person</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ margin: "10px 0" }}>
          <InputLabel>Select Person</InputLabel>
          <Select
            value={selectedPersonId}
            onChange={(e) => handlePersonChange(e.target.value)}
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
          disabled={!selectedPersonId}
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
          disabled={!selectedPersonId}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleUpdateSubmit}
          color="primary"
          disabled={!selectedPersonId}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePerson;
