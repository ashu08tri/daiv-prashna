import { motion } from "framer-motion";


function Mission() {
  
  return (
    <>
    <motion.div initial={{width: '100vw', height: '100vh', borderRadius: 0, transformOrigin: 'center'}}
    animate={{width: 0, height: 0, borderRadius: '100%', transformOrigin: 'center'}}
    transition={{duration: .5, ease: 'easeInOut'}}
    className='absolute top-1/2 left-1/2 bg-custom-ivory z-40 -translate-x-2/4 -translate-y-2/4'>
    </motion.div>
    <div className="flex flex-col justify-center items-center">
      <div className="w-[calc(90vw)] bg-custom-ivory h-screen px-3">
      <h1 className="text-2xl md:text-4xl my-4 font-semibold text-custom-maroon">Mission</h1>
      <p className="text-xl md:text-3xl my-10 text-custom-yellow">Anand to Sadanand - Uplifting your soul towards complete uninterrupted bliss" represents a profound spiritual journey from joy (Anand) to eternal happiness (Sadanand). This mission is about guiding individuals towards a higher state of consciousness, where one transcends the fleeting pleasures of the material world and experiences a lasting, profound sense of bliss that is uninterrupted and ever-present. The path from Anand to Sadanand involves cultivating inner peace, mindfulness, and spiritual practices that elevate the soul. It is a holistic approach, emphasizing meditation, self-realization, and detachment from worldly distractions.</p>
      <p className="text-xl md:text-3xl my-10 text-custom-yellow">Through this journey, one learns to align the body, mind, and spirit, allowing them to move beyond the limitations of ego and desires. The aim is to reach a state where bliss is not momentary but becomes a constant, integrated part of one's being. It is the realization that true happiness comes from within and that by connecting with the divine essence, one can experience an infinite state of Sadanand – a blissful state that is untouched by external circumstances. This mission seeks to uplift individuals, transforming their lives into a continuous flow of joy, peace, and spiritual fulfillment.
      </p>
      </div>
    </div>
    </>
  )
}

export default Mission;