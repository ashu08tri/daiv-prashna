import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Container from '../components/Container';
import logo from '../assets/images/logo.png';
import namaste from '../assets/images/namaste.jpg'


function Payment() {
    const navigate = useNavigate();
    const form = useRef();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [services, setServices] = useState([]);
    const [reload, setReload] = useState(false);
    const [sreload, setSreload] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [removeReload, setRemoveReload] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);


    const removeHandler = (id) => {
        try {
            let storedServices = JSON.parse(localStorage.getItem("userServiceData")) || [];

            // Ensure storedServices is an array
            if (!Array.isArray(storedServices)) {
                storedServices = []; // Reset to empty array if it was stored incorrectly
            }

            // Filter out the service to remove
            const updatedServices = storedServices.filter(service => service.id !== id);

            // Save updated array back to localStorage
            localStorage.setItem("userServiceData", JSON.stringify(updatedServices));

            alert("Service Removed!");
            setTimeout(() => {
                setRemoveReload(!removeReload);
            }, 500);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const getData = () => {
            try {
                let storedServices = JSON.parse(localStorage.getItem("userServiceData")) || [];
                setServices(storedServices);
                calculateTotalAmount(storedServices);
            } catch (err) {
                console.error(err);
            }
        };

        getData();
    }, [removeReload]);



    const calculateTotalAmount = (services) => {
        const total = services.reduce((acc, service) => {
            const amounts = ['astroAmount', 'yogaAmount', 'vastuAmount', 'poojaAmount'];
            const serviceTotal = amounts.reduce((sum, amountType) => {
                const amount = parseFloat(service[amountType]) || 0;
                return sum + amount;
            }, 0);
            return acc + serviceTotal;
        }, 0);
        setTotalAmount(total);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Retrieve stored services from localStorage
            let storedServices = JSON.parse(localStorage.getItem("userServiceData")) || [];

            if (!storedServices.length) {
                alert("No services found!");
                return;
            }

            // Extract details from the first service
            const { name, astroAmount, yogaAmount, vastuAmount, poojaAmount, shraddhaType } = storedServices[0];
            const totalAmount = (astroAmount || 0) + (yogaAmount || 0) + (vastuAmount || 0) + (poojaAmount || 0);

            // Format service details
            let serviceDetails = storedServices
                .map(service => service.shraddhaType || service.yogaType || service.vastuType || service.poojaType || service.astrologyType)
                .filter(Boolean) // Remove undefined values
                .join(", ");

            // Email content
            let emailData = {
                to: email,
                subject: "Payment Request for Daiv-Prashna Service",
                text: `Dear ${name},\n\nWe hope you're well. This is a reminder regarding the payment for the Daiv-Prashna service you have requested.\n\nAmount Due: ₹${totalAmount}\nServices: ${serviceDetails}\n\nBank Details:\nAccount No - 623801535116\nName - ALOK ANANDKUMAR TRIPATHI\nIFSC code - ICIC0006238\n\nOnce the payment is received, we will send a confirmation email and proceed with scheduling your appointment.\n\nThank you for your prompt attention.\n\nBest regards,\nDaiv-Prashna.in\nMob: +91-9930005234`,
                services
            };

            // Send email via backend
            let emailResponse = await axios.post("https://daiv-prashna.onrender.com/send-email", emailData);

            if (emailResponse.data.success) {
                localStorage.removeItem("userServiceData");
                setEmailSent(true); // ✅ Show the success message
            } else {
                console.log("Email sending failed:", emailResponse.data.error);
            }
            // Reload state after a delay
            setTimeout(() => {
                setSreload(!sreload);
            }, 1000);
        } catch (error) {
            console.error("Error in submitHandler:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Container>
            <div className="flex justify-center min-h-screen w-screen bg-gray-100">
                <div className="w-full md:w-1/2 bg-custom-ivory shadow-lg rounded-lg p-6">
                    <div className="flex justify-center">
                    </div>
                    {services && services.length > 0 ? (
                        <div className="text-custom-maroon">
                            <h1 className="text-4xl font-semibold text-center pb-6 text-custom-maroon">Payment</h1>
                            <form ref={form} onSubmit={submitHandler} className="space-y-6">
                                <label htmlFor="email" className='text-xl'>Email:</label>
                                <input type="email" name="email" placeholder='Please enter your email here!' className="p-3 text-xl font-semibold w-full bg-gray-200" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                {services.map((service, index) => (
                                    <div key={index} className="border-b pb-6 mb-6">
                                        <h2 className="text-3xl font-bold py-4 text-custom-maroon bg-transparent pointer-events-none">{service.name}</h2>
                                        {service.poojaType && (
                                            <div className="block py-3">
                                                <div className='flex justify-between'>
                                                    <h3 className="text-2xl font-semibold text-custom-maroon">Pooja Service</h3>
                                                    <button type='button' className='px-4 py-1 bg-custom-maroon text-custom-ivory' onClick={() => removeHandler(service.id)}>X</button>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                                    <input className="hidden text-3xl font-bold py-4 text-custom-maroon bg-transparent pointer-events-none" name="poojauser_name" value={service.name} readOnly />
                                                    <div>
                                                        <label className="text-xl">Date:</label>
                                                        <input name="pooja_date" value={service.date.split('T')[0]} className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none" readOnly />
                                                    </div>
                                                    <div>
                                                        <label className="text-xl">Reason:</label>
                                                        <input value={service.reason} name="reason" className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none" readOnly />
                                                    </div>
                                                    <div>
                                                        <label className="text-xl">Service:</label>
                                                        <input value={service.poojaType} name="pooja_service" className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none" readOnly />
                                                    </div>
                                                    <div>
                                                        <label className="text-xl">Amount:</label>
                                                        <input value={`${service.poojaAmount} ₹`} name="pooja_amount" className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none" readOnly />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {service.yogaType && (
                                            <div className="block py-3">
                                                <div className='flex justify-between'>
                                                    <h3 className="text-2xl font-semibold text-custom-maroon">Yoga Service</h3>
                                                    <button type='button' className='px-4 py-1 bg-custom-maroon text-custom-ivory' onClick={() => removeHandler(service.id)}>X</button>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                                    <input className="hidden text-3xl font-bold py-4 text-custom-maroon bg-transparent pointer-events-none" name="yogauser_name" value={service.name} readOnly />
                                                    <div>
                                                        <label className="text-xl">Date:</label>
                                                        <input value={service.date.split('T')[0]} name='yoga_date' className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none" readOnly />
                                                    </div>
                                                    <div>
                                                        <label className="text-xl">Gender:</label>
                                                        <input value={service.gender} name='yoga_gender' className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none" readOnly />
                                                    </div>
                                                    <div>
                                                        <label className="text-xl">Nationality:</label>
                                                        <input value={service.nationality} name='nationality' className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none" readOnly />
                                                    </div>
                                                    <div>
                                                        <label className="text-xl">Service:</label>
                                                        <input value={service.yogaType} name='yoga_service' className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none" readOnly />
                                                    </div>
                                                    <div>
                                                        <label className="text-xl">Amount:</label>
                                                        <input value={`${service.yogaAmount} ₹`} name='yoga_amount' className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none" readOnly />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {service.vastuType && (
                                            <div className="block py-3">
                                                <div className='flex justify-between'>
                                                    <h3 className="text-2xl font-semibold text-custom-maroon">Vastu Service</h3>
                                                    <button type='button' className='px-4 py-1 bg-custom-maroon text-custom-ivory' onClick={() => removeHandler(service.id)}>X</button>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                                    <input className="hidden text-3xl font-bold py-4 text-custom-maroon bg-transparent pointer-events-none" name="vastuuser_name" value={service.name} readOnly />
                                                    <div>
                                                        <label className="text-xl">Date:</label>
                                                        <input value={service.date.split('T')[0]} name='vastu_date' className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none" readOnly />
                                                    </div>
                                                    <div>
                                                        <label className="text-xl">Organization:</label>
                                                        <input value={service.organization} name='organization' className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none" readOnly />
                                                    </div>
                                                    <div>
                                                        <label className="text-xl">Country:</label>
                                                        <input value={service.country} name='vastu_country' className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none" readOnly />
                                                    </div>
                                                    <div>
                                                        <label className="text-xl">Service:</label>
                                                        <input value={service.vastuType} name='vastu_service' className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none" readOnly />
                                                    </div>
                                                    <div>
                                                        <label className="text-xl">Amount:</label>
                                                        <input value={`${service.vastuAmount} ₹`} name='vastu_amount' className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none" readOnly />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {service.shraddhaType && (
                                            <div className="block py-3">
                                                <div className='flex justify-between'>
                                                    <h3 className="text-2xl font-semibold text-custom-maroon">Shraddha Service</h3>
                                                    <button type='button' className='px-4 py-1 bg-custom-maroon text-custom-ivory' onClick={() => removeHandler(service.id)}>X</button>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                                    <input className="hidden text-3xl font-bold py-4 text-custom-maroon bg-transparent pointer-events-none" name="shraddhauser_name" value={service.name} readOnly />
                                                    <div>
                                                        <label className="text-xl">Date:</label>
                                                        <input value={service.date.split('T')[0]} name='shraddha_date' className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none" readOnly />
                                                    </div>
                                                    <div>
                                                        <label className="text-xl">Time:</label>
                                                        <input value={service.time} name='shraddha_time' className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none" readOnly />
                                                    </div>
                                                    <div>
                                                        <label className="text-xl">Service:</label>
                                                        <input value={service.shraddhaType} name='shraddha_service' className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none" readOnly />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {service.astrologyType && (
                                            <div className="block py-3">
                                                <div className='flex justify-between'>
                                                    <h3 className="text-2xl font-semibold text-custom-maroon">Astrology Service</h3>
                                                    <button type='button' className='px-4 py-1 bg-custom-maroon text-custom-ivory' onClick={() => removeHandler(service.id)}>X</button>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                                    <input className="hidden text-3xl font-bold py-4 text-custom-maroon bg-transparent pointer-events-none" name="astrouser_name" value={service.name} readOnly />
                                                    <div>
                                                        <label className="text-xl">DOB:</label>
                                                        <input value={service.date.split('T')[0]} name='astro_dob' className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none" readOnly />
                                                    </div>
                                                    <div>
                                                        <label className="text-xl">Time:</label>
                                                        <input value={service.time} name='astro_time' className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none" readOnly />
                                                    </div>
                                                    <div>
                                                        <label className="text-xl">Country:</label>
                                                        <input value={service.country} name='astro_country' className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none" readOnly />
                                                    </div>
                                                    <div>
                                                        <label className="text-xl">Gender:</label>
                                                        <input value={service.gender} name='astro_gender' className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none" readOnly />
                                                    </div>
                                                    <div>
                                                        <label className="text-xl">Place:</label>
                                                        <input value={service.place} name='place' className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none" readOnly />
                                                    </div>
                                                    <div>
                                                        <label className="text-xl">Service:</label>
                                                        <input value={service.astrologyType} name='astro_service' className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none" readOnly />
                                                    </div>
                                                    <div>
                                                        <label className="text-xl">Appointment On:</label>
                                                        <input value={service.appDate.split('T')[0]} name='astro_date' className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none" readOnly />
                                                    </div>
                                                    <div>
                                                        <label className="text-xl">Amount:</label>
                                                        <input value={`${service.astroAmount} ₹`} name='astro_amount' className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none" readOnly />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <button disabled={loading} className="w-full py-4 mt-4 text-xl font-semibold text-white bg-custom-yellow rounded-lg hover:bg-custom-yellow-dark transition-colors">{loading ? "Processing" : "Proceed With Booking"}</button>
                            </form>
                        </div>
                    ) : (
                        <p className="text-3xl md:text-5xl text-center font-semibold text-custom-maroon mt-10">No Service Selected.</p>
                    )}

                </div>

            </div>
            {emailSent && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-lg text-center relative">
                        <button
                            onClick={() => {
                                setServices([]);
                                navigate('/');
                            }}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Payment Email Sent
                        </h2>
                        <div className='flex justify-center h-20 my-6'>
                        <img src={namaste} alt="namaste" className='w-20 h-full object-cover'/>
                        </div>
                        <p className="text-gray-700 text-lg">
                        Thank you for booking a service with Daiv-Prashna. Please check your email and WhatsApp for the payment details. Your booking will be confirmed once we receive your payment.
                        </p>
                        <p className="text-gray-700 text-lg py-4">
                        दैवप्रश्न के साथ एक सेवा बुक करने के लिए धन्यवाद। कृपया भुगतान विवरण के लिए अपने ईमेल और व्हाट्सएप की जाँच करें। आपके भुगतान प्राप्त होने के बाद आपकी बुकिंग की पुष्टि हो जाएगी।
                        </p>
                        <p className="text-gray-700 text-lg">
                        दिव्यतायाः सह सेवां बुकं कृत्वा धन्यवादः। कृपया भुगतानविवरणार्थं कृपया स्वस्य ईमेलं व्हाट्सएप् च पश्यन्तु। भवतः भुगतानस्य प्राप्तेः अनन्तरं भवतः बुकिंगस्य पुष्टिः भविष्यति।
                        </p>
                    </div>
                </div>
            )}

        </Container>
    );
}

export default Payment;
