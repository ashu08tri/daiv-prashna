import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ServiceRow from "./ServiceRow";
import {toast, Toaster} from "sonner";

const ServiceTable = () => {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchServices = (page = 1) => {
    axios.get(`https://daiv-prashna.onrender.com/services?page=${page}`)
      .then(res => {
        setServices(res.data.services);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
      })
      .catch(err => console.error(err));
  };

const handleSync = async() => {
  let res = await fetch('https://daiv-prashna.onrender.com/sync');
  res = await res.json();
  toast.success(res.message);
}

  useEffect(() => {
    fetchServices(currentPage);
  }, [currentPage]);

  return (
    <div className="p-6 h-full">
      <Toaster richColors={true} position="bottom-right" visibleToasts={1} />
      <div className="flex items-center mb-6 gap-8">
        <h2 className="text-3xl font-semibold text-custom-maroon">Service List</h2>
        <a href='https://docs.google.com/spreadsheets/d/1i4kW6Yc4e7qRIxmwliksDx7yNMGScVV1-g5-gvwrEqc/edit?gid=0#gid=0'
          className="px-3 py-1 border-none text-white bg-custom-maroon rounded-lg active:scale-90"
        >Open in sheet</a>
        <button onClick={handleSync} className="px-3 py-1 border-none text-white bg-custom-maroon rounded-lg active:scale-90">Sync Data</button>
      </div>
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
              <tr><td colSpan="8" className="p-4 text-center">No services found.</td></tr>
            )}
          </tbody>
        </table>
      </motion.div>

      {/* Pagination Buttons */}
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-md border ${
              currentPage === i + 1
                ? 'bg-custom-maroon text-white'
                : 'bg-white text-custom-maroon border-custom-maroon'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceTable;
