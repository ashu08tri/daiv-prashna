import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FormModal from './FormModal';

function ServiceList({ onClose }) {

    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('Yoga')


    const modalHandler = (e) => {
        setIsOpen(!isOpen);
        setTitle(e.target.innerText)
    }

    const listVarient = {
        closed: {
            x: 20
        },
        opened: {
            x: 0,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.15,
                type: 'ease-in'
            }
        }
    }

    const itemListVarient = {
        closed: {
            x: 20,
            opacity: 0
        },
        opened: {
            x: 0,
            opacity: 1
        }
    }
    return (
        <>
            <div className='w-56 h-72 bg-transparent flex absolute top-28 z-50'>
                <motion.ul className='flex flex-col gap-4 text-white' variants={listVarient}
                    initial='closed'
                    animate='opened'
                    exit='closed'>
                    <motion.li className='p-2 rounded-lg bg-custom-yellow cursor-pointer hover:bg-custom-yellow-dark' variants={itemListVarient} onClick={modalHandler}>Yoga</motion.li>
                    <motion.li className='p-2 rounded-lg bg-custom-yellow cursor-pointer hover:bg-custom-yellow-dark' variants={itemListVarient} onClick={modalHandler}>Pooja Services</motion.li>
                    <motion.li className='p-2 rounded-lg bg-custom-yellow cursor-pointer hover:bg-custom-yellow-dark' variants={itemListVarient} onClick={modalHandler}>Astrology Consultancy</motion.li>
                    <motion.li className='p-2 rounded-lg bg-custom-yellow cursor-pointer hover:bg-custom-yellow-dark' variants={itemListVarient} onClick={modalHandler}>Corporate Consultancy</motion.li>
                </motion.ul>
            </div>

            <div className='absolute top-20 right-14'>
                <AnimatePresence>
                    {isOpen && <FormModal title={title} onClose={modalHandler} listClose={onClose} state={isOpen} />}
                </AnimatePresence>
            </div>
        </>

    )
}

export default ServiceList;