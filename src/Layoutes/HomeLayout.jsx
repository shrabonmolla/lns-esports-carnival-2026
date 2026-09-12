// HomeLayout.jsx

import { Outlet } from "react-router";
import Navbar from "../ui/home/Navbar";
import Footer from "../ui/home/Footer";

export default function HomeLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
