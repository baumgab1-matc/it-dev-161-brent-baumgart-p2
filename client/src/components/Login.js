import { useContext, useState } from "react";
import { Link } from "react-router-dom"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomerContext from "../context/CustomerContext";

//component to show login page
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorData, setErrorData] = useState({ errors: null });
    const { errors } = errorData;

    const {setIsLoggedIn, setCustomerId} = useContext(CustomerContext);


    const handleLogin = async (e) => {
        e.preventDefault();
        
        const customerToLogIn = {
            email: email,
            password: password
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const body = JSON.stringify(customerToLogIn);
            const res = await axios.post('http://localhost:5000/api/login', body, config);
                        
            //todo should this be in customer context
            const customer = await res.data.customer;
            setCustomerId(customer._id);
            localStorage.setItem('isLoggedIn', true);
            setIsLoggedIn(true);

            // store user data and redirect
            localStorage.setItem('token', res.data.token);
            navigate('/');

        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            setErrorData({
                ...errors,
                errors: error.response.data.errors
                
            })
        }

    }

    return (
        <div className="login-container">

            <h2>sign in</h2>

            <form onSubmit={(e) => handleLogin(e)}>
                <label htmlFor="customer_email" className="login">Email Address</label>
                <input type="email" id="customer_email" value={email} onChange={e => setEmail(e.target.value)}  required></input>

                <label htmlFor="customer_password" className="login">password</label>
                <input type="password" id="customer_password" value={password} onChange={e => setPassword(e.target.value)} required></input>

                <button className="login-button">Sign in</button>
            </form>

            <p className="create-account-helper-text">Don'have an account?</p>
            <Link to="/register">
                Sign up
            </Link>

            <div>
                {errors && errors.map(error =>
                    <div style={{color: 'red'}} key={error.msg}>{error.msg}</div>)}
            </div>

        </div>
    );
}

export default Login;