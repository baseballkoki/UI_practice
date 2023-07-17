import { Children, memo } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Login } from "../components/pages/Login";
import { Home } from "../components/pages/Home";
import { homeRoutes } from "./HomeRoutes";
import { Setting } from "../components/pages/Setting";
import { HeaderLayput } from "../components/templates/HeaderLayout";
import { LoginUserProvider } from "../providers/LoginUserProvider";

export const Router = memo(() =>{
  return (
    
    <LoginUserProvider>
    <Routes>
        <Route path="/" element={<Login />}/>
        {homeRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={<HeaderLayput>{route.children}</HeaderLayput> }/>
        ))}
    </Routes>
    </LoginUserProvider>
    
  )
});