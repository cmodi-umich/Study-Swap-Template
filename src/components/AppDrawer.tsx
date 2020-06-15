import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";

interface AppDrawerProps {
  classes: any;
  menuList: any;
  open: boolean;
  toggleDrawer: Function;
}

export default function AppDrawer({
  classes,
  menuList,
  open,
  toggleDrawer,
}: AppDrawerProps) {
  return (
    <SwipeableDrawer
      anchor='left'
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <div
        className={clsx(classes.list)}
        role='presentation'
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <ListItem button key='copyright' disabled>
          <ListItemText primary='Study Swap' className={classes.centerAlign} />
        </ListItem>
        <Divider />
        <List>
          {menuList.map((element: any) => (
            <ListItem
              key={element[0] as string}
              className={classes.menuItem}
              component={Link}
              to={element[2] as string}
            >
              <Button
                variant={
                  window.location.pathname === element[2] ? "contained" : "text"
                }
                color='secondary'
                className={classes.button}
                startIcon={element[1]}
              >
                {element[0]}
              </Button>
            </ListItem>
          ))}
        </List>
      </div>
    </SwipeableDrawer>
  );
}
