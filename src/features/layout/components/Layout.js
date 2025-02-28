
import Comic from "features/comic/components/Comic";
import Favorite from "features/favorite/components/Favorite"
import Auth from "features/auth/components/Auth"
import Home from "features/home/components/Home"
import {Link,Outlet} from "react-router-dom"; 
import Header from "components/Header";
import Footer from "components/Footer";


function Layout() {
    return (
        <div>
            <Header />

            <div class="container">

            <Outlet />

            </div>

            <Footer />
        </div>
    )
}

export default Layout;