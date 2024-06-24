import React from 'react';
import { motion } from 'framer-motion';


function Container({children}) {
  return (
    <motion.div 
    initial={{opacity: 0 , x: 100}}
    animate={{opacity: 1 , x: 0}}
    exit={{opacity:0, x: -100}} className='flex justify-center'>
        {children}
    </motion.div>
  )
}

export default Container;