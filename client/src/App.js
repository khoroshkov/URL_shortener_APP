import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/Auth.Context";
import { Navbar } from "./components/Navbar";
import { Loader } from "./components/Loader";
import "materialize-css";
import { Footer } from "./components/Footer";

function App() {
  const { login, logout, token, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        token,
        userId,
        isAuthenticated,
      }}
    >
      <BrowserRouter>
        {isAuthenticated && <Navbar />}
        <div className="container">{routes}</div>
        <Footer/>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
