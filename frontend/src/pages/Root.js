import { Outlet } from "react-router"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer";

function Root() {
  return (
    <>
    <main>
    <NavBar />
    <Outlet />
    <Footer/>
    </main>
    </>
  )
}

export default Root;