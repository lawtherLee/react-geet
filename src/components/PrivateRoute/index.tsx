import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { hasToken } from "@/utils/storage";

const PrivateRoute = ({ children, ...rest }: RouteProps) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (hasToken()) {
          return children;
        }
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: location.pathname,
              },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
