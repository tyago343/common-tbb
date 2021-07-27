/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from '@emotion/react'

import { Button, FormGroup, Input } from "components/lib";
import * as colors from 'styles/colors'
import React from "react";

function UnauthenticatedApp({ login }) {
  function handleSubmit(event) {
    event.preventDefault();
    const { username, password } = event.target.elements;
    login({
      username: username.value,
      password: password.value,
    });
  }
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        backgroundColor: colors.selago,
        'label': {
          color: colors.royalPurple,
          marginBottom: "10px",
          fontFamily: "roboto-bold"
        },
      }}
    >
      <h3>TBB keys</h3>
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
    </div>
  );
}
export { UnauthenticatedApp };
