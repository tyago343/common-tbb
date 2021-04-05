import React from "react";
import { LoginWrapper } from "./styles";
import useInput from "../../components/Input/input.hook";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { loginUser } from "../../utils";
const Login = () => {
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({email,password});
  };
  return (
    <LoginWrapper>
      <article>
        <div>
          tbb.agency
          <span>passwords</span>
        </div>
        <form onSubmit={(evt) => handleSubmit(evt)}>
          <Input
            type="text"
            label="Usuario"
            name="user"
            value={email}
            handleChange={setEmail}
          />
          <Input
            type="password"
            label="Contraseña"
            name="password"
            value={password}
            handleChange={setPassword}
          />
          <Button>Enviar</Button>
        </form>
      </article>
    </LoginWrapper>
  );
};
export default Login;
