import React, { useState } from 'react';

const Register = ({ onClose, openLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [styleValid, setStyleValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const handleRegister = async (e) => {
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
                const response = await fetch('https://daiv-prashna.onrender.com/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await response.json();
                if (data.ok) {
                    alert('User registered successfully!');
                    onClose(false);
                    openLogin(true);
                } else if(data.user){
                    alert(data.user);
                }else {
                    alert('Failed to register user!');
                }
            } catch (error) {
                console.error('Error registering:', error);
                alert('An error occurred. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className='flex justify-center'>
        <div className={`w-72 ${styleValid ? 'h-72' : 'h-96'} bg-custom-ivory flex flex-col items-center absolute top-[calc(60%)] md:top-28 md:right-16 z-50 p-2 rounded-md border border-custom-maroon`}>
            <div className='flex justify-between w-full'>
                <h2 className='text-xl text-left py-4 pl-3'>Register:</h2>
                <button className='pr-2' onClick={onClose}>X</button>
            </div>
            <form onSubmit={handleRegister}>
                <div className='my-2 flex flex-col'>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='px-3 py-1 rounded-md'
                    />
                    {emailError && <span style={{ color: 'red' }}>{emailError}</span>}
                </div>
                <div className='my-2 flex flex-col'>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='px-3 py-1 rounded-md'
                    />
                    {passwordError && <span style={{ color: 'red' }}>{passwordError}</span>}
                </div>
                <button type="submit" className='bg-custom-maroon px-3 py-1 text-custom-ivory rounded-sm' disabled={isLoading}>
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
        </div>
    );
};

export default Register;
