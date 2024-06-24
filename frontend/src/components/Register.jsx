import React, { useState } from 'react';

const Register = ({onClose, openLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await fetch('https://daiv-prashna.onrender.com/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        let data = await response.json();
        if(data.ok){
            alert('User registered successfully!') 
            onClose(false)
            openLogin(true)
        }else{
            alert('Failed to register user!')
        }
    };

    return (
        <div className="w-72 h-72 bg-custom-ivory flex flex-col items-center absolute top-[calc(60%)] md:top-28 right-36 md:right-16 z-50 p-2 rounded-md border border-custom-maroon">
            <div className='flex justify-between w-full'>
            <h2 className='text-xl text-left py-4 pl-3'>Register:</h2>
            <button className='pr-2' onClick={onClose}>X</button>
            </div>
            <form onSubmit={handleRegister}>
                <div className='my-2 flex flex-col'> 
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='px-3 py-1 rounded-md'
                    />
                </div>
                <div className='my-2 flex flex-col'>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='px-3 py-1 rounded-md'
                    />
                </div>
                <button type="submit" className='bg-custom-maroon px-3 py-1 text-custom-ivory rounded-sm'>Register</button>
            </form>
        </div>
    );
};

export default Register;
