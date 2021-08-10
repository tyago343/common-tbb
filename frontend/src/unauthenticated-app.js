/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import { Button, FormGroup, Input } from "components/lib";
import * as colors from "styles/colors";
import { Logo } from "components/logo";
import { useAuth } from "context/auth";

function UnauthenticatedApp() {
  const { login } = useAuth();
  function handleSubmit(event) {
    event.preventDefault();
    const { username, password } = event.target.elements;
    login({
      username: username.value,
      password: password.value,
    });
  }
  const onClick = () => window.fetch("http://localhost:8000/auth/google")
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        label: {
          color: colors.royalPurple,
          marginBottom: "10px",
          fontFamily: "roboto-bold",
        },
      }}
    >
      <Logo />
      <h1
        css={{
          margin: "20px",
          textTransform: "uppercase",
        }}
      >
        TBB keys
      </h1>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="username">Username:</label>
          <Input type="text" name="username" id="username" />
        </FormGroup>
        <FormGroup>
          <label htmlFor="passwrod">Password:</label>
          <Input type="password" name="password" id="password" />
        </FormGroup>
        <Button type="submit">Login</Button>
      </form>
      <a href="http://localhost:8080/auth/google">Sign In with Google</a>
    </div>
  );
}
export { UnauthenticatedApp };
