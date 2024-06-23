import { useState,useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import FormModal from '../components/FormModal';
import Container from '../components/Container';
import newHomeVastu from '../assets/images/New house vastu.png';
import Turnkeyproject from '../assets/images/Turn key project.png';
import vastumodify from '../assets/images/vastu modify.png';

function Vastu() {
    const [modal, setModal] = useState(false);
    const [vastu, setVastu] = useState('');
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
        setVastu(e.target.nextSibling.alt)
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          
        setModal(!modal);
    }

    return (
        <Container>
            <div className='bg-custom-ivory w-[calc(90vw)]'>
           <div className='flex flex-col md:flex-row items-center justify-between'>
           <button onClick={modalHandler} className='bg-custom-yellow text-white px-4 py-2 hover:bg-custom-yellow-dark active:scale-90 rounded-b-md md:rounded-e-md md:rounded-l-none'>Book Session</button>
           <h1 className='text-4xl md:text-5xl text-custom-yellow mt-8 mb-12'>Vastu </h1>
           <div></div>
           </div>
           <div className='absolute'>
                    <AnimatePresence>
                        {modal && <FormModal title={'Corporate Consultancy'} onClose={modalHandler} listClose={modalHandler} VastuType={vastu} />}
                    </AnimatePresence>
                </div>
           <div className='flex justify-center text-custom-yellow'>
            <div className='w-3/4 leading-relaxed font-semibold'>
            <p className='py-2'>
            The second key to achieving a balanced and successful life involves Vastu. It is essential to ensure that the environment where you spend 24 hours is harmonious to promote the correct growth. This process, which is slightly more intricate, is closely linked to your horoscope. While a specific direction may be generally favorable, its suitability for you depends on your specific purpose and occupation. 
            </p>
            </div>
           </div>
           <h2 className='text-center text-3xl md:text-4xl text-custom-yellow my-12'>Services of Vastu</h2>
                <div className='flex flex-col md:flex-row justify-between px-4 my-4' id='vastumodifications'>
                    <motion.div initial={{x: -30, opacity: 0}} whileInView={{x: 0, opacity: 1, transition: {delay: .2, duration: .3, type: 'spring'}}} viewport={{once: true, amount: 'all'}} className='md:w-1/2 flex flex-col justify-center items-center'>
                        <h1 className='text-custom-yellow text-3xl font-bold my-8 word tracking-widest'>Vastu Modifications</h1>
                        <p className='text-left text-custom-yellow-dark md:pl-9'>We offer solutions to transform your existing work and living spaces into balanced and positive environments that support both your material and spiritual growth. Through our expertise in Vastu, we can identify and suggest changes to optimize the energy flow in your surroundings, promoting harmony and overall well-being. These solutions are tailored to your specific needs and can help create a conducive atmosphere for your personal and professional endeavors.</p>
                    </motion.div>
                    <motion.div initial={{x: 30, opacity: 0}} whileInView={{x: 0, opacity: 1, transition: {delay: .2, duration: .3, type: 'spring'}}} viewport={{once: true, amount: 'all'}} className='relative order-first md:order-2 md:w-1/2 flex justify-center md:justify-center'>
                        <button className='absolute top-80 text-white bg-custom-maroon px-5 py-3 rounded-md' onClick={modalHandler}>Book Now</button>
                        <img src={vastumodify} alt="Vastu Modifications" className='w-[calc(65%)] h-96 rounded-md' />
                    </motion.div>
                </div>

                <div className='flex flex-col md:flex-row justify-between px-4 mt-8' id='newhomevastu'>
                    <motion.div initial={{x: 30, opacity: 0}} whileInView={{x: 0, opacity: 1, transition: {delay: .2, duration: .3, type: 'spring'}}} viewport={{once: true, amount: 'all'}} className='md:w-1/2 flex flex-col justify-center items-center'>
                        <h1 className='text-custom-yellow text-3xl font-bold my-8 word tracking-widest'>New Home Vastu</h1>
                        <p className='text-left text-custom-yellow-dark md:pr-9'>If you're looking to select an ideal work or living space that is Vastu compliant, we can help. By analyzing your horoscope and identifying your needs, we can guide you in finding a Vastu complaint space that is most suitable for you. Our expertise in Vastu enables us to evaluate different properties and recommend the ones that have a positive energy flow, promoting balance and growth in all areas of your life.</p>
                    </motion.div>
                    <motion.div initial={{x: -30, opacity: 0}} whileInView={{x: 0, opacity: 1, transition: {delay: .2, duration: .3, type: 'spring'}}} viewport={{once: true, amount: 'all'}} className='relative order-first md:w-1/2 flex justify-center md:justify-center'>
                        <button className='absolute top-80 text-white bg-custom-maroon px-5 py-3 rounded-md' onClick={modalHandler}>Book Now</button>
                        <img src={newHomeVastu} alt="New Home Vastu" className='w-[calc(65%)] h-96 rounded-md' />
                    </motion.div>
                </div>

                <div className='flex flex-col md:flex-row justify-between px-4 my-4' id='turnkeyprojects'>
                    <motion.div initial={{x: -30, opacity: 0}} whileInView={{x: 0, opacity: 1, transition: {delay: .2, duration: .3, type: 'spring'}}} viewport={{once: true, amount: 'all'}} className='md:w-1/2 flex flex-col justify-center items-center'>
                        <h1 className='text-custom-yellow text-3xl font-bold my-8 word tracking-widest'>Turn Key projects</h1>
                        <p className='text-left text-custom-yellow-dark md:pl-9'>We specialize in helping you build your dream work and living spaces from the ground up. By incorporating the perfect directional balance needed for you to excel in both your personal and professional life, we ensure that your environments support your growth and success. Our expertise in Vastu allows us to create spaces that are harmonious and conducive to your overall well-being, helping you achieve your goals and aspirations.</p>
                    </motion.div>
                    <motion.div initial={{x: 30, opacity: 0}} whileInView={{x: 0, opacity: 1, transition: {delay: .2, duration: .3, type: 'spring'}}} viewport={{once: true, amount: 'all'}} className='relative order-first md:order-2 md:w-1/2 flex justify-center md:justify-center'>
                        <button className='absolute top-80 text-white bg-custom-maroon px-5 py-3 rounded-md' onClick={modalHandler}>Book Now</button>
                        <img src={Turnkeyproject} alt="Turn Key projects" className='w-[calc(65%)] h-96 rounded-md' />
                    </motion.div>
                </div>
            </div>
        </Container>
    )
}

export default Vastu;