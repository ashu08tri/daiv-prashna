import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ServiceRow from "./ServiceRow";

const ServiceTable = () => {
  const [services, setServices] = useState([]);

  // Fetch services from backend
  useEffect(() => {
    axios.get("https://daiv-prashna.onrender.com/services")
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  }, []);

  console.log(services);
  
   

  
  return (
    <div className="p-6 h-full">
      <h2 className="text-3xl font-semibold text-custom-maroon mb-6">Service List</h2>
      <motion.div
        className="overflow-x-auto bg-white shadow-lg rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-custom-maroon text-white">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Paid</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.length > 0 ? (
              services.map(service => (
                <ServiceRow key={service._id} service={service} setServices={setServices} id={service._id} />
              ))
            ) : (
              <tr><td colSpan="5" className="p-4 text-center">No services found.</td></tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default ServiceTable;
