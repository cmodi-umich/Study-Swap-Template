import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";

// component imports
import AppToolbar from "./AppToolbar";
import AppDrawer from "./AppDrawer";

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
  header: {
    padding: theme.spacing(1, 5),
    fontSize: 20,
    borderBottom: "solid",
    borderBottomColor: theme.palette.primary.main,
    borderBottomWidth: 0.5,
  },
}));
