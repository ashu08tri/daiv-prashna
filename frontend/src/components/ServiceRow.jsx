import axios from "axios";
import { motion } from "framer-motion";

const ServiceRow = ({ service, setServices, id }) => {
  const { name, date, email, time, yogaType, vastuType, poojaType, astrologyType, shraddhaType, astroAmount, yogaAmount, vastuAmount, poojaAmount, paid } = service;

  // Determine service type and amount
  const serviceType = yogaType || vastuType || poojaType || astrologyType || shraddhaType || "N/A";
  const amount = astroAmount || yogaAmount || vastuAmount || poojaAmount || 0;

  // Toggle Paid Status
  const togglePaid = async () => {
    try {
      await axios.patch(`https://daiv-prashna.onrender.com/service/${id}`, { paid: true });
      setServices(prev => prev.map(s => s._id === id ? { ...s, paid: true } : s));
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Service
  const deleteService = async () => {
    try {
      await axios.delete(`https://daiv-prashna.onrender.com/service/${id}`);
      setServices(prev => prev.filter(s => s._id !== id));
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <motion.tr className="border-b bg-custom-ivory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <td className="p-3">{name}</td>
      <td className="p-3">{serviceType}</td>
      <td className="p-3">
        {new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
      <td className="p-3">{time.length > 0 ? time : "N/A"}</td>
      <td className="p-3">{email}</td>
      <td className="p-3">₹{amount}</td>
      <td className="p-3">
        <button
          onClick={togglePaid}
          className={`px-3 py-1 rounded-full ${paid ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
        >
          {paid ? "Paid" : "Unpaid"}
        </button>
      </td>
      <td className="p-3">
        <button onClick={deleteService} className="bg-gray-200 px-3 py-1 rounded hover:bg-red-500 hover:text-white">
          Delete
        </button>
      </td>
    </motion.tr>
  );
};

export default ServiceRow;
