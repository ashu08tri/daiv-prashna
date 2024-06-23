import { motion } from "framer-motion";
import img from '../assets/images/down-arrow.png';
import MaharishiMahatapaGyanganj from '../assets/images/Maharishi Mahatapa Gyan ganj.png';
import ShriMahamukhopadhayaGopinathKaviraj from '../assets/images/Shri Mahamukhopadhaya Gopinath Kaviraj.png';
import ShriNeelkanthShastry from '../assets/images/Shri Neelkanth Shastry.png';
import ShriVisshudhanandparamhansa from '../assets/images/Shri Visshudhanand paramhansa.png';


function Lineage() {

  return (
    <>
      <motion.div initial={{ width: '100vw', height: '100vh', borderRadius: 0, transformOrigin: 'center' }}
        animate={{ width: 0, height: 0, borderRadius: '100%', transformOrigin: 'center' }}
        transition={{ duration: .5, ease: 'easeInOut' }}
        className='absolute top-1/2 left-1/2 bg-custom-ivory z-40 -translate-x-2/4 -translate-y-2/4'>
      </motion.div>
      <div className="flex flex-col justify-center items-center">
        <div className="w-[calc(90vw)] bg-custom-ivory py-6">
          <h1 className="text-2xl md:text-4xl text-center my-4 font-semibold text-custom-maroon">Founder's Lineage</h1>

          <div className="text-center">

            <motion.div initial={{ y: -30, opacity: 0 }} whileInView={{ y: 0, opacity: 1, transition: { delay: .5, duration: .3, ease: 'easeIn'} }} viewport={{ once: true, amount: 'all' }} className="flex flex-col md:flex-row justify-center md:justify-evenly items-center h-54">
              <img src={MaharishiMahatapaGyanganj} alt="" className="w-72 h-72 bg-transparent" />
              <p className="text-2xl text-custom-yellow font-semibold pt-3 md:p-0">Shri Maharishi Matapa (Gyan ganj ashram Tibet )</p>
            </motion.div>

            <motion.div initial={{ y: -30, opacity: 0 }} whileInView={{ y: 0, opacity: 1, transition: { delay: .4, duration: .3, ease: 'easeIn'}}} viewport={{ once: true, amount: 'all' }} className="flex justify-center my-4">
              <img src={img} alt="" />
            </motion.div>

            <motion.div initial={{ y: -30, opacity: 0 }} whileInView={{ y: 0, opacity: 1, transition: { delay: .5, duration: .3, ease: 'easeIn'} }} viewport={{ once: true, amount: 'all' }} className="flex flex-col md:flex-row justify-center md:justify-evenly items-center my-16">
              <p className="text-2xl text-custom-yellow font-semibold pt-3 md:p-0">Shri Vishuddhanand Paramhansa (Gyan Ganj & Varanasi )</p>
              <img src={ShriVisshudhanandparamhansa} alt="" className="w-72 h-72 order-first md:order-2" />
            </motion.div>

            <motion.div initial={{ y: -30, opacity: 0 }} whileInView={{ y: 0, opacity: 1, transition: { delay: .3, duration: .3, ease: 'easeIn'}}} viewport={{ once: true, amount: 'all' }} className="flex justify-center my-4">
              <img src={img} alt="" />
            </motion.div>

            <motion.div initial={{ y: -30, opacity: 0 }} whileInView={{ y: 0, opacity: 1, transition: { delay: .5, duration: .3, ease: 'easeIn'} }} viewport={{ once: true, amount: 'all' }} className="flex flex-col md:flex-row justify-center md:justify-evenly items-center my-16">
              <img src={ShriMahamukhopadhayaGopinathKaviraj} alt="" className="w-72 h-72" />
              <p className="text-2xl text-custom-yellow font-semibold pt-3 md:p-0">Shri Gopinath Kaviraj Varanasi</p>
            </motion.div>

            <motion.div initial={{ y: -30, opacity: 0 }} whileInView={{ y: 0, opacity: 1, transition: { delay: .3, duration: .3, ease: 'easeIn'}}} viewport={{ once: true, amount: 'all' }} className="flex justify-center my-4">
              <img src={img} alt="" />
            </motion.div>

            <motion.div initial={{ y: -30, opacity: 0 }} whileInView={{ y: 0, opacity: 1, transition: { delay: .5, duration: .3, ease: 'easeIn'} }} viewport={{ once: true, amount: 'all' }} className="flex flex-col md:flex-row justify-center md:justify-evenly items-center my-16">
              <p className="text-2xl text-custom-yellow font-semibold pt-3 md:p-0">Shri Neelkanth Shastry ( Varanasi )</p>
              <img src={ShriNeelkanthShastry} alt="" className="w-72 h-72 order-first md:order-2"/>
            </motion.div>

            <motion.div initial={{ y: -30, opacity: 0 }} whileInView={{ y: 0, opacity: 1, transition: { delay: .3, duration: .3, ease: 'easeIn'}}} viewport={{ once: true, amount: 'all' }} className="flex justify-center my-4">
              <img src={img} alt="" />
            </motion.div>

            <motion.div initial={{ y: -30, opacity: 0 }} whileInView={{ y: 0, opacity: 1, transition: { delay: .5, duration: .3, ease: 'easeIn'}}} viewport={{ once: true, amount: 'all' }} className="flex flex-col md:flex-row justify-center md:justify-evenly items-center mt-16 mb-6">
              <img src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" alt="" className="w-72 h-72" />
              <p className="text-2xl text-custom-yellow font-semibold pt-3 md:p-0">Shri Alok Anand </p>
            </motion.div>

          </div>

        </div>
      </div>
    </>
  )
}

export default Lineage;