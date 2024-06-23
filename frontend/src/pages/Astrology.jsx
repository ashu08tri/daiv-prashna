import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import FormModal from '../components/FormModal';
import Container from '../components/Container';
import underprevi  from '../assets/images/Astrology for the underprevi.png';
import Newhoroscope  from '../assets/images/New horoscope.png';
import Existinghoroscope  from '../assets/images/Existing horoscope.png';
import Diseaseconsultancy  from '../assets/images/Disease related consultancy.png';

function Astrology() {
    const [modal, setModal] = useState(false);
    const [astrology, setAstrologyType] = useState("");
    const location = useLocation();

    const modalHandler = (e) => {
        setAstrologyType(e.target.nextSibling.alt)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        setModal(!modal);
    }

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <Container>
            <div className='border-t border-custom-yellow-dark bg-custom-ivory w-[calc(90vw)]'>
                <div className='flex flex-col md:flex-row items-center justify-between'>
                    <button onClick={modalHandler} className='bg-custom-yellow text-white px-4 py-2 hover:bg-custom-yellow-dark active:scale-90 rounded-b-md md:rounded-e-md md:rounded-l-none'>Book Session</button>
                    <h1 className='text-4xl md:text-5xl text-custom-yellow mt-8 mb-12'>Astrology</h1>
                    <div></div>
                </div>
                <div className='absolute top-36'>
                    <AnimatePresence>
                        {modal && <FormModal title={'Astrology Consultancy'} onClose={modalHandler} listClose={modalHandler} AstroType={astrology} />}
                    </AnimatePresence>
                </div>
                <div className='flex justify-center text-custom-yellow font-semibold'>
                    <div className='w-3/4 leading-relaxed text-left'>
                        <p className='py-2'>
                            In ancient scriptures, the practice of Daivprashna was developed and utilized for a diverse range of purposes such as calculating
                            astronomical data and predicting natural occurrences like rainfall, floods, and disasters. Rishi Bhrigu is acknowledged for employing
                            this science to forecast the past, present, and future of any individual. His work, the Bhrigu Samhita, is renowned for its intricate
                            compilation of all potential horoscopes that could exist in the universe, accompanied by specific predictions regarding past and future
                            events. However, Bhrigu entrusts the ultimate prediction of an individual's destiny to the discernment of the astrologer, who must
                            analyze the current circumstances of the seeker in order to provide meaningful insights.
                        </p>
                        <p className='hidden md:block py-2'>
                            This final point provides a more comprehensive understanding of the astrology process, emphasizing that an individual's current
                            circumstances play a crucial role in shaping their future, which cannot be predetermined. Now, the question arises: who is qualified
                            to answer a "DaivPrashna"? The Sanskrit term "DaivPrashna" combines "Daiv" and "Prashna," translating to "Fate" and "question,"
                            respectively. To predict fate, one must comprehend the purpose of an individual's existence, as their fate is the path leading to
                            their specific reason or goal. At Daivprashna, we analyze the underlying reasons before forecasting an individual's fate, and, most
                            importantly, we focus on providing solutions, which is more significant than simply predicting fate and leaving everything to luck and
                            chance.
                        </p>
                    </div>
                </div>
                <h2 className='text-center text-3xl md:text-4xl text-custom-yellow my-12'>Astrology Consultancy</h2>
                <div className='flex flex-col md:flex-row justify-between px-4 my-4' id='newhoroscope'>
                    <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1, transition: { delay: .2, duration: .3, type: 'spring' } }} viewport={{ once: true, amount: 'all' }} className='md:w-1/2 flex flex-col justify-center items-center'>
                        <h1 className='text-custom-yellow text-3xl font-bold my-8 word tracking-widest'>New Horoscope</h1>
                        <p className='text-custom-yellow-dark md:pl-9 text-left'>Our horoscope creation services combine traditional and computer techniques to produce authentic and accurate horoscopes. In-person consultations are available to answer specific questions, while we do not entertain general questions. We pride ourselves in providing personalized and precise insights into astrological matters to help individuals make informed decisions.</p>
                    </motion.div>
                    <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1, transition: { delay: .2, duration: .3, type: 'spring' } }} viewport={{ once: true, amount: 'all' }} className='relative order-first md:order-2 md:w-1/2 flex justify-center md:justify-center'>
                        <button className='absolute top-80 text-white bg-custom-maroon px-5 py-3 rounded-md' onClick={modalHandler}>Book Now</button>
                        <img src={Newhoroscope} alt="New Horoscope" className='w-[calc(65%)] h-96 rounded-md' />
                    </motion.div>
                </div>

                <div className='flex flex-col md:flex-row justify-between px-4 mt-8' id='existinghoroscopeanalysis'>
                    <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1, transition: { delay: .2, duration: .3, type: 'spring' } }} viewport={{ once: true, amount: 'all' }} className='md:w-1/2 flex flex-col justify-center items-center'>
                        <h1 className='text-custom-yellow text-3xl font-bold my-8 word tracking-widest'>Existing Horoscope analysis</h1>
                        <p className='text-left text-custom-yellow-dark md:pr-9'>Our services entail in-person consultations where we offer a thorough analysis of your horoscope, along with customized solutions to address your specific problems. We also provide guidance on future prospects and life goals, while employing scientifically-backed remedies to support and enhance your personal growth journey.</p>
                    </motion.div>
                    <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1, transition: { delay: .2, duration: .3, type: 'spring' } }} viewport={{ once: true, amount: 'all' }} className='relative order-first md:w-1/2 flex justify-center md:justify-center'>
                        <button className='absolute top-80 text-white bg-custom-maroon px-5 py-3 rounded-md' onClick={modalHandler}>Book Now</button>
                        <img src={Existinghoroscope} alt="Existing Horoscope analysis" className='w-[calc(65%)] h-96 rounded-md' />
                    </motion.div>
                </div>

                <div className='flex flex-col md:flex-row justify-between px-4 my-4' id='dieseaserelatedConsultancy'>
                    <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1, transition: { delay: .2, duration: .3, type: 'spring' } }} viewport={{ once: true, amount: 'all' }} className='md:w-1/2 flex flex-col justify-center items-center'>
                        <h1 className='text-custom-yellow text-3xl font-bold my-8 word tracking-widest'>Diesease Related Consultancy</h1>
                        <p className='text-left text-custom-yellow-dark md:pl-9'>This appointment is only scheduled for existing dieseases that a person has and need urgent guidence in either diagonis or cure.</p>
                        <span className='mt-10 text-custom-yellow-dark'>This service is not chargeble</span>
                    </motion.div>
                    <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1, transition: { delay: .2, duration: .3, type: 'spring' } }} viewport={{ once: true, amount: 'all' }} className='relative order-first md:order-2 md:w-1/2 flex justify-center md:justify-center'>
                        <button className='absolute top-80 text-white bg-custom-maroon px-5 py-3 rounded-md' onClick={modalHandler}>Book Now</button>
                        <img src={Diseaseconsultancy} alt="Diesease Related Consultancy" className='w-[calc(65%)] h-96 rounded-md' />
                    </motion.div>
                </div>

                <div className='flex flex-col md:flex-row justify-between px-4 pb-5 mt-8' id='astrologyfortheunderpriveledge'>
                    <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1, transition: { delay: .2, duration: .3, type: 'spring' } }} viewport={{ once: true, amount: 'all' }} className='md:w-1/2 flex flex-col justify-center items-center'>
                        <h1 className='text-custom-yellow text-3xl font-bold my-8 word tracking-widest'>Astrology for the underpriveledge</h1>
                        <p className='text-left text-custom-yellow-dark md:pr-9'>Astrology Should be accessible to everyone, including those who cannot afford to spend any money. Our Founder has dedicated over 15 years to serving such individuals, offering solutions that require minimal effort. We welcome anyone who may be constrained and unable to allocate even a single rupee towards addressing their problems, to schedule an appointment and seek assistance from us.</p>
                    </motion.div>
                    <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1, transition: { delay: .2, duration: .3, type: 'spring' } }} viewport={{ once: true, amount: 'all' }} className='relative order-first md:w-1/2 flex justify-center md:justify-center'>
                        <button className='absolute top-80 text-white bg-custom-maroon px-5 py-3 rounded-md' onClick={modalHandler}>Book Now</button>
                        <img src={underprevi} alt="Astrology for the underpriveledge" className='w-[calc(65%)] h-96 rounded-md' />
                    </motion.div>
                </div>
            </div>
        </Container>
    )
}

export default Astrology;