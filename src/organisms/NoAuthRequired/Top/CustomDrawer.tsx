import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";

type Props = {
  navigation: {
    name: string;
    href: string;
  }[];
  setOpen: (open: boolean) => void;
  open: boolean;
};
export const CustomDrawer: React.FC<Props> = ({
  navigation,
  setOpen,
  open,
}) => {
  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <div className="w-80">
        <div className="flex justify-end p-4">
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <List>
          {navigation.map((item, index) => (
            <ListItem key={index}>
              <a
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                <ListItemText primary={item.name} />
              </a>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};
