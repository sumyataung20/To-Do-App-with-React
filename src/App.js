import { useState, createContext, useContext } from "react";
import {
  Box,
  Toolbar,
  AppBar,
  Button,
  Divider,
  useTheme,
  IconButton,
} from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { lightGreen } from "@mui/material/colors";
import NewTask from "./NewTask";
import TaskList from "./TaskList";
import Title from "./Title";
import Edit from "./Edit";
import { ModeContext } from "./ThemedApp";

import {
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";

export const CountContext = createContext(0);
export default function App() {
  const theme = useTheme();
  const [items, setItems] = useState([
    { id: 1, subject: "Egg", done: false },
    { id: 2, subject: "Bread", done: false },
    { id: 3, subject: "Games", done: true },
  ]);
  const changeMode = useContext(ModeContext);
  const add = (subject) => {
    setItems([{ id: items.length + 1, subject, done: false }, ...items]);
  };

  const remove = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const toggle = (id) => {
    const result = items.map((item) => {
      if (item.id === id) item.done = !item.done;
      return item;
    });
    setItems(result);
  };

  const clear = () => {
    setItems(items.filter((item) => !item.done));
  };

  const get = (id) => {
    return items.filter((item) => item.id === parseInt(id))[0];
  };

  const update = (id, subject) => {
    setItems(
      items.map((item) => {
        if (item.id === parseInt(id)) item.subject = subject;
        return item;
      })
    );
  };

  return (
    <CountContext.Provider value={items.length}>
      <Box>
        <Box>
          <AppBar position="static" sx={{ bgcolor: lightGreen[600], mb: 3 }}>
            <Toolbar>
              <Title />

              {theme.palette.mode === "dark" ? (
                <IconButton
                  onClick={() => {
                    changeMode();
                  }}
                >
                  <LightModeIcon />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => {
                    changeMode();
                  }}
                >
                  <DarkModeIcon />
                </IconButton>
              )}

              <Button
                varient="text"
                sx={{ bgcolor: "inherit", color: "white" }}
                onClick={clear}
              >
                Clear
              </Button>
            </Toolbar>
          </AppBar>
        </Box>

        <Box sx={{ mx: { lg: "500px", md: "300px", sm: "150px" } }}>
          <Routes>
            <Route
              path="/"
              element={
                <Box>
                  <NewTask add={add} />
                  <TaskList
                    items={items.filter((item) => !item.done)}
                    remove={remove}
                    toggle={toggle}
                  />

                  <Divider />

                  <TaskList
                    items={items.filter((item) => item.done)}
                    remove={remove}
                    toggle={toggle}
                  />
                </Box>
              }
            />

            <Route
              path="/edit/:id"
              element={<Edit get={get} update={update} />}
            />
          </Routes>
        </Box>
      </Box>
    </CountContext.Provider>
  );
}
