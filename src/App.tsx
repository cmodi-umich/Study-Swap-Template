import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import { theme } from "./constants/theme";
import { menuList, routes } from "./views";
import { Copyright } from "./components/Copyright";
import AppLayout from "./components/AppLayout";

const history = createBrowserHistory();

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Router history={history}>
          <AppLayout menuList={menuList} />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth='lg' className={classes.container}>
              <Switch>
                {routes.map((element: any) => (
                  <Route
                    path={element.path}
                    component={element.component}
                    key={element.path}
                  />
                ))}
              </Switch>
              <Box pt={4}>
                <Copyright />
              </Box>
            </Container>
          </main>
        </Router>
      </div>
    </ThemeProvider>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default App;
