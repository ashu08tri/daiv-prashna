import { useState,useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import FormModal from '../components/FormModal';
import Container from '../components/Container';
import yearly from '../assets/images/yearly Shraddha.png';
import quarterly from '../assets/images/quarterly Shraddha.png';
import monthly from '../assets/images/monthly Shraddha.png';
import shloka from '../assets/images/Introduction shloka of Shraddha.png';

function Shradha() {
    const [modal, setModal] = useState(false);
    const [shraddha, setShraddha] = useState('');
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
        setShraddha(e.target.nextSibling.alt)
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
           <h1 className='text-4xl md:text-5xl text-custom-yellow mt-8 mb-12'>Shraddha</h1>
           <div></div>
           </div>
           <div className='absolute'>
                    <AnimatePresence>
                        {modal && <FormModal title={'Shraddha'} onClose={modalHandler} listClose={modalHandler} ShraddhaType={shraddha} />}
                    </AnimatePresence>
                </div>
           <div className='flex justify-center text-custom-yellow font-semibold'>
            <div className='w-3/4 leading-relaxed flex flex-col items-center'>
            <img src={shloka} alt="shloka" className='w-full'/>
            <p className='py-4'>
            The above shloka elucidates that sacrifices and offerings made to ancestors are known as Shraddha. In Manusmriti, Shraddha is also referyellow to as "Pitra yagya." The term "Shraddha" itself is derived from "Shraddha," which signifies reverence, emphasizing that pleasing the almighty can only be achieved through reverence. The Bhramavayvartaka highlights the necessity of performing "Pitra yagya" before every divine activity. This is why the Nandi Shraddha is conducted in Indian tradition even before marriage ceremonies. It is evident that to secure a harmonious future, it is essential for all individuals to perform Pitra yagya at some point in their lives.
            </p>
            </div>
           </div>
           <h2 className='text-center text-3xl md:text-4xl text-custom-yellow my-12'>Shraddhas</h2>
                <div className='flex flex-col md:flex-row justify-between px-4 my-4' id='yearlyshraddha'>
                    <motion.div initial={{x: -30, opacity: 0}} whileInView={{x: 0, opacity: 1, transition: {delay: .2, duration: .3, type: 'spring'}}} viewport={{once: true, amount: 'all'}} className='md:w-1/2 flex flex-col justify-center items-center'>
                        <h1 className='text-custom-yellow text-3xl font-bold my-8 word tracking-widest'>Yearly Shraddha</h1>
                        <p className='text-left text-custom-yellow-dark md:pl-9'>The Yearly Ancestral Pooja is a significant ritual that is performed to pay homage to our forefathers and seek their blessings. It is believed that performing this pooja can bring prosperity, peace, and harmony to the family. This pooja is usually conducted on the death anniversary of the deceased ancestors or during the Pitru Paksha period, which is a fortnight dedicated to ancestral worship as per the Hindu calendar. During the pooja, offerings such as food, flowers, and other household items are made to the ancestors, followed by chanting of mantras and performing of aarti. The Yearly Ancestral Pooja is seen as a way of expressing gratitude to our ancestors for their blessings, seeking their continued guidance, and ensuring their well-being in the afterlife. By performing this pooja with devotion and sincerity, one can cultivate a deeper connection with their ancestors and experience a greater sense of spiritual fulfillment and contentment.</p>
                    </motion.div>
                    <motion.div initial={{x: 30, opacity: 0}} whileInView={{x: 0, opacity: 1, transition: {delay: .2, duration: .3, type: 'spring'}}} viewport={{once: true, amount: 'all'}} className='relative order-first md:order-2 md:w-1/2 flex justify-center md:justify-center'>
                        <button className='absolute top-80 text-white bg-custom-maroon px-5 py-3 rounded-md' onClick={modalHandler}>Book Now</button>
                        <img src={yearly} alt="Yearly Shraddha" className='w-[calc(65%)] h-96 rounded-md' />
                    </motion.div>
                </div>

                <div className='flex flex-col md:flex-row justify-between px-4 mt-8' id='quaterlyshraddha'>
                    <motion.div initial={{x: 30, opacity: 0}} whileInView={{x: 0, opacity: 1, transition: {delay: .2, duration: .3, type: 'spring'}}} viewport={{once: true, amount: 'all'}} className='md:w-1/2 flex flex-col justify-center items-center'>
                        <h1 className='text-custom-yellow text-3xl font-bold my-8 text-center word tracking-widest'>Shraddha at Gaya <span className='text-xl'>(Quaterly Shraddha)</span></h1>
                        <p className='text-left text-custom-yellow-dark md:pr-9'>Shraddha at Gaya, Bihar, holds immense significance in Hindu tradition as it is believed to be a sacred place where performing rituals for ancestors can bring their souls peace and liberation. Gaya is renowned for the Pind Daan ceremony, a ritual where offerings are made to ancestors to free them from the cycle of birth and death. Many people undertake the journey to Gaya to perform Shraddha rituals during auspicious times such as Pitru Paksha. The rituals at Gaya involve bathing in the sacred Falgu River, offering pindas (rice balls) to ancestors, and seeking their blessings for the well-being of the family. Performing Shraddha at Gaya is considered a profound and spiritually fulfilling experience that allows individuals to honor their ancestors and ensure their eternal peace and happiness in the afterlife.</p>
                    </motion.div>
                    <motion.div initial={{x: -30, opacity: 0}} whileInView={{x: 0, opacity: 1, transition: {delay: .2, duration: .3, type: 'spring'}}} viewport={{once: true, amount: 'all'}} className='relative order-first md:w-1/2 flex justify-center md:justify-center'>
                        <button className='absolute top-80 text-white bg-custom-maroon px-5 py-3 rounded-md' onClick={modalHandler}>Book Now</button>
                        <img src={quarterly} alt="Quaterly Shraddha" className='w-[calc(65%)] h-96 rounded-md' />
                    </motion.div>
                </div>

                <div className='flex flex-col md:flex-row justify-between px-4 my-4' id='monthlyshraddha'>
                    <motion.div initial={{x: -30, opacity: 0}} whileInView={{x: 0, opacity: 1, transition: {delay: .2, duration: .3, type: 'spring'}}} viewport={{once: true, amount: 'all'}} className='md:w-1/2 flex flex-col justify-center items-center'>
                        <h1 className='text-custom-yellow text-3xl text-center font-bold my-8 word tracking-widest'>Shraddha at Bhrama Kapal <br /><span className='text-xl'>(Monthly Shraddha)</span></h1>
                        <p className='text-left text-custom-yellow-dark md:pl-9'>Shraddha at Bhrama Kapal refers to the practice of performing last rites for deceased ancestors at the Bhrama Kapal ghat located along the banks of the holy river Ganges in Varanasi, India. This sacred ritual is believed to help the departed souls achieve liberation and facilitate their journey into the afterlife. Families gather at Bhrama Kapal to offer prayers, perform homa (fire offering), and release the ashes of their loved ones into the flowing waters of the Ganges. The atmosphere at Bhrama Kapal is filled with emotions of reverence, sorrow, and acceptance as people seek to honor their ancestors and seek blessings for their souls. It is a deeply spiritual and poignant experience that underscores the significance of ancestral worship in Indian culture.</p>
                    </motion.div>
                    <motion.div initial={{x: 30, opacity: 0}} whileInView={{x: 0, opacity: 1, transition: {delay: .2, duration: .3, type: 'spring'}}} viewport={{once: true, amount: 'all'}} className='relative order-first md:order-2 md:w-1/2 flex justify-center md:justify-center'>
                        <button className='absolute top-80 text-white bg-custom-maroon px-5 py-3 rounded-md' onClick={modalHandler}>Book Now</button>
                        <img src={monthly} alt="Monthly Shraddha" className='w-[calc(65%)] h-96 rounded-md' />
                    </motion.div>
                </div>
            </div>
        </Container>
    )
}

export default Shradha;