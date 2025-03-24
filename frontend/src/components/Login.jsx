import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [styleValid, setStyleValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        let valid = true;

        if (!validateEmail(email)) {
            setEmailError('Invalid email address');
            setStyleValid(false);
            valid = false;
        } else {
            setEmailError('');
        }

        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long');
            setStyleValid(false);
            valid = false;
        } else {
            setPasswordError('');
        }

        if (valid) {
            setIsLoading(true);
            try {
                const response = await fetch('https://daiv-prashna.onrender.com/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (data.ok) {
                    const token = data.accessToken;
                    localStorage.setItem("token", token);

                    // Decode JWT to extract the role
                    const decodedToken = JSON.parse(atob(token.split('.')[1]));
                    localStorage.setItem("role", decodedToken.role);  // Store role in localStorage

                    navigate('/admin');
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('Error logging in:', error);
                alert('An error occurred. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className={`w-80 ${styleValid ? 'h-72' : 'h-96'} bg-custom-ivory flex flex-col items-center relative shadow-lg p-6 rounded-lg border border-custom-maroon`}>
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-2xl font-semibold text-custom-maroon">Login</h2>
                    {/* <button className="text-gray-600 hover:text-gray-900" onClick={onClose}>&times;</button> */}
                </div>
                <form onSubmit={handleLogin} className="w-full">
                    <div className="my-3 flex flex-col">
                        <label className="font-medium">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-custom-maroon"
                        />
                        {emailError && <span className="text-sm text-red-600 mt-1">{emailError}</span>}
                    </div>
                    <div className="my-3 flex flex-col">
                        <label className="font-medium">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-custom-maroon"
                        />
                        {passwordError && <span className="text-sm text-red-600 mt-1">{passwordError}</span>}
                    </div>
                    <button type="submit" className="w-full bg-custom-maroon text-custom-ivory px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>

    );
};

export default Login;
