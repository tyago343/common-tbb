/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import { useState } from "react";
import Dialog from "@reach/dialog";
import "@reach/dialog/styles.css";
import { Button, FormGroup, Input } from "components/lib";
import lock from "styles/lock-icon.svg";
import * as colors from "styles/colors";

function ListItem({ item, onSubmit, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const open = () => setShowModal(true);
  const close = () => setShowModal(false);
  function handleSubmit(event) {
    event.preventDefault();
    const { application, url, login, password, notes } = event.target.elements;
    onSubmit(
      {
        application: application.value,
        url: url.value,
        login: login.value,
        password: password.value,
        notes: notes.value,
      },
      item.id,
      "PUT"
    );
    setTimeout(() => setShowModal(false), 1000);
  }
  return (
    <div
      css={{
        margin: "10px 0",
        padding: "20px",
        background: colors.base,
        cursor: "pointer",
      }}
    >
      <p
        onClick={open}
        css={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img src={lock} alt="Lock Icon" width="35" height="25" />
        {item.application.toUpperCase()}
      </p>
      <Dialog isOpen={showModal} onDismiss={close} aria-label="Password modal">
        <p
          css={{ cursor: "pointer", textAlign: "right", marginBottom: "15px" }}
          onClick={close}
        >
          X
        </p>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="application">Aplicación:</label>
            <Input
              defaultValue={item.application}
              disabled={!edit}
              name="application"
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="url">URL:</label>
            <Input
              defaultValue={item.url}
              disabled={!edit}
              name="url"
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="login">Login:</label>
            <Input
              defaultValue={item.login}
              disabled={!edit}
              name="login"
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">password:</label>
            <Input
              defaultValue={item.password}
              disabled={!edit}
              name="password"
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="notes">Notas:</label>
            <textarea
              defaultValue={item.application}
              disabled={!edit}
              name="notes"
            />
          </FormGroup>
          {edit && (
            <div
              css={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "35px",
              }}
            >
              <Button onClick={() => setEdit(false)}>No editar</Button>
              <Button type="submit">Guardar</Button>
            </div>
          )}
        </form>
        <div
          css={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {!edit && <Button onClick={() => setEdit(true)}>Editar</Button>}
          <Button
            onClick={() => {
              if (
                window.confirm("¿Estás seguro de querer eliminar esta entrada?")
              ) {
                onDelete(item.id);
                setTimeout(() => setShowModal(false), 1000);
              }
            }}
          >
            Eliminar
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
export { ListItem };
