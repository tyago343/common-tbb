import React from "react";
import { UnauthenticatedApp } from "unauthenticated-app";
import "./styles/global.css";
import { useAuth } from "context/auth";
import { AuthenticatedApp } from "authenticated-app";
function App() {
  const { user } = useAuth();
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}
export { App };
