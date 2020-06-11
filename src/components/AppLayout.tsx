import React, { useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";

import {
  Menu as MenuIcon,
  AccountCircleRounded as AccountIcon,
  NotificationsRounded as NotificationIcon,
  Search as SearchIcon,
} from "@material-ui/icons";

interface AppToolbarProps {
  classes: any;
  title: string;
  toggleDrawer: Function;
}

const AppToolbar = ({ classes, title, toggleDrawer }: AppToolbarProps) => (
  <AppBar position='fixed' className={clsx(classes.appBar)} color='secondary'>
    <Toolbar>
      <IconButton
        edge='start'
        className={classes.menuButton}
        onClick={toggleDrawer(true)}
        color='inherit'
        aria-label='open drawer'
      >
        <MenuIcon />
      </IconButton>
      <Typography
        component='h1'
        variant='h6'
        color='inherit'
        noWrap
        className={classes.title}
      >
        {title}
      </Typography>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder='Search…'
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      <IconButton color='inherit'>
        <Badge badgeContent={4} color='error'>
          <NotificationIcon />
        </Badge>
      </IconButton>
      <IconButton color='inherit' component={Link} to={"/profile"}>
        <AccountIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
);

interface AppDrawerProps {
  classes: any;
  menuList: any;
  open: boolean;
  toggleDrawer: Function;
}

function AppDrawer({ classes, menuList, open, toggleDrawer }: AppDrawerProps) {
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
              {/* <ListItemIcon>{element[1]}</ListItemIcon>
            <ListItemText primary={element[0]} /> */}
            </ListItem>
          ))}
        </List>
      </div>
    </SwipeableDrawer>
  );
}

interface AppLayoutProps {
  menuList: any;
}

export default function AppLayout({ menuList }: AppLayoutProps) {
  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);
  const toggleDrawer = (open: boolean) => (event: any) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer(open);
  };

  return (
    <React.Fragment>
      <AppToolbar
        classes={classes}
        title={"Study Swap"}
        toggleDrawer={toggleDrawer}
      />
      <AppDrawer
        classes={classes}
        menuList={menuList}
        open={drawer}
        toggleDrawer={toggleDrawer}
      />
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  list: {
    width: 250,
  },
  centerAlign: {
    textAlign: "center",
  },
  button: {
    width: "100%",
    padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
    borderRadius: `${theme.spacing(1)}px`,
    justifyContent: "left",
    textTransform: "none",
  },
}));
