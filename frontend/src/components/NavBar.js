import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { links } from '../utils/linkData';
import { getAuthToken } from '../utils/token';
import ServiceList from './ServiceList';
import logo from '../assets/images/logo.png';
import Login from './Login';
import Register from './Register';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState(false);
    const [register, setRegister] = useState(false);
    const [appointment, setAppointment] = useState(false);
    const [isPrashadModalOpen, setPrashadModalOpen] = useState(false);
    const [prashadData, setPrashadData] = useState({
        name: "",
        email: "",
        pinCode: "",
        mobile: "",
        address: ""
    });
    const [verifiedToken , setVToken] = useState('');
    const token = getAuthToken();
    const navigate = useNavigate();

    // if(token){
    //     const verifyToken = async() => {
    //         try{
    //             let res = await fetch('https://daiv-prashna.onrender.com/verifyToken/' + token)
    //             res = await res.json();
    //             setVToken(res.user.token)
    //         }catch(err){
    //             console.log(err);
    //         }
    //     }
    
    //     verifyToken();
    // }

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

    const handlePrashadChange = (e) => {
        setPrashadData({ ...prashadData, [e.target.name]: e.target.value });
    };

    const handlePrashadSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const emailData = {
                to: prashadData.email, 
                subject: "Prashad Corner - Shipment Registration",
                text: `New Prashad shipment request:\n\nName: ${prashadData.name}\nPIN Code: ${prashadData.pinCode}\nMobile: ${prashadData.mobile}\nAddress: ${prashadData.address}`
            };

            await axios.post("https://daiv-prashna.onrender.com/send-email", emailData);
            alert("Your shipment request has been registered!");
            setPrashadModalOpen(false);
            setPrashadData({ name: "", pinCode: "", mobile: "", address: "" });
        } catch (error) {
            console.error("Error sending email:", error);
        }finally{
            setLoading(false);
        }
    };


    return (
        <>
            <nav className="h-24 md:h-36 bg-custom-maroon p-4 border-b border-custom-yellow-dark">
                <div className="h-full container mx-auto flex justify-between items-center">
                    <div className='flex justify-center w-full md:w-2/12'>
                        <Link to="/" onClick={handleLinkClick}>
                            <img src={logo} alt='logo' className='w-40 md:w-full'/>
                        </Link>
                    </div>
                    <div className="h-full hidden md:flex justify-center items-center space-x-4 w-10/12">
                        {links.map((link, i) =>
                            <Link to={link.url} key={i} className="text-white group py-16 hover:text-custom-yellow" onClick={handleLinkClick}>
                                <span className='border-e-2 pr-4 group-last:border-e-0 border-custom-yellow'>{link.title}</span>
                                <ul className='hidden group-hover:flex items-end absolute w-auto md:w-full md:left-0 bg-custom-maroon p-2 mt-[calc(60px)] z-50'>
                                    <div className='flex justify-end mr-4 gap-4 w-7/12'>
                                        {link.images.map((image, i) => 
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
                        {/* Prashad Corner Button */}
                        <button onClick={() => setPrashadModalOpen(true)} className="text-white py-16 hover:text-custom-yellow">
                            <span className='pr-4 border-custom-yellow'>Prashad Corner</span>
                        </button>
                    </div>

                    {/* Book Appointment Section (UNCHANGED) */}
                    <div className='hidden relative w-2/12 md:flex justify-center'>
                        <button className='bg-custom-yellow text-white p-1 rounded-md' onClick={appointmentHandler}>
                            <span className="flex w-full bg-custom-maroon text-white p-3 rounded-md active:scale-95">
                                Book Appointment
                            </span>
                        </button>
                        <AnimatePresence>
                            {appointment && <ServiceList onClose={appointmentHandler} />}
                        </AnimatePresence>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-white focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className='flex justify-center'>
                {isOpen && (
                    <div className="md:hidden flex flex-col gap-3 bg-custom-maroon p-4 border-b border-custom-yellow-dark w-[calc(90vw)]">
                        {links.map((link, i) => (
                            <Link to={link.url} key={i} className="text-white group hover:text-custom-yellow pr-4 " onClick={toggleMenu}>
                                {link.title}
                                <ul className='hidden group-hover:flex flex-col absolute w-auto bg-custom-maroon p-2 z-50'>
                                    {link.additionalData.map((link, i) => (
                                        <Link to={link.url} onClick={toggleMenu} key={i} className="text-white hover:bg-custom-yellow rounded-sm border-maroon-50 p-2">
                                            {link.title}
                                        </Link>
                                    ))}
                                </ul>
                            </Link>
                        ))}
                        {/* Prashad Corner for Mobile */}
                        <button onClick={() => setPrashadModalOpen(true)} className="text-white hover:text-custom-yellow self-start">
                            Prashad Corner
                        </button>
                    </div>
                )}
            </div>

            {/* Prashad Corner Modal */}
            <AnimatePresence>
                {isPrashadModalOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
                    >
                        <div className="bg-white p-6 rounded-lg w-96">
                            <h2 className="text-xl font-bold text-center mb-4">Prashad Shipment Details</h2>
                            <form onSubmit={handlePrashadSubmit} className="space-y-3">
                                <input type="text" name="name" value={prashadData.name} onChange={handlePrashadChange} placeholder="Your Name" required className="w-full p-2 border rounded"/>
                                <input type="email" name="email" value={prashadData.email} onChange={handlePrashadChange} placeholder="Your Email" required className="w-full p-2 border rounded"/>
                                <input type="text" name="pinCode" value={prashadData.pinCode} onChange={handlePrashadChange} placeholder="PIN Code" required className="w-full p-2 border rounded"/>
                                <input type="text" name="mobile" value={prashadData.mobile} onChange={handlePrashadChange} placeholder="Mobile" required className="w-full p-2 border rounded"/>
                                <textarea name="address" value={prashadData.address} onChange={handlePrashadChange} placeholder="Address" required className="w-full p-2 border rounded"></textarea>
                                
                                <div className="flex justify-between">
                                    <button disabled={loading} type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">{loading ? "Saving" : "Submit"}</button>
                                    <button type="button" onClick={() => setPrashadModalOpen(false)} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Close</button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
