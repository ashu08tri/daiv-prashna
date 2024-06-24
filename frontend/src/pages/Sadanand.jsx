import { motion } from "framer-motion";


function Sadanand() {
  
  return (
    <>
    <motion.div initial={{width: '100vw', height: '100vh', borderRadius: 0, transformOrigin: 'center'}}
    animate={{width: 0, height: 0, borderRadius: '100%', transformOrigin: 'center'}}
    transition={{duration: .5, ease: 'easeInOut'}}
    className='absolute top-1/2 left-1/2 bg-custom-ivory z-40 -translate-x-2/4 -translate-y-2/4'>
    </motion.div>
    <div className="flex flex-col justify-center items-center">
      <div className="w-[calc(90vw)] bg-custom-ivory h-screen">
      <h1 className="text-2xl md:text-4xl text-center my-4 font-semibold text-custom-maroon">Mysticism & Sadanand</h1>
      <p className="text-xl md:text-3xl text-left my-10 text-custom-yellow px-12">Mysticism is said to begin with the activation of Vishuddha chakra, also known as the throat chakra. This fifth primary chakra, according to Hindu and Buddhist traditions, is located in the throat region and governs self-expression as well as provides control over involuntary natural bodily functions. When activated, this chakra helps raise the Kundalini further upward, bringing one closer to Sadanand, or complete bliss. The manifestations of this activation are often referred to as mysticism, resulting in unique effects and events.</p>
      </div>
    </div>
    </>
  )
}

export default Sadanand;