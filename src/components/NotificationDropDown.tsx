import React from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

const nullNotifList = ["Notification 1", "Notification 2", "Notification 3"];

interface AppToolbarProps {
  classes: any;
  open: boolean;
  setOpen: Function;
  anchorRef: any;
}

const NotificationDropDown = ({
  classes,
  open,
  setOpen,
  anchorRef,
}: AppToolbarProps) => {
  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <>
                  <div className={classes.header}>Notifications</div>
                  <MenuList autoFocusItem={open} id='menu-list-grow'>
                    {nullNotifList.map((nullNotif) => {
                      return (
                        <MenuItem onClick={handleClose}>{nullNotif}</MenuItem>
                      );
                    })}
                  </MenuList>
                </>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default NotificationDropDown;
