import { createBrowserRouter } from "react-router";
import Layout from "../layout";
import Home from "../views/Home";
import About from "../views/About";

const router = createBrowserRouter([
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