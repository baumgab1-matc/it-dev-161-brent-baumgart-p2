import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomerContext from "../context/CustomerContext";

//component to show register page
const Register = () => {
    const navigate = useNavigate();

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {setIsLoggedIn, setCustomerId} = useContext(CustomerContext);

    const [errorData, setErrorData] = useState({ errors: null });
    const { errors } = errorData;


    const handleRegister = async (e) => {
        e.preventDefault();

        const newCustomer = {
            firstName: fname,
            lastName: lname,
            email,
            password
        }

        //create new customer in database
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const body = JSON.stringify(newCustomer);
            const res = await axios.post('http://localhost:5000/api/customers', body, config);

            //set logged in variables
            const customer = await res.data.customer;
            setCustomerId(customer._id);
            localStorage.setItem('isLoggedIn', true);
            setIsLoggedIn(true);

            // Store customer data and redirect
            localStorage.setItem('token', res.data.token);
            navigate('/');

        } catch (error) {
            // Clear user data and set errors
            localStorage.removeItem('token');

            setErrorData({
                ...errors,
                errors: error.response.data.errors
            })
        }

    }

    return (
        <div className="register-container">

            <h2>create an account</h2>

            <form action="">
                <label htmlFor="customer_fname" className="register">First Name</label>
                <input type="text" id="customer_fname" value={fname} onChange={e => setFname(e.target.value)} autoComplete="off" required></input>

                <label htmlFor="customer_lname" className="register">last name</label>
                <input type="text" id="customer_lname" value={lname} onChange={e => setLname(e.target.value)} autoComplete="off" required></input>

                <label htmlFor="customer_email" className="register">email</label>
                <input type="email" id="customer_email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="off" required></input>

                <label htmlFor="customer_password" className="register">password</label>
                <input type="password" id="customer_password" value={password} onChange={e => setPassword(e.target.value)} required></input>

                <button className="register-button" onClick={(e) => handleRegister(e)}>Sign up</button>

                <div>
                    {errors && errors.map(error =>
                        <div style={{color: 'red'}} key={error.msg}>{error.msg}</div>)}
                </div>
            </form>


        </div>
    );
}

export default Register;