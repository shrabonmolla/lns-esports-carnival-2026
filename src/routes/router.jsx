// router.jsx

import { createBrowserRouter } from "react-router";

import HomeLayout from "../layoutes/HomeLayout";

import Home from "../pages/Home";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);

export default router;
