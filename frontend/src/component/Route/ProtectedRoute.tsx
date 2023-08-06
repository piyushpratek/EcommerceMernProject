import React, { Fragment } from "react";
import { Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/store";

interface ProtectedRouteProps {
  isAdmin?: boolean;
  element: React.ReactNode;
  path: string;
}

const ProtectedRoute = ({ isAdmin = false, element: Element, ...rest }: ProtectedRouteProps) => {
  const { loading, isAuthenticated, user } = useAppSelector((state) => state.user);

  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          element={
            isAuthenticated === false ? (
              <  Navigate to="/login" replace={true} />
            ) : isAdmin && user?.role !== "admin" ? (
              <  Navigate to="/login" replace={true} />
            ) : (
              Element
            )
          }
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;

