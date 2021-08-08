/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import { Logo } from "components/logo";
import { useAuth } from "context/auth";
import { useEffect } from "react";
import { client } from "utils/api";
import { useAsync } from "utils/hooks";
import { ListItem } from "components/ListItem";

function AuthenticatedApp({}) {
  const { logout } = useAuth();
  const { data: entries, isLoading, isError, setData, run } = useAsync();
  useEffect(() => {
    run(client("entries")).then((entries) => setData(entries));
  }, [run, setData]);
  const handleSubmit = (formData, itemId, method) => {
    client(`entries/${itemId}`, { data: formData, method }).then(({ data }) => {
      const result = entries.map((entry) => {
        if (entry.id === data[0].id) return data[0];
        return entry;
      });
      setData(result);
    });
  };
  const removeEntry = (itemId) => {
    client(`entries/${itemId}`, { method: "DELETE" }).then((data) => {
      const result = entries.filter((entry) => entry.id !== itemId);
      setData(result);
    });
  };
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
        <p css={{ cursor: "pointer" }} onClick={logout}>
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
          {entries &&
            entries.map((entry) => (
              <ListItem
                item={entry}
                key={entry.id}
                onSubmit={handleSubmit}
                onDelete={removeEntry}
              />
            ))}
        </section>
      </main>
    </section>
  );
}
export { AuthenticatedApp };
