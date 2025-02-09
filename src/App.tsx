import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPeopleRequest } from "./store/features/people/peopleSlice";
import { RootState } from "./store";
import { Box, Button } from "@mui/material";
import AddPerson from "./components/AddPerson";
import UpdatePerson from "./components/UpdatePerson";
import AccordionItem from "./components/AccordionItem";

const App: React.FC = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const dispatch = useDispatch();
  const people = useSelector((state: RootState) => state.people.people);

  useEffect(() => {
    dispatch(fetchPeopleRequest());
  }, [dispatch]);

  const parents = people.filter((p) => !p.firstParent && !p.secondParent);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box
        sx={{ padding: 2, display: "flex", justifyContent: "space-between" }}
      >
        <Button variant="contained" onClick={() => setOpenAdd(true)}>
          Add Person
        </Button>
        <Button variant="contained" onClick={() => setOpenUpdate(true)}>
          Update Person
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1, padding: 2, backgroundColor: "#f5f5f5" }}>
        {parents.map((parent) => (
          <AccordionItem key={parent._id} id={parent._id} topLvlDiv={true} />
        ))}
      </Box>

      <AddPerson handleClose={() => setOpenAdd(false)} openAdd={openAdd} />
      <UpdatePerson
        handleClose={() => setOpenUpdate(false)}
        openUpdate={openUpdate}
      />
    </Box>
  );
};

export default App;
