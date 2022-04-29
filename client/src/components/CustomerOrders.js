import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomerContext from "../context/CustomerContext";
import OrderItem from "./OrderItem";
import LoadingSpinner from "./LoadingSpinner";

//Component for '/orders'
//shows all past orders for a customer
const CustomerOrders = () => {
    const navigate = useNavigate();

    //flag that is true while server is authenticating customer
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    //holds all past orders
    const [orderObject, setOrderObject] = useState([{}]);


    //authenticate customer to make sure they are allowed to view their orders
    const authenticateUser = () => {
        const token = localStorage.getItem('token');
        const customerId = localStorage.getItem('id');

        if (token && customerId) {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token,
                },
            };

             axios
                .get(`http://localhost:5000/api/customers/${customerId}/orders`, config)
                .then(response => {
                    //customer has been authenticated, set orders and set authenticating flag to false
                    setOrderObject(response.data);
                    setIsAuthenticating(false);
                })
                .catch(error => {
                    console.log('error');
                    console.error(`Error logging in: ${error}`);
                });


        } else {
            //if user wasn't logged in and somehow got to this page just push them back to main page
            navigate('/');
        }
    };


    useEffect(() => {
        authenticateUser();
    }, []);


    //if authenticating is running show spinner gif
    if (isAuthenticating) {
       return  <LoadingSpinner />
    }

    //authenticating is over and there are no past orders
    if (!isAuthenticating && orderObject.length === 0) {
        return <p>You have no orders</p>
    }

    //authenticating is over and there are past order then loop through them
    if (!isAuthenticating && orderObject) {

        return (
            <div className="orders">
                <h1 className="total-orders"> Total orders {orderObject.length}</h1>
                <div>
                    {orderObject.map((orderItem, i) => (
                        <OrderItem key={i} orderItem={orderItem} />

                    ))}
                </div>
            </div>
        )
    }

}

export default CustomerOrders;