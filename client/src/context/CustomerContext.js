import { createContext, useState } from "react";
import axios from 'axios';

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {

    //holds flag to update header to show if user is or isn't logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //holds id of customer
    const [id, setId] = useState('');

    //when user logs in set flag for login to be true 
    //and set a local storage variable to be true to prevent losing login info on refresh
    // const login = () => {
    //     setIsLoggedIn(true);
    //     localStorage.setItem('isLoggedIn', true);
    // }

    const setCustomerId = (idToSet) => {
        setId(idToSet);
    }


    // const fetchCustomerId = () => {
    //     const token = localStorage.getItem('token');

    //     const config = {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "x-auth-token": token,
    //         }
    //     };

    //     axios
    //         .get('http://localhost:5000/api/auth', config)
    //         .then(response => {
    //              setId(response.data._id);
    //         })
    //         .catch(error => {
    //             localStorage.removeItem('token');
    //             localStorage.removeItem('isLoggedIn');
    //             console.log('error');
    //             console.error(`Error logging in: ${error}`);
    //         });

    // }

    return (
        <CustomerContext.Provider
            value={{ isLoggedIn, setIsLoggedIn, id, setCustomerId }}
        >
            {children}
        </CustomerContext.Provider>
    );
}

export default CustomerContext;