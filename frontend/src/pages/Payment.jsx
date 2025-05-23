import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import namaste from "../assets/images/namaste.jpg";

function Payment() {
  const navigate = useNavigate();
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [phonenNumber, setphonenNumber] = useState("");
  const [services, setServices] = useState([]);
  const [sreload, setSreload] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [removeReload, setRemoveReload] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [poojaCount, setpoojaCount] = useState(1);
  const [astroCount, setastroCount] = useState(1);
  const [vastuCount, setvastuCount] = useState(1);
  const [yogaCount, setyogaCount] = useState(1);



  const removeHandler = (id) => {
    try {
      let storedServices =
        JSON.parse(localStorage.getItem("userServiceData")) || [];

      // Ensure storedServices is an array
      if (!Array.isArray(storedServices)) {
        storedServices = []; // Reset to empty array if it was stored incorrectly
      }

      // Filter out the service to remove
      const updatedServices = storedServices.filter(
        (service) => service.id !== id
      );

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
        let storedServices =
          JSON.parse(localStorage.getItem("userServiceData")) || [];
        setServices(storedServices);
        calculateTotalAmount(storedServices);
      } catch (err) {
        console.error(err);
      }
    };

    getData();

    //  event listener
    const handleServiceUpdate = () => {
      getData(); // reload services from localStorage
    };
    // Adding event listener
    window.addEventListener('servicesUpdated', handleServiceUpdate);
    // Cleanup function
    return () => {
      window.removeEventListener('servicesUpdated', handleServiceUpdate);
    };

  }, [removeReload]);


  const calculateTotalAmount = (services) => {
    const total = services.reduce((acc, service) => {
      const pooja = (service.poojaTotalAmount ?? (service.poojaAmount * (service.poojaCount || 1))) || 0;
      const astro = (service.astroTotalAmount ?? (service.astroAmount * (service.astroCount || 1))) || 0;
      const vastu = (service.vastuTotalAmount ?? (service.vastuAmount * (service.vastuCount || 1))) || 0;
      const yoga = (service.yogaTotalAmount ?? (service.yogaAmount * (service.yogaCount || 1))) || 0;
  
      return acc + pooja + astro + vastu + yoga;
    }, 0);
  
    setTotalAmount(total);
  };
  
  
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      let storedServices = JSON.parse(localStorage.getItem("userServiceData")) || [];
  
      if (!storedServices.length) {
        alert("No services found!");
        return;
      }
  
      // Add phone number to all services
      storedServices = storedServices.map(service => ({
        ...service,
        phoneNo: phonenNumber
      }));
  
      localStorage.setItem("userServiceData", JSON.stringify(storedServices));
  
      // Compute total amount from all services
      const totalAmount = storedServices.reduce((acc, service) => {
        return (
          acc +
          (service.astroTotalAmount || 0) +
          (service.yogaTotalAmount || 0) +
          (service.vastuTotalAmount || 0) +
          (service.poojaTotalAmount || 0)
        );
      }, 0);
  
      // Extract all types from all services
      const serviceDetails = storedServices
        .map(
          (service) =>
            service.shraddhaType ||
            service.yogaType ||
            service.vastuType ||
            service.poojaType ||
            service.astrologyType
        )
        .filter(Boolean)
        .join(", ");
  
      // Use the first service just to get the user's name
      const { name } = storedServices[0];
  
      const emailData = {
        to: email,
        subject: "Payment Request for Daiv-Prashna Service",
        text: `Dear ${name},\n\nWe hope you're well. This is a reminder regarding the payment for the Daiv-Prashna service you have requested.\n\nAmount Due: ₹${totalAmount}\nServices: ${serviceDetails}\n\nBank Details:\nAccount No - 623801535116\nName - ALOK ANANDKUMAR TRIPATHI\nIFSC code - ICIC0006238\n\nOnce the payment is received, we will send a confirmation email and proceed with scheduling your appointment.\n\nThank you for your prompt attention.\n\nBest regards,\nDaiv-Prashna.in\nMob: +91-9930005234`,
        services: storedServices,
        phoneNo: phonenNumber,
        totalAmount
      };
  
      const emailResponse = await axios.post(
        "https://daiv-prashna.onrender.com/send-email",
        emailData
      );
  
      if (emailResponse.data.success) {
        localStorage.removeItem("userServiceData");
        setEmailSent(true);
      } else {
        console.log("Email sending failed:", emailResponse.data.error);
      }
  
      setTimeout(() => {
        setSreload(!sreload);
      }, 1000);
  
    } catch (error) {
      console.error("Error in submitHandler:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleIncrement = (service) => {
    let countKey, amountKey, unitAmount;

    if (service.poojaType !== "") {
      countKey = "poojaCount";
      amountKey = "poojaTotalAmount";
      unitAmount = parseFloat(service.poojaAmount);
    } else if (service.astrologyType !== "") {
      countKey = "astroCount";
      amountKey = "astroTotalAmount";
      unitAmount = parseFloat(service.astroAmount);
    } else if (service.vastuType !== "") {
      countKey = "vastuCount";
      amountKey = "vastuTotalAmount";
      unitAmount = parseFloat(service.vastuAmount);
    } else {
      countKey = "yogaCount";
      amountKey = "yogaTotalAmount";
      unitAmount = parseFloat(service.yogaAmount);
    }

    const storedServices = JSON.parse(localStorage.getItem("userServiceData")) || [];

    const updatedServices = storedServices.map(item => {
      if (item.id === service.id) {
        const currentCount = item[countKey] || 1;
        const newCount = currentCount + 1;
        return {
          ...item,
          [countKey]: newCount,
          [amountKey]: newCount * unitAmount
        };
      }
      return item;
    });

    localStorage.setItem("userServiceData", JSON.stringify(updatedServices));
    window.dispatchEvent(new Event("servicesUpdated"));
  };


  const handleDecrement = (service) => {
    let countKey, amountKey, unitAmount;

    if (service.poojaType !== "") {
      countKey = "poojaCount";
      amountKey = "poojaTotalAmount";
      unitAmount = parseFloat(service.poojaAmount);
    } else if (service.astrologyType !== "") {
      countKey = "astroCount";
      amountKey = "astroTotalAmount";
      unitAmount = parseFloat(service.astroAmount);
    } else if (service.vastuType !== "") {
      countKey = "vastuCount";
      amountKey = "vastuTotalAmount";
      unitAmount = parseFloat(service.vastuAmount);
    } else {
      countKey = "yogaCount";
      amountKey = "yogaTotalAmount";
      unitAmount = parseFloat(service.yogaAmount);
    }

    const storedServices = JSON.parse(localStorage.getItem("userServiceData")) || [];

    const updatedServices = storedServices.map(item => {
      if (item.id === service.id) {
        const currentCount = item[countKey] || 1;
        const newCount = Math.max(currentCount - 1, 1);
        return {
          ...item,
          [countKey]: newCount,
          [amountKey]: newCount * unitAmount
        };
      }
      return item;
    });

    localStorage.setItem("userServiceData", JSON.stringify(updatedServices));
    window.dispatchEvent(new Event("servicesUpdated"));
  };



  return (
    <Container>
      <div className="flex justify-center min-h-screen w-screen bg-gray-100">
        <div className="w-full md:w-1/2 bg-custom-ivory shadow-lg rounded-lg p-6">
          <div className="flex justify-center"></div>
          {services && services.length > 0 ? (
            <div className="text-custom-maroon">
              <h1 className="text-4xl font-semibold text-center pb-6 text-custom-maroon">
                Payment
              </h1>
              <form ref={form} onSubmit={submitHandler} className="space-y-6">
                {/* email */}
                <div className="flex gap-4 max-md:flex-col">
                  <div className="w-1/2 max-md:w-full">
                    <label htmlFor="email" className="text-xl">
                      Email:
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Please enter your email here!"
                      className="p-3 text-xl font-semibold w-full bg-gray-200"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* phone no */}
                  <div className="w-1/2 max-md:w-full">
                    <label htmlFor="phonenNumber" className="text-xl">
                      phonen Number:
                    </label>
                    <input
                      type="number"
                      name="phonenNumber"
                      placeholder="Please enter your phonen Number here!"
                      className="p-3 text-xl font-semibold w-full bg-gray-200"
                      value={phonenNumber}
                      onChange={(e) => setphonenNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* servie details */}
                {services.map((service, index) => (
                  <div key={index} className="border-b pb-6 mb-6">
                    <h2 className="text-3xl font-bold py-4 text-custom-maroon bg-transparent pointer-events-none">
                      {service.name}
                    </h2>
                    {service.poojaType && (
                      <div className="block py-3">
                        <div className="flex justify-between">
                          <h3 className="text-2xl font-semibold text-custom-maroon">
                            Pooja Service
                          </h3>

                          {/* add and delete */}
                          <div className="flex rounded-xl bg-custom-maroon text-white">
                            <p className=" p-2 font-semibold cursor-pointer" onClick={() => handleDecrement(service)}>-</p>
                            <p className=" p-2 font-semibold">{service.poojaCount || poojaCount}</p>
                            <p className=" p-2 font-semibold cursor-pointer" onClick={() => handleIncrement(service)}>+</p>
                          </div>

                          <button
                            type="button"
                            className="px-4 py-1 bg-custom-maroon text-custom-ivory"
                            onClick={() => removeHandler(service.id)}
                          >
                            X
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <input
                            className="hidden text-3xl font-bold py-4 text-custom-maroon bg-transparent pointer-events-none"
                            name="poojauser_name"
                            value={service.name}
                            readOnly
                          />
                          <div>
                            <label className="text-xl">Date:</label>
                            <input
                              name="pooja_date"
                              value={service.date.split("T")[0]}
                              className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-xl">Reason:</label>
                            <input
                              value={service.reason}
                              name="reason"
                              className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-xl">Service:</label>
                            <input
                              value={service.poojaType}
                              name="pooja_service"
                              className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-xl">Amount:</label>
                            <input
                              value={`₹${service.poojaTotalAmount || service.poojaAmount}`}
                              name="pooja_amount"
                              className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none"
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {service.yogaType && (
                      <div className="block py-3">
                        <div className="flex justify-between">
                          <h3 className="text-2xl font-semibold text-custom-maroon">
                            Yoga Service
                          </h3>

                          {/* add and delete */}
                          <div className="flex rounded-xl bg-custom-maroon text-white">
                            <p className=" p-2 font-semibold cursor-pointer" onClick={() => handleDecrement(service)}>-</p>
                            <p className=" p-2 font-semibold">{service.yogaCount || yogaCount}</p>
                            <p className=" p-2 font-semibold cursor-pointer" onClick={() => handleIncrement(service)}>+</p>
                          </div>

                          <button
                            type="button"
                            className="px-4 py-1 bg-custom-maroon text-custom-ivory"
                            onClick={() => removeHandler(service.id)}
                          >
                            X
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <input
                            className="hidden text-3xl font-bold py-4 text-custom-maroon bg-transparent pointer-events-none"
                            name="yogauser_name"
                            value={service.name}
                            readOnly
                          />
                          <div>
                            <label className="text-xl">Date:</label>
                            <input
                              value={service.date.split("T")[0]}
                              name="yoga_date"
                              className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-xl">Gender:</label>
                            <input
                              value={service.gender}
                              name="yoga_gender"
                              className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-xl">Nationality:</label>
                            <input
                              value={service.nationality}
                              name="nationality"
                              className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-xl">Service:</label>
                            <input
                              value={service.yogaType}
                              name="yoga_service"
                              className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-xl">Amount:</label>
                            <input
                              value={`₹${service.yogaTotalAmount || service.yogaAmount} `}
                              name="yoga_amount"
                              className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none"
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {service.vastuType && (
                      <div className="block py-3">
                        <div className="flex justify-between">
                          <h3 className="text-2xl font-semibold text-custom-maroon">
                            Vastu Service
                          </h3>

                          {/* add and delete */}
                          <div className="flex rounded-xl bg-custom-maroon text-white">
                            <p className=" p-2 font-semibold cursor-pointer" onClick={() => handleDecrement(service)}>-</p>
                            <p className=" p-2 font-semibold">{service.vastuCount || vastuCount}</p>
                            <p className=" p-2 font-semibold cursor-pointer" onClick={() => handleIncrement(service)}>+</p>
                          </div>

                          <button
                            type="button"
                            className="px-4 py-1 bg-custom-maroon text-custom-ivory"
                            onClick={() => removeHandler(service.id)}
                          >
                            X
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <input
                            className="hidden text-3xl font-bold py-4 text-custom-maroon bg-transparent pointer-events-none"
                            name="vastuuser_name"
                            value={service.name}
                            readOnly
                          />
                          <div>
                            <label className="text-xl">Date:</label>
                            <input
                              value={service.date.split("T")[0]}
                              name="vastu_date"
                              className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-xl">Organization:</label>
                            <input
                              value={service.organization}
                              name="organization"
                              className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-xl">Country:</label>
                            <input
                              value={service.country}
                              name="vastu_country"
                              className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-xl">Service:</label>
                            <input
                              value={service.vastuType}
                              name="vastu_service"
                              className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-xl">Amount:</label>
                            <input
                              value={`₹${service.vastuTotalAmount || service.vastuAmount}`}
                              name="vastu_amount"
                              className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none"
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {service.shraddhaType && (
                      <div className="block py-3">
                        <div className="flex justify-between">
                          <h3 className="text-2xl font-semibold text-custom-maroon">
                            Shraddha Service
                          </h3>
                          <button
                            type="button"
                            className="px-4 py-1 bg-custom-maroon text-custom-ivory"
                            onClick={() => removeHandler(service.id)}
                          >
                            X
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <input
                            className="hidden text-3xl font-bold py-4 text-custom-maroon bg-transparent pointer-events-none"
                            name="shraddhauser_name"
                            value={service.name}
                            readOnly
                          />
                          <div>
                            <label className="text-xl">Date:</label>
                            <input
                              value={service.date.split("T")[0]}
                              name="shraddha_date"
                              className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-xl">Time:</label>
                            <input
                              value={service.time}
                              name="shraddha_time"
                              className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-xl">Service:</label>
                            <input
                              value={service.shraddhaType}
                              name="shraddha_service"
                              className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none"
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {service.astrologyType && (
                      <div className="block py-3">
                        <div className="flex justify-between">
                          <h3 className="text-2xl font-semibold text-custom-maroon">
                            Astrology Service
                          </h3>

                          {/* add and delete */}
                          <div className="flex rounded-xl bg-custom-maroon text-white">
                            <p className=" p-2 font-semibold cursor-pointer" onClick={() => handleDecrement(service)}>-</p>
                            <p className=" p-2 font-semibold">{service.astroCount || astroCount}</p>
                            <p className=" p-2 font-semibold cursor-pointer" onClick={() => handleIncrement(service)}>+</p>
                          </div>

                          <button
                            type="button"
                            className="px-4 py-1 bg-custom-maroon text-custom-ivory"
                            onClick={() => removeHandler(service.id)}
                          >
                            X
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <input
                            className="hidden text-3xl font-bold py-4 text-custom-maroon bg-transparent pointer-events-none"
                            name="astrouser_name"
                            value={service.name}
                            readOnly
                          />
                          <div>
                            <label className="text-xl">DOB:</label>
                            <input
                              value={service.date.split("T")[0]}
                              name="astro_dob"
                              className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-xl">Time:</label>
                            <input
                              value={service.time}
                              name="astro_time"
                              className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-xl">Country:</label>
                            <input
                              value={service.country}
                              name="astro_country"
                              className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-xl">Gender:</label>
                            <input
                              value={service.gender}
                              name="astro_gender"
                              className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-xl">Place:</label>
                            <input
                              value={service.place}
                              name="place"
                              className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-xl">Service:</label>
                            <input
                              value={service.astrologyType}
                              name="astro_service"
                              className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-xl">Appointment On:</label>
                            <input
                              value={service.appDate.split("T")[0]}
                              name="astro_date"
                              className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-xl">Amount:</label>
                            <input
                              value={`₹${service.astroTotalAmount || service.astroAmount}`}
                              name="astro_amount"
                              className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none"
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <div>
                  <p className="p-3 text-xl font-semibold w-full bg-gray-200 pointer-events-none">Total Amount: <span className="text-xl font-bold">₹{totalAmount}</span></p>
                </div>
                <button
                  disabled={loading}
                  className="w-full py-4 mt-4 text-xl font-semibold text-white bg-custom-yellow rounded-lg hover:bg-custom-yellow-dark transition-colors"
                >
                  {loading ? "Processing" : "Proceed With Booking"}
                </button>
              </form>
            </div>
          ) : (
            <p className="text-3xl md:text-5xl text-center font-semibold text-custom-maroon mt-10">
              No Service Selected.
            </p>
          )}
        </div>
      </div>
      {emailSent && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-lg text-center relative">
            <button
              onClick={() => {
                setServices([]);
                navigate("/");
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold text-gray-900">
              Payment Email Sent
            </h2>
            <div className="flex justify-center h-20 my-6">
              <img
                src={namaste}
                alt="namaste"
                className="w-20 h-full object-cover"
              />
            </div>
            <p className="text-gray-700 text-lg">
              Thank you for booking a service with Daiv-Prashna. Please check
              your email and WhatsApp for the payment details. Your booking will
              be confirmed once we receive your payment.
            </p>
            <p className="text-gray-700 text-lg py-4">
              दैवप्रश्न के साथ एक सेवा बुक करने के लिए धन्यवाद। कृपया भुगतान
              विवरण के लिए अपने ईमेल और व्हाट्सएप की जाँच करें। आपके भुगतान
              प्राप्त होने के बाद आपकी बुकिंग की पुष्टि हो जाएगी।
            </p>
            <p className="text-gray-700 text-lg">
              दिव्यतायाः सह सेवां बुकं कृत्वा धन्यवादः। कृपया भुगतानविवरणार्थं
              कृपया स्वस्य ईमेलं व्हाट्सएप् च पश्यन्तु। भवतः भुगतानस्य प्राप्तेः
              अनन्तरं भवतः बुकिंगस्य पुष्टिः भविष्यति।
            </p>
          </div>
        </div>
      )}
    </Container>
  );
}

export default Payment;
