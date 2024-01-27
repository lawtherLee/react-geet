import React from "react";
import "./App.scss";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import Login from "@/pages/Login";
import Layout from "@/pages/Layout";
import ProfileEdit from "@/pages/Edit";

import history from "./utils/history";
import PrivateRoute from "@/components/PrivateRoute";
import Chat from "@/pages/Chat";

const App = () => {
  // const count = useCountDown(2178216121)
  return (
    <Router history={history}>
      <div className="app">
        {/* 距离国庆还有{count}秒 */}
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />}></Route>
          <Route path="/login" component={Login} />
          <Route path="/home" component={Layout} />

          <PrivateRoute path="/profile/edit">
            <ProfileEdit />
          </PrivateRoute>
          {/*<Route path={"/profile/edit"} component={ProfileEdit} />*/}

          <PrivateRoute path="/chat">
            <Chat />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
