import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import FormModal from '../components/FormModal';
import Container from '../components/Container';
import growth from '../assets/images/Pooja for growth.png';
import mentalhealth from '../assets/images/pooja for mental peace.png';
import wellbeing from '../assets/images/Yearly Pooja for wellbeing.png';
import obstacles from '../assets/images/pooja for overcoming obstacles.png';
import reversingnegativity from '../assets/images/pooja for reversing negativity.png';



function Pooja() {
    const [modal, setModal] = useState(false);
    const [pooja, setPooja] = useState('');
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
        setPooja(e.target.nextSibling.alt)
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
           <h1 className='text-4xl md:text-5xl text-custom-yellow mt-8 mb-12'>Pooja</h1>
           <div></div>
           </div>
           <div className='absolute'>
                    <AnimatePresence>
                        {modal && <FormModal title={'Pooja Services'} onClose={modalHandler} listClose={modalHandler} PoojaType={pooja} />}
                    </AnimatePresence>
                </div>
           <div className='flex justify-center text-custom-yellow font-semibold'>
            <div className='w-3/4 leading-relaxed text-left'>
            <p className='py-2'>
            The essence of the word "puja" has been explored by humans since ancient times, leading to various worship practices aimed at connecting with the divine. Puja can take three primary forms: it may involve sitting down and reciting hymns, performing a fire sacrifice, or offering water (tarpan). The tarpan ritual is often dedicated to ancestors, who are considered integral to our daily worship.
            </p>
            <p className='hidden md:block py-2'>
            It is crucial to understand that excessive puja may not be beneficial in today's context, as these rituals evolved centuries ago and may not align with modern dynamics. At Daivprashna, we recognize your spiritual needs and recommend the most suitable puja practices in today's context. We tailor our suggestions based on your specific goals and requirements, ensuring that the rituals resonate with your contemporary lifestyle and aspirations.
            </p>
            </div>
           </div>
           <h2 className='text-center text-3xl md:text-4xl text-custom-yellow my-12'>Pooja Services</h2>
                <div className='flex flex-col md:flex-row justify-between px-4 my-4' id='poojaforgrowth'>
                    <motion.div initial={{x: -30, opacity: 0}} whileInView={{x: 0, opacity: 1, transition: {delay: .2, duration: .3, type: 'spring'}}} viewport={{once: true, amount: 'all'}} className='md:w-1/2 flex flex-col justify-center items-center'>
                        <h1 className='text-custom-yellow text-3xl font-bold my-8 tracking-widest'>Pooja For Growth</h1>
                        <p className='text-left text-custom-yellow-dark md:pl-9'>It's true that all stagnant things can deteriorate unless one learns how to manage stagnation effectively. In the context of today's fast-paced world, the pooja suggestions we offer are designed to act as boosters for your success and personal growth. By understanding your fundamental needs and aspirations, we prescribe pooja practices that can serve as catalysts for positive energy and progress in your life. Our approach is tailored to your individual circumstances, aiming to provide support and alignment for your modern, dynamic lifestyle.</p>
                    </motion.div>
                    <motion.div initial={{x: 30, opacity: 0}} whileInView={{x: 0, opacity: 1, transition: {delay: .2, duration: .3, type: 'spring'}}} viewport={{once: true, amount: 'all'}} className='relative order-first md:order-2 md:w-1/2 flex justify-center md:justify-center'>
                        <button className='absolute top-80 text-white bg-custom-maroon px-5 py-3 rounded-md' onClick={modalHandler}>Book Now</button>
                        <img src={growth} alt="Pooja For Growth" className='w-[calc(65%)] h-96 rounded-md' />
                    </motion.div>
                </div>

                <div className='flex flex-col md:flex-row justify-between px-4 mt-8' id='poojaforovercomingobstacles'>
                    <motion.div initial={{x: 30, opacity: 0}} whileInView={{x: 0, opacity: 1, transition: {delay: .2, duration: .3, type: 'spring'}}} viewport={{once: true, amount: 'all'}} className='md:w-1/2 flex flex-col justify-center items-center'>
                        <h1 className='text-custom-yellow text-3xl font-bold my-8 tracking-widest'>Pooja for Overcoming Obstacles</h1>
                        <p className='text-left text-custom-yellow-dark md:pr-9'>These pooja procedures aim at making you " Apavighna" which means without obstacles.</p>
                    </motion.div>
                    <motion.div initial={{x: -30, opacity: 0}} whileInView={{x: 0, opacity: 1, transition: {delay: .2, duration: .3, type: 'spring'}}} viewport={{once: true, amount: 'all'}} className='relative order-first md:w-1/2 flex justify-center md:justify-center'>
                        <button className='absolute top-80 text-white bg-custom-maroon px-5 py-3 rounded-md' onClick={modalHandler}>Book Now</button>
                        <img src={obstacles} alt="Pooja for Overcoming Obstacles" className='w-[calc(65%)] h-96 rounded-md' />
                    </motion.div>
                </div>

                <div className='flex flex-col md:flex-row justify-between px-4 my-4' id='poojaforreversingnegativeenergies'>
                    <motion.div initial={{x: -30, opacity: 0}} whileInView={{x: 0, opacity: 1, transition: {delay: .2, duration: .3, type: 'spring'}}} viewport={{once: true, amount: 'all'}} className='md:w-1/2 flex flex-col justify-center items-center'>
                        <h1 className='text-custom-yellow text-3xl font-bold my-8 tracking-widest'>Pooja for Reversing Negative Energies</h1>
                        <p className='text-left text-custom-yellow-dark md:pl-9'>Negative energies can impact our well-being and prevent us from achieving our goals, which is why pooja for reversing negative energies is essential. This type of pooja aims to eliminate negative vibrations from our environment and replace them with positive energy. During this pooja, mantras are recited and rituals performed to remove negative energy and bring in positive energy. The primary goal is to seek divine intervention for reversing any harmful effects of negative energy and to restore balance and harmony in our lives. By performing this pooja, we can combat negative influences and create a more positive, peaceful, and prosperous life for ourselves.</p>
                    </motion.div>
                    <motion.div initial={{x: 30, opacity: 0}} whileInView={{x: 0, opacity: 1, transition: {delay: .2, duration: .3, type: 'spring'}}} viewport={{once: true, amount: 'all'}} className='relative order-first md:order-2 md:w-1/2 flex justify-center md:justify-center'>
                        <button className='absolute top-80 text-white bg-custom-maroon px-5 py-3 rounded-md' onClick={modalHandler}>Book Now</button>
                        <img src={reversingnegativity} alt="Pooja for Reversing Negative Energies" className='w-[calc(65%)] h-96 rounded-md' />
                    </motion.div>
                </div>

                <div className='flex flex-col md:flex-row justify-between px-4 pb-5 mt-8' id='poojaformentalpiece&happiness'>
                    <motion.div initial={{x: 30, opacity: 0}} whileInView={{x: 0, opacity: 1, transition: {delay: .2, duration: .3, type: 'spring'}}} viewport={{once: true, amount: 'all'}} className='md:w-1/2 flex flex-col justify-center items-center'>
                        <h1 className='text-custom-yellow text-3xl font-bold my-8 tracking-widest'>Pooja for Mental Piece & Happiness</h1>
                        <p className='text-left text-custom-yellow-dark md:pr-9'>Pooja for Mental Peace & Happiness is a sacred ritual performed to invoke positive energies and promote a sense of calmness and contentment within oneself. This pooja involves offering prayers and performing rituals to deities associated with mental well-being, such as Lord Shiva and Lord Vishnu, and seeking their blessings for a peaceful mind and overall happiness. The pooja includes chanting of mantras, lighting incense sticks, offering flowers, and performing aarti. It is believed that the vibrations created during the pooja purify the surroundings and help in clearing negative thoughts, thereby bringing mental serenity and inner joy. By dedicating time to this sacred practice, individuals can experience a stronger connection with their inner self, leading to improved mental health and a greater sense of harmony and happiness in life.</p>
                    </motion.div>
                    <motion.div initial={{x: -30, opacity: 0}} whileInView={{x: 0, opacity: 1, transition: {delay: .2, duration: .3, type: 'spring'}}} viewport={{once: true, amount: 'all'}} className='relative order-first md:w-1/2 flex justify-center md:justify-center'>
                        <button className='absolute top-80 text-white bg-custom-maroon px-5 py-3 rounded-md' onClick={modalHandler}>Book Now</button>
                        <img src={mentalhealth} alt="Pooja for Mental Piece & Happiness" className='w-[calc(65%)] h-96 rounded-md' />
                    </motion.div>
                </div>

                <div className='flex flex-col md:flex-row justify-between px-4 my-4' id='yearlypoojaforoverallwell-being'>
                    <motion.div initial={{x: -30, opacity: 0}} whileInView={{x: 0, opacity: 1, transition: {delay: .2, duration: .3, type: 'spring'}}} viewport={{once: true, amount: 'all'}} className='md:w-1/2 flex flex-col justify-center items-center'>
                        <h1 className='text-custom-yellow text-3xl font-bold my-8 tracking-widest'>Yearly Pooja for overall well-being</h1>
                        <p className='text-left text-custom-yellow-dark md:pl-9'>The Yearly Pooja for overall well-being is a significant and auspicious ritual that aims to garner blessings for health, prosperity, and harmony throughout the year. This annual ceremony involves invoking the divine forces through prayers, offerings, and religious customs to seek protection from obstacles and negative influences. The pooja typically includes the worship of various deities, recitation of sacred hymns, and the performance of rituals that are believed to purify the environment and bring positive energy into the home or community. By conducting the Yearly Pooja, individuals and families reinforce their spiritual connection and express gratitude while seeking the benevolence of the divine for overall well-being, happiness, and success in all endeavors.</p>
                    </motion.div>
                    <motion.div initial={{x: 30, opacity: 0}} whileInView={{x: 0, opacity: 1, transition: {delay: .2, duration: .3, type: 'spring'}}} viewport={{once: true, amount: 'all'}} className='relative order-first md:order-2 md:w-1/2 flex justify-center md:justify-center'>
                        <button className='absolute top-80 text-white bg-custom-maroon px-5 py-3 rounded-md' onClick={modalHandler}>Book Now</button>
                        <img src={wellbeing} alt="Yearly Pooja for overall well-being" className='w-[calc(65%)] h-96 rounded-md' />
                    </motion.div>
                </div>
               
            </div>
        </Container>
    )
}

export default Pooja;