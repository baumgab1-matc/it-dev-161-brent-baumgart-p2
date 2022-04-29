import { useContext } from "react";
import ProductContext from "../context/ProductContext";
import CustomerContext from "../context/CustomerContext";
import CheckoutItem from "./CheckoutItem";
import { FaRegSadTear } from "react-icons/fa"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"


//what user sees when they click on cart icon
const ShoppingCart = () => {
    const navigate = useNavigate();

    //get all items in cart
    const { cart, emptyCart } = useContext(ProductContext);
    const { id, isLoggedIn } = useContext(CustomerContext);

    const handleOrder = async () => {
        const token = localStorage.getItem('token');

        if (token) {

            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": token,
                    },
                };

                const body = {
                    id,
                    cart
                }

                //create new order in database and associate it logged in customer
                if (id) {
                    await axios.post('http://localhost:5000/api/orders', body, config);
                    emptyCart();
                    navigate('/');
                }

                //empty cart and go back to homepage
                emptyCart();
                navigate('/');

            } catch (error) {
                console.error(`Error creating post: ${error.response.data}`);
            }
        }

    }


    return (
        <div className="checkout">
            <h2>shopping cart</h2>

            {cart.length === 0 && <div>
                <p className='empty-cart-text'>Your shopping cart is empty.</p>
                <FaRegSadTear className="empty-cart-icon" />
            </div>}

            <div className="checkout-products">
                {cart.map((product) => (
                    <CheckoutItem key={product._id} product={product} />
                ))}
            </div>

            {cart.length !== 0 && <div className="place-order">
                <h5>Amount: </h5>
                <button onClick={handleOrder}>Place Order</button>

                {!isLoggedIn &&
                    <div className="login-warning">
                        <p>You need to <Link to='/login'>login in</Link> to place order!</p>
                    </div>}


            </div>}


        </div>
    )

}


export default ShoppingCart;