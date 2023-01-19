import { Typography } from "@mui/material";
import { useContext } from "react";
import { CountContext } from "./App";

export default function Title() {
  const Count = useContext(CountContext);

  return (
    <Typography varient="h6" sx={{ flexGrow: 1 }}>
      To Do App {Count}
    </Typography>
  );
}
