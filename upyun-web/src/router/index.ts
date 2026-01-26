import { createBrowserRouter } from "react-router";
import Layout from "@/layout";
import Home from "@/views/Home";
import About from "@/views/About";
import Login from "@/views/Login";

const router = createBrowserRouter([
    {
        path: '/login',
        Component: Login,
    },
    { 
        // path: '/index', //省略 
        Component: Layout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: 'about',
                Component: About,
            },
        ]
    },
]);

export default router;