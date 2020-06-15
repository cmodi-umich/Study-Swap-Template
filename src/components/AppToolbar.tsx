import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";

import NotificationDropDown from "./NotificationDropDown";

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

const AppToolbar = ({ classes, title, toggleDrawer }: AppToolbarProps) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
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
        <NotificationDropDown
          classes={classes}
          open={open}
          setOpen={setOpen}
          anchorRef={anchorRef}
        />
        <IconButton
          color='inherit'
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup='true'
          onClick={handleToggle}
        >
          <Badge badgeContent={5} color='error'>
            <NotificationIcon />
          </Badge>
        </IconButton>
        <IconButton color='inherit' component={Link} to={"/profile"}>
          <AccountIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
