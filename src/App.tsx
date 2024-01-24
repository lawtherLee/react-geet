import React from "react";
import "./App.scss";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import Login from "@/pages/Login";
import Layout from "@/pages/Layout";
import ProfileEdit from "@/pages/Edit";
// import Chat from '@/pages/Chat'
// import Article from '@/pages/Article'
// import Search from '@/pages/Search'
// import SearchResult from '@/pages/Search/Result'
// import PrivattRoute from './components/PrivateRoute'
import history from "./utils/history";
// import { useCountDown } from '@/utils/hooks'
// import { useCountDown } from '@/utils/hooks'
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
          <Route path={"/profile/edit"} component={ProfileEdit} />
          {/*<Route path="/article/:id" component={Article} />*/}
          {/*<Route path="/search" exact component={Search} />*/}
          {/*<Route path="/search/result" component={SearchResult} />*/}
          {/*<PrivattRoute path="/profile/edit">*/}
          {/*  <ProfileEdit />*/}
          {/*</PrivattRoute>*/}
          {/*<PrivattRoute path="/chat">*/}
          {/*  <Chat />*/}
          {/*</PrivattRoute>*/}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
