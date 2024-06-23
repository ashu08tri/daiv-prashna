import { useState,useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import FormModal from '../components/FormModal';
import Container from '../components/Container';
import astanga from '../assets/images/astangayoga.png';
import shakti from '../assets/images/shakti yoga.png';
import kriya from '../assets/images/kriya yoga.png';
import hath from '../assets/images/hath yoga.png';
import basics from '../assets/images/basics of yoga.png';
import everyday from '../assets/images/everyday yoga.png';

function Yoga() {
    const [modal, setModal] = useState(false);
    const [yoga, setYoga] = useState('');
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth'});
            }
        }
    }, [location]);

    const modalHandler = (e) => {
        setYoga(e.target.nextSibling.alt)
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          
        setModal(!modal);
    }

    return (
        <Container>
        <div className='border-t border-custom-yellow-dark bg-custom-ivory w-[calc(90vw)]'>
            <div className='flex flex-col md:flex-row items-center justify-between'>
                <button onClick={modalHandler} className='bg-custom-yellow text-white px-4 py-2 hover:bg-custom-yellow-dark active:scale-90 rounded-b-md md:rounded-e-md md:rounded-l-none'>Book Session</button>
                <h1 className='text-5xl text-custom-yellow mt-8 mb-12'>Types of Yoga</h1>
                <div></div>
            </div>
            <div className='absolute'>
                <AnimatePresence>
                    {modal && <FormModal title={'Yoga'} onClose={modalHandler} listClose={modalHandler} YogaType={yoga} />}
                </AnimatePresence>
            </div>
            <div className='flex flex-col md:flex-row justify-between px-4 my-4' id='shaktiyoga'>
                <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1, transition: { delay: .2, duration: .3, type: 'spring' } }} viewport={{ once: true, amount: 'all' }} className='md:w-1/2 flex flex-col justify-center items-center'>
                    <h1 className='text-custom-yellow text-3xl font-bold my-8 word tracking-widest'>Shakti Yoga</h1>
                    <p className='text-left text-custom-yellow-dark font-semibold md:pl-9'>A typical Shakti yoga session utilizes the same kinds of Hatha yoga poses you'd find in a Vinyasa or Power yoga class. Since this type of yoga is meant to invigorate your body and soul, expect standing and strength building poses that may be somewhat challenging.</p>
                </motion.div>
                <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1, transition: { delay: .2, duration: .3, type: 'spring' } }} viewport={{ once: true, amount: 'all' }} className='relative order-first md:order-2 md:w-1/2 flex justify-center md:justify-center'>
                <button className='absolute top-80 text-white bg-custom-maroon px-5 py-3 rounded-md' onClick={modalHandler}>Book Now</button>
                    <img src={shakti} alt="shakti yoga" className='w-[calc(65%)] h-96 rounded-md'/>
                </motion.div>
            </div>

            <div className='flex flex-col md:flex-row justify-between px-4 mt-8' id='astangayoga'>
                <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1, transition: { delay: .2, duration: .3, type: 'spring' } }} viewport={{ once: true, amount: 'all' }} className='md:w-1/2 flex flex-col justify-center items-center'>
                    <h1 className='text-custom-yellow text-3xl font-bold my-8 word tracking-widest'>Astanga Yoga</h1>
                    <p className='text-left text-custom-yellow-dark font-semibold md:pr-9'>What is Ashtanga yoga? The word Ashtanga is comprised of two Sanskrit words, “Ashta” and “Anga.” “Ashta” refers to the number eight, while “Anga” means limb or body part. Therefore, Ashtanga is the union of the eight limbs of yoga, into one complete, holistic system.</p>
                </motion.div>
                <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1, transition: { delay: .2, duration: .3, type: 'spring' } }} viewport={{ once: true, amount: 'all' }} className='relative order-first md:w-1/2 flex justify-center md:justify-center'>
                <button className='absolute top-80 text-white bg-custom-maroon px-5 py-3 rounded-md' onClick={modalHandler}>Book Now</button>
                    <img src={astanga}  alt="astanga yoga" className='w-[calc(65%)] h-96 rounded-md'/>
                </motion.div>
            </div>

            <div className='flex flex-col md:flex-row justify-between px-4 my-4' id='kriyayoga'>
                <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1, transition: { delay: .2, duration: .3, type: 'spring' } }} viewport={{ once: true, amount: 'all' }} className='md:w-1/2 flex flex-col justify-center items-center'>
                    <h1 className='text-custom-yellow text-3xl font-bold my-8 word tracking-widest'>Kriya Yoga</h1>
                    <p className='text-left text-custom-yellow-dark font-semibold md:pl-9'>Kriya is a highly advanced Raja Yoga technique of pranayama. Kriya reinforces and revitalizes subtle currents of life energy (prana) in the spine and brain. The ancient seers of India (rishis) perceived the brain and spine as the tree of life.</p>
                </motion.div>
                <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1, transition: { delay: .2, duration: .3, type: 'spring' } }} viewport={{ once: true, amount: 'all' }} className='relative order-first md:order-2 md:w-1/2 flex justify-center md:justify-center'>
                <button className='absolute top-80 text-white bg-custom-maroon px-5 py-3 rounded-md' onClick={modalHandler}>Book Now</button>
                    <img src={kriya} alt="kriya yoga" className='w-[calc(65%)] h-96 rounded-md'/>
                </motion.div>
            </div>

            <div className='flex flex-col md:flex-row justify-between px-4 pb-5 mt-8' id='hathyoga'>
                <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1, transition: { delay: .2, duration: .3, type: 'spring' } }} viewport={{ once: true, amount: 'all' }} className='md:w-1/2 flex flex-col justify-center items-center'>
                    <h1 className='text-custom-yellow text-3xl font-bold my-8 word tracking-widest'>Hath Yoga</h1>
                    <p className='text-left text-custom-yellow-dark font-semibold md:pr-9'>A yoga class described as 'Hatha' will typically involve a set of physical postures (yoga poses) and breathing techniques. These are typically practised more slowly and with more static holds than a Vinyasa flow or Ashtanga class.</p>
                </motion.div>
                <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1, transition: { delay: .2, duration: .3, type: 'spring' } }} viewport={{ once: true, amount: 'all' }} className='relative order-first md:w-1/2 flex justify-center md:justify-center'>
                <button className='absolute top-80 text-white bg-custom-maroon px-5 py-3 rounded-md' onClick={modalHandler}>Book Now</button>
                    <img src={hath} alt="hath yoga" className='w-[calc(65%)] h-96 rounded-md'/>
                </motion.div>
            </div>

            <div className='flex flex-col md:flex-row justify-between px-4 my-4' id='basicsofmeditation'>
                <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1, transition: { delay: .2, duration: .3, type: 'spring' } }} viewport={{ once: true, amount: 'all' }} className='md:w-1/2 flex flex-col justify-center items-center'>
                    <h1 className='text-custom-yellow text-3xl font-bold my-8 word tracking-widest'>Basics of Meditation</h1>
                    <p className='text-left text-custom-yellow-dark font-semibold md:pl-9'>Kriya is a highly advanced Raja Yoga technique of pranayama. Kriya reinforces and revitalizes subtle currents of life energy (prana) in the spine and brain. The ancient seers of India (rishis) perceived the brain and spine as the tree of life.</p>
                </motion.div>
                <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1, transition: { delay: .2, duration: .3, type: 'spring' } }} viewport={{ once: true, amount: 'all' }} className='relative order-first md:order-2 md:w-1/2 flex justify-center md:justify-center'>
                <button className='absolute top-80 text-white bg-custom-maroon px-5 py-3 rounded-md' onClick={modalHandler}>Book Now</button>
                    <img src={basics} alt="basics of meditation" className='w-[calc(65%)] h-96 rounded-md'/>
                </motion.div>
            </div>

            <div className='flex flex-col md:flex-row justify-between px-4 pb-5 mt-8' id='everydaymeditation'>
                <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1, transition: { delay: .2, duration: .3, type: 'spring' } }} viewport={{ once: true, amount: 'all' }} className='md:w-1/2 flex flex-col justify-center items-center'>
                    <h1 className='text-custom-yellow text-3xl font-bold my-8 word tracking-widest'>Everyday Meditation</h1>
                    <p className='text-left text-custom-yellow-dark font-semibold md:pr-9'>A yoga class described as 'Hatha' will typically involve a set of physical postures (yoga poses) and breathing techniques. These are typically practised more slowly and with more static holds than a Vinyasa flow or Ashtanga class.</p>
                </motion.div>
                <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1, transition: { delay: .2, duration: .3, type: 'spring' } }} viewport={{ once: true, amount: 'all' }} className='relative order-first md:w-1/2 flex justify-center md:justify-center'>
                <button className='absolute top-80 text-white bg-custom-maroon px-5 py-3 rounded-md' onClick={modalHandler}>Book Now</button>
                    <img src={everyday} alt="every day meditation" className='w-[calc(65%)] h-96 rounded-md'/>
                </motion.div>
            </div>
        </div>
    </Container>
    )
}

export default Yoga;