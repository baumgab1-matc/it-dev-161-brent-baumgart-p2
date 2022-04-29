import { createContext, useState } from "react";


//Context wasn't covered in class but I gave it a shot

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {

    //holds flag to update header to show if user is or isn't logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //holds id of customer
    //this fails when page is refreshed, that's why I added local storage for id
    const [id, setId] = useState('');

    const setCustomerId = (idToSet) => {
        localStorage.setItem('id', idToSet);
        setId(localStorage.getItem('id'));
    }


    return (
        <CustomerContext.Provider
            value={{ isLoggedIn, setIsLoggedIn, id, setCustomerId }}
        >
            {children}
        </CustomerContext.Provider>
    );
}

export default CustomerContext;