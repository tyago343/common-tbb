/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import { Logo } from "components/logo";
import { useAuth } from "context/auth";
import React, { useEffect, useState } from "react";
import { client } from "utils/api";
import { useAsync } from "utils/hooks";
import lock from "styles/lock-icon.svg"

function AuthenticatedApp({}) {
  const { logout } = useAuth();
  const { data: entries, isLoading, isError, setData, run } = useAsync();
  useEffect(() => {
    run(client("entries")).then((entries) => setData(entries));
  }, [run, setData]);
  return (
    <section>
      <header
        css={{
          padding: "10px 50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Logo width={60} height={60} />
        <p css={{}} onClick={logout}>
          Logout
        </p>
      </header>
      <main
        css={{
          width: "90%",
          maxWidth: "1200px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "30% 1fr",
          gridGap: "35px",
        }}
      >
      {/* EN ESTA ZONA SE MOSTRARÁ LA LISTA DE CLIENTES */}
        <section>Hola</section>

        {/* ESTA SERÁ LA SECCION DONDE SE MOSTRARÁN LAS ENTRADAS Y EL INPUT DEL BUSCADOR */}
        <section>
        {entries && entries.map(entry => 
          <p><img src={lock} alt="Lock Icon" />{entry.application}</p>
        )}
          
        </section>
      </main>
    </section>
  );
}
export { AuthenticatedApp };
