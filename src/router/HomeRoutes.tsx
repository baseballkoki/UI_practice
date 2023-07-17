import { Home } from "../components/pages/Home";
import { UserManagements } from "../components/pages/UserManagements";
import { Login } from "../components/pages/Login";
import { Setting } from "../components/pages/Setting";
import { PageNotFound } from "../components/pages/PageNotFound";
 
export const homeRoutes = [
    {
        path: "/home",
        children: <Home />
    },
    {
        path: "home/user_management",
        children: <UserManagements />
    },
    {
        path: "home/setting",
        children: <Setting />
    },
    {
        path: "/",
        children: <Login />
    },
    {
        path: "*",
        children: <PageNotFound />
    },
];