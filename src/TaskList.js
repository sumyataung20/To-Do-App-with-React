import {
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
} from "@mui/material";

import {
  Delete as DeleteIcon,
  Undo as UndoIcon,
  Check as CheckIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { green, red, grey } from "@mui/material/colors";
export default function TaskList({ items, remove, toggle }) {
  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.id}>
          <Button onClick={() => toggle(item.id)}>
            {item.done ? (
              <UndoIcon sx={{ color: grey[600] }} />
            ) : (
              <CheckIcon sx={{ color: green[800] }} />
            )}
          </Button>
          <ListItemText
            sx={{
              ml: 3,
              // color: item.done ? "grey" : "black",
              color: item.done ? "text.fade" : "text.light",
            }}
          >
            {item.subject}
          </ListItemText>
          <Link to={`edit/${item.id}`}>
            <IconButton>
              <EditIcon sx={{ color: grey[600] }} />
            </IconButton>
          </Link>
          <Button onClick={() => remove(item.id)}>
            <DeleteIcon sx={{ color: red[900] }} />
          </Button>
        </ListItem>
      ))}
    </List>
  );
}
