import { useContext, useEffect, useState } from "react";
import { FaUserAlt, FaCartPlus } from "react-icons/fa"
import { Link } from "react-router-dom"
import CustomerContext from "../context/CustomerContext";
import ProductContext from "../context/ProductContext";

//component to how the nav bar on top of page
const Header = () => {

    const { cartSize, emptyCart } = useContext(ProductContext);
    const { isLoggedIn, setIsLoggedIn } = useContext(CustomerContext);

    const hasToken = localStorage.getItem('isLoggedIn');

    useEffect(() => {
        //not sure if this best way but if user refreshes page this will keep them logged in
        if (hasToken === "true") {
            setIsLoggedIn(true);
        }
    }, [setIsLoggedIn])


    //handles clearing/resetting variables when user logs out
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        emptyCart();
        setIsLoggedIn(false);
    }

    return (
        <header className="header">
            <h1>
                <Link to="/" className="logo">
                    Coffee Shop
                </Link>
            </h1>
            <ul>
                <li>
                    {!isLoggedIn ? (
                        <Link to="/login">
                            <FaUserAlt /> (login)
                        </Link>

                    ) : (
                        <Link to="/orders">
                            my orders
                        </Link>

                    )}
                </li>
                <li>
                    <Link to="/cart">
                        <FaCartPlus /> ({cartSize})
                    </Link>
                </li>

                <li>
                    {isLoggedIn &&
                        <Link to="" onClick={logout}>
                            logout
                        </Link>
                    }

                </li>

            </ul>
        </header>
    );
}


export default Header;