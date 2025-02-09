import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Person } from "../types";

interface AccordionItemProps {
  id: string;
  topLvlDiv: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ id, topLvlDiv }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const people = useSelector((state: RootState) => state.people.people);
  const [parent, setParent] = useState<Person | undefined>();
  const [children, setChildren] = useState<Person[]>([]);

  useEffect(() => {
    setParent(people.find((p) => p._id === id));
    setChildren(
      people.filter((p) => p.firstParent === id || p.secondParent === id)
    );
  }, [id, people]);

  if (!parent) return null;
  return (
    <Box key={id} sx={{ marginLeft: 1, marginTop: topLvlDiv ? 2 : 1 }}>
      <Box
        sx={{
          padding: 1,
          backgroundColor: "#ddd",
          borderRadius: "4px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Typography variant="h6">{parent.name}</Typography>
        <Typography>{expanded ? "▲" : "▼"}</Typography>
      </Box>

      {children.length > 0 &&
        expanded &&
        children.map((child) => {
          return (
            <AccordionItem key={child._id} id={child._id} topLvlDiv={false} />
          );
        })}
    </Box>
  );
};

export default AccordionItem;
