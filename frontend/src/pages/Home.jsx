import '../App.css'
import { useState } from "react";
import Hero from "../components/Hero";
import Carousal from "../components/Carousal";
import Example from "../components/Example";
import { motion } from "framer-motion";

function Home() {
  const [pathName,setPathName] = useState('')

  const getPath = (data) => {
    setPathName(data)
  }

  const exitAnimation = pathName === 'lineage' || pathName === 'mission' || pathName === 'sadanand' ?
  {width: '99vw', height: '100vh', borderRadius: 0, transformOrigin: 'center'} : { opacity: 0, x: -100 }


  return (
    <>
    <motion.div className='absolute top-1/2 left-1/2 bg-custom-ivory z-40 -translate-x-2/4 -translate-y-2/4'
            animate={{width: 0, height: 0, borderRadius: '100%', transformOrigin: 'center'}}
            exit={exitAnimation}
            transition={{duration: .5, ease: 'easeInOut'}}
      />
      <motion.div exit={exitAnimation} className="flex flex-col items-center">
        <div className="shadow-2xl bg-gradient-to-t from-custom-yellow to-custom-maroon">
          <motion.div initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .5 }}>
            <Hero onGetPath={getPath} />
            <Carousal />
          </motion.div>
        </div>
        <div className="bg-custom-yellow h-14 w-[calc(90vw)] skew-bottom-right">

        </div>
        <div className="w-[calc(90vw)] bg-custom-ivory pt-5">
          <Example />
        </div>
      </motion.div>
    </>
  )
}

export default Home