import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { links } from '../utils/linkData';
import { getAuthToken } from '../utils/token';
import ServiceList from './ServiceList';
import logo from '../assets/images/logo.png';
import Login from './Login';
import Register from './Register';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);
    const [appointment, setAppointment] = useState(false);
    const token = getAuthToken();

    const appointmentHandler = () => {
        setAppointment(!appointment);
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = () => {
        setIsOpen(false);
        setAppointment(false);
        setLogin(false);
        setRegister(false);
    };

    const loginModal = () => {
        setLogin(!login)
        setRegister(false)
    }
    const registerModal = () => {
        setRegister(!register)
        setLogin(false)
    }

    return (
        <>
        <nav className="h-24 md:h-36 bg-custom-maroon p-4 border-b border-custom-yellow-dark">
            <div className="h-full container mx-auto flex justify-between items-center">
                <div className='flex justify-center w-full md:w-auto'>
                    <Link to="/" onClick={handleLinkClick}>
                        <img src={logo} alt='logo' className='w-40 md:w-56'/>
                    </Link>
                </div>
                <div className="h-full hidden md:flex items-center space-x-4">
                    {links.map((link, i) =>
                        <Link to={link.url} key={i} className="text-white group py-16 hover:text-custom-yellow" onClick={handleLinkClick}>
                            <span className='border-e-2 pr-4 group-last:border-e-0 border-custom-yellow'>{link.title}</span>
                            <ul className='hidden group-hover:flex items-end absolute w-auto md:w-full md:left-0 bg-custom-maroon p-2 mt-[calc(60px)] z-50'>
                                <div className='flex justify-end mr-4 gap-4 w-7/12'>
                                    {link.images.map((image,i) => 
                                     <img src={image.img} key={i} alt='nav_imgs' className='w-56 h-56 rounded-sm'/>
                                    )}
                                </div>
                                <div className='flex flex-col h-60 w-5/12'>
                                {link.additionalData.map((link, i) =>
                                    <Link to={link.url} key={i} className="text-white hover:underline underline-offset-8 decoration-custom-yellow-dark rounded-sm border-maroon-50 p-2" onClick={handleLinkClick}>{link.title}</Link>
                                )}
                                </div>
                            </ul>
                        </Link>
                    )}
                </div>
                {token && token !== 'undefined' && <div className='hidden md:block relative pr-20'>
                    <button className='bg-custom-yellow text-white p-1 rounded-md' onClick={appointmentHandler}>
                        <span className="flex w-full bg-custom-maroon text-white p-3 rounded-md active:scale-95">
                            Book Appointment
                        </span>
                    </button>
                    <AnimatePresence>
                        {appointment && <ServiceList onClose={appointmentHandler} />}
                    </AnimatePresence>
                </div>}
                {!token || token === 'undefined' ? <div className='hidden md:block relative'>
                    {login && <Login onClose={loginModal}/>}
                    {register && <Register onClose={registerModal} openLogin={loginModal}/>}
                        <button className='px-5 py-2 bg-custom-yellow text-custom-ivory rounded-md mr-6' onClick={loginModal}>Login</button>
                        <button className='px-5 py-2 bg-custom-yellow text-custom-ivory rounded-md mr-1' onClick={registerModal}>Register</button>
                    </div>: <></>}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
        <div className='flex justify-center'>
    {isOpen && (
        <div className="md:hidden flex flex-col gap-3 bg-custom-maroon p-4 border-b border-custom-yellow-dark w-[calc(90vw)]">
            {links.map((link, i) => (
                <Link to={link.url} key={i} className="text-white group hover:text-custom-yellow pr-4 " onClick={toggleMenu}>
                    {link.title}
                    <ul className='hidden group-hover:flex flex-col absolute w-auto bg-custom-maroon p-2 z-50'>
                        {link.additionalData.map((link, i) => (
                            <Link to={link.url} onClick={toggleMenu} key={i} className="text-white hover:bg-custom-yellow rounded-sm border-maroon-50 p-2 ">
                                {link.title}
                            </Link>
                        ))}
                    </ul>
                </Link>
            ))}
            {!token && (
                <div className='flex flex-col gap-2 mt-4'>
                    {login && <Login onClose={loginModal}/>}
                    {register && <Register onClose={registerModal} openLogin={loginModal} />}
                    <button className='px-5 py-2 bg-custom-yellow text-custom-ivory rounded-md' onClick={loginModal}>Login</button>
                    <button className='px-5 py-2 bg-custom-yellow text-custom-ivory rounded-md' onClick={registerModal}>Register</button>
                </div>
            )}
        </div>
    )}
</div>

        </>
    );
};

export default Navbar;
