import React, { useRef, useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import Container from '../components/Container';
import logo from '../assets/images/logo.png';
import SuccessPay from '../components/SuccessPay';
import { getAuthToken } from '../utils/token';

function Payment() {

    const form = useRef();
    const [services, setServices] = useState([]);
    const [payReceipt, setPayReceipt] = useState("");
    const [paymentID, setPaymentID] = useState("");
    const [method, setMethod] = useState('');
    const [currency, setCurrency] = useState('');
    const [paid, setPaid] = useState('');
    const [reload, setReload] = useState(false);
    const [sreload, setSreload] = useState(false);
    const [removeReload, setRemoveReload] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const token = getAuthToken();

    useEffect(() => {
        if (paymentID) {
            const fetchPaymentData = async () => {
                try {
                    const { data: paymentData } = await axios.get('https://daiv-prashna.onrender.com/payment/' + paymentID);
                    setCurrency(paymentData.currency);
                    setPaid(paymentData.amount/100);
                    setMethod(paymentData.method);
                } catch (err) {
                    console.log(err);
                }
            };

            fetchPaymentData();
        }
    }, [paymentID]);

    const removeHandler = async (id) => {
        try {
            let res = await axios.delete('https://daiv-prashna.onrender.com/removeService/' + id, {
                headers: {
                    authorization: "Bearer " + token,
                }
            });
            if (res.data.ok) {
                alert('Service Removed!');
                setTimeout(() => {
                    setRemoveReload(!removeReload)
                }, 500)
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get('https://daiv-prashna.onrender.com/userData', {
                    headers: {
                        authorization: "Bearer " + token,
                    }
                });
                setServices(res.data.services);
                calculateTotalAmount(res.data.services);
            } catch (err) {
                console.error(err);
            }
        };
        getData();
    }, [token, removeReload]);

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

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        try {
            const result = await axios.post("https://daiv-prashna.onrender.com/orders", {
                totalAmount: totalAmount
            });

            if (!result) {
                alert("Server error. Are you online?");
                return;
            }

            let { data: key } = await axios.get("https://daiv-prashna.onrender.com/getKey");
            let { data: emailData } = await axios.get("https://daiv-prashna.onrender.com/getEmailKeys");

            const { amount, id: order_id, currency, receipt } = result.data;
            setPayReceipt(receipt);

            const options = {
                key,
                amount: amount.toString(),
                currency,
                name: "Daiv-Prashna",
                description: "Payment to Daiv-Prashna",
                image: logo,
                order_id: order_id,
                handler: async function (response) {
                    const PAYMENT_ID = response.razorpay_payment_id;
                    setPaymentID(PAYMENT_ID);
                    const data = {
                        orderCreationId: order_id,
                        razorpayPaymentId: PAYMENT_ID,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };

                    const result = await axios.post("https://daiv-prashna.onrender.com/success", data);

                    alert(result.data.msg);
                    if (result.data.msg) {
                       setTimeout(async() => {
                        emailjs
                        .sendForm(emailData.secrectID, emailData.templateID, form.current, {
                            publicKey: emailData.publicKey,
                        })
                        .then(
                            () => {
                                console.log('SUCCESS!');
                            },
                            (error) => {
                                console.log('FAILED...', error);
                            }
                        );
                    await axios.delete('https://daiv-prashna.onrender.com/deleteData', {
                        headers: {
                            authorization: "Bearer " + token,
                        }
                    });
                       },1000)
                        setTimeout(() => {
                            setReload(!reload);
                        }, 1000);
                    }
                },

                prefill: {
                    name: "Alok Anand",
                    email: "appointment@daiv-prashna.in",
                    contact: "9999999999",
                },
                theme: {
                    color: "#fffff0",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error(error);
            alert("There was an error processing your payment. Please try again.");
        }
    }
    const submitHandler = (e) => {
        e.preventDefault();
        displayRazorpay();
    };

    const bookShraddha = async() => {
        let { data: emailData } = await axios.get("https://daiv-prashna.onrender.com/getEmailKeys");
        emailjs
        .sendForm(emailData.secrectID, emailData.templateID, form.current, {
            publicKey: emailData.publicKey,
        })
        .then(
            () => {
                console.log('SUCCESS!');
            },
            (error) => {
                console.log('FAILED...', error);
            }
        );
    await axios.delete('https://daiv-prashna.onrender.com/deleteData', {
        headers: {
            authorization: "Bearer " + token,
        }
    });setTimeout(() => {
        setSreload(!reload);
    }, 1000);
    }

    return (
        <Container>
            <div className="flex justify-center min-h-screen w-screen bg-gray-100">
                <div className="w-full md:w-1/2 bg-custom-ivory shadow-lg rounded-lg p-6">
                    <div className="flex justify-center">
                        {reload && <SuccessPay desc={'Thank you for completing your secure online payment.'} title={'Payment Done!'} />}
                    </div>
                    {token && services && services.length > 0 ? (
    <div className="text-custom-maroon">
        <h1 className="text-4xl font-semibold text-center pb-6 text-custom-maroon">Payment</h1>
        <form ref={form} onSubmit={submitHandler} className="space-y-6">
            <input type="email" name="user_email" value={services[0].email} className="hidden" readOnly required />
            <input type="text" name="payReceipt" value={payReceipt} className="hidden" readOnly required />
            <input type="text" name="paymentID" value={paymentID} className="hidden" readOnly required />
            <input type="text" name="method" value={method} className="hidden" readOnly required />
            <input type="text" name="currency" value={currency} className="hidden" readOnly required />
            <input type="text" name="paid" value={paid} className="hidden" readOnly required />
            {services.map((service, index) => (
                <div key={index} className="border-b pb-6 mb-6">
                    <h2 className="text-3xl font-bold py-4 text-custom-maroon bg-transparent pointer-events-none">{service.name}</h2>
                    {service.poojaType && (
                        <div className="block py-3">
                            <div className='flex justify-between'>
                                <h3 className="text-2xl font-semibold text-custom-maroon">Pooja Service</h3>
                                <button type='button' className='px-4 py-1 bg-custom-maroon text-custom-ivory' onClick={() => removeHandler(service._id)}>X</button>
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
                                <button type='button' className='px-4 py-1 bg-custom-maroon text-custom-ivory' onClick={() => removeHandler(service._id)}>X</button>
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
                                <button type='button' className='px-4 py-1 bg-custom-maroon text-custom-ivory' onClick={() => removeHandler(service._id)}>X</button>
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
                                <button type='button' className='px-4 py-1 bg-custom-maroon text-custom-ivory' onClick={() => removeHandler(service._id)}>X</button>
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
                                <button type='button' className='px-4 py-1 bg-custom-maroon text-custom-ivory' onClick={() => removeHandler(service._id)}>X</button>
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
            {services.every(service => service.shraddhaType) ? (
                <>
                {sreload && <SuccessPay desc={'Thank you for completing your secure online booking.'} title={'Booking Successful!'} />}
                <button type='button' onClick={bookShraddha} className="w-full py-4 mt-4 text-xl font-semibold text-white bg-custom-yellow rounded-lg hover:bg-custom-yellow-dark transition-colors">
                    Book Service
                </button>
                </>
            ) : (
                <button  className="w-full py-4 mt-4 text-xl font-semibold text-white bg-custom-yellow rounded-lg hover:bg-custom-yellow-dark transition-colors">
                    Pay ₹{totalAmount}
                </button>
            )}
        </form>
    </div>
) : (
    <p className="text-3xl md:text-5xl text-center font-semibold text-custom-maroon mt-10">No Service Selected.</p>
)}

                </div>
            </div>
        </Container>
    );
}

export default Payment;
