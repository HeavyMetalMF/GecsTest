import React, {FC, useEffect} from 'react';
import {useAppDispatch} from "./hooks/redux";
import {Navigate, Route, Routes} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Register from "./components/register/Register";
import {Container} from "semantic-ui-react";
import Main from "./components/main/Main";
import useToken from "./hooks/useToken";
import Navbar from "./components/navbar/Navbar";

const App: FC = () => {
  return (
      <AuthProvider>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/"
                element={
                  <RequireAuth>
                    <Main />
                  </RequireAuth>
                }
            />
          </Routes>
        </Container>
      </AuthProvider>
  );
}

interface AuthContextType {
  token: string | null;
  setToken: (token: string) => void,
}

let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const {token, setToken} = useToken();

  let value = {token, setToken};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const {token} = useAuth();
  if (!token) {
    return <Navigate to="/auth" />;
  }
  return children;
}

export default App;