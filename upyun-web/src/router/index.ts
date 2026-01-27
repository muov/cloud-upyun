import { createBrowserRouter } from "react-router";
import Layout from "@/layout";
import Home from "@/views/Home";
import File from "@/views/File";
import Login from "@/views/Login";

const router = createBrowserRouter([
    {
        path: '/login',
        Component: Login,
    },
    { 
        Component: Layout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: 'file',
                Component: File,
            },
        ]
    },
]);

export default router;