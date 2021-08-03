import { useContext, createContext, useCallback, useMemo } from "react";
import { client } from "utils/api";
import { useAsync } from "utils/hooks";
const AuthContext = createContext();
function AuthProvider(props) {
  const {
    data: user,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync();
  const login = useCallback(
    (form) =>
      run(client("login", { data: form })).then((user) => setData(user)),
    [setData, run]
  );
  const logout = useCallback(() => setData(null), [setData])
  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);
  return <AuthContext.Provider value={value} {...props} />;
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth cannot be used without an AuthProvider");
  }
  return context;
}
export { useAuth, AuthProvider };
