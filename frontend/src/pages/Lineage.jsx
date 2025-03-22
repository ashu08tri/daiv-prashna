import { motion } from "framer-motion";
import img from '../assets/images/down-arrow.png';
import MaharishiMahatapaGyanganj from '../assets/images/Maharishi Mahatapa Gyan ganj.png';
import ShriMahamukhopadhayaGopinathKaviraj from '../assets/images/Shri Mahamukhopadhaya Gopinath Kaviraj.png';
import ShriNeelkanthShastry from '../assets/images/Shri Neelkanth Shastry.png';
import ShriVisshudhanandparamhansa from '../assets/images/Shri Visshudhanand paramhansa.png';

function Lineage() {
  return (
    <>
      {/* Initial animation on page load */}
      <motion.div
        initial={{ width: '100vw', height: '100vh', borderRadius: 0, transformOrigin: 'center' }}
        animate={{ width: 0, height: 0, borderRadius: '100%', transformOrigin: 'center' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className='absolute top-1/2 left-1/2 bg-custom-ivory z-40 -translate-x-2/4 -translate-y-2/4'>
      </motion.div>

      <div className="flex flex-col justify-center items-center px-4 md:px-8">
        <div className="w-full max-w-6xl bg-custom-ivory py-10 px-6 md:px-12 rounded-lg shadow-lg">
          <h1 className="text-3xl md:text-5xl text-center font-bold text-custom-maroon mb-8">
            Lineage
          </h1>

          {/* Lineage Items */}
          {[ 
            {
              image: MaharishiMahatapaGyanganj,
              title: "Shri Maharishi Matapa (Gyanganj Ashram, Tibet)",
              description: "Shri Maharishi Matapa is a revered spiritual figure associated with Gyanganj, an ethereal ashram believed to be located in the remote Himalayan regions of Tibet. Gyanganj, often referred to as Siddhashram or the Land of Immortals, is considered a celestial realm where advanced yogis and sages engage in profound spiritual practices beyond the ordinary perception of time and space. The ashram is said to be hidden from ordinary human eyes, existing in a dimension accessible only to those with advanced spiritual attainment. Maharishi Matapa, along with other adept spiritual masters, is believed to reside in this mystical abode, guiding humanity's spiritual evolution from this transcendental plane."
            },
            {
              image: ShriVisshudhanandparamhansa,
              title: "Shri Vishuddhanand Paramahansa (Gyanganj & Varanasi)",
              description: "Shri Vishuddhanand Paramahansa, affectionately known as Gandha Baba, was born on March 14, 1853, in Bondul village, Bardhaman, Bengal. From a young age, he exhibited deep spiritual inclinations, engaging in daily worship of deities such as Maa Kali, Shiva, and Shyam Sundar alongside his mother. Under the guidance of his guru, Paramhansa Swami Nemananda Ji, he spent twelve years in intense spiritual practice at Gyanganj, immersing himself in meditation and yogic disciplines. During his time at Gyanganj, he acquired profound spiritual powers, which he later utilized for the welfare of humanity. After returning, he established ashrams in various locations, including Bondul, Bardhaman, Puri, Varanasi, and Kolkata, where he continued his spiritual mission until his passing in 1937."
            },
            {
              image: ShriMahamukhopadhayaGopinathKaviraj,
              title: "Shri Gopinath Kaviraj (Varanasi)",
              description: "Born on September 7, 1887, in Dhamrai, East Bengal (now Bangladesh), Gopinath Kaviraj emerged as a distinguished Sanskrit scholar and philosopher. Orphaned early in life, he pursued his education with unwavering dedication, earning his master's degree in Sanskrit in 1913. His academic journey led him to Varanasi, where he served as the Principal of the Government Sanskrit College from 1923 to 1937. Beyond academia, Kaviraj was deeply involved in spiritual practices, contributing significantly to the dissemination of esoteric knowledge. His scholarly works, including research on Tantra, earned him the Sahitya Akademi Award in 1964 and the Padma Vibhushan in 1965, solidifying his legacy as a luminary in the field of Indology. "
            },
            {
              image: ShriNeelkanthShastry,
              title: "Shri Neelkanth Shastry (Varanasi)",
              description: "Shri Neelkanth Shastry was a renowned scholar and spiritual practitioner based in Varanasi, India. He gained prominence for his expertise in astrology, palmistry, Tantra, and Vedic sadhana. Operating from his establishment, Jyotish Gaveshanagar, he provided astrological consultations, offering insights into individuals' past, present, and future.Devotees and seekers would visit him, often experiencing profound clarity and guidance through his readings. His deep understanding of ancient scriptures and spiritual practices made him a respected figure in the spiritual community of Varanasi, leaving a lasting impact on those who sought his wisdom."
            },
          ].map((item, index) => (
            <div key={index} className="relative">
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1, transition: { delay: 0.3, duration: 0.5, ease: 'easeIn' }}}
                viewport={{ once: true, amount: 'all' }}
                className={`flex flex-col md:flex-row ${index % 2 === 1 ? "md:flex-row-reverse" : ""} items-center gap-8 my-12`}
              >
                <img src={item.image} alt={item.title} className="w-64 h-64 object-cover rounded-lg shadow-md" />
                <div className="max-w-2xl text-center md:text-left">
                  <h2 className="text-2xl text-custom-yellow font-bold mb-4">{item.title}</h2>
                  <p className="text-custom-yellow text-lg leading-relaxed">{item.description}</p>
                </div>
              </motion.div>

              {/* Arrow Divider */}
              {index < 4 && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4, ease: 'easeIn' }}}
                  viewport={{ once: true, amount: 'all' }}
                  className="flex justify-center my-8"
                >
                  <img src={img} alt="Arrow" className="w-8 md:w-10" />
                </motion.div>
              )}
            </div>
            
          ))}

          {/* Last Person Without Image */}
          <motion.div
            initial={{ y: -30 }}
            whileInView={{ y: 0, opacity: 1, transition: { delay: 0.3, duration: 0.5, ease: 'easeIn' }}}
            viewport={{ once: true, amount: 'all' }}
            id="founder"
          >
            <h2 className="text-2xl text-custom-yellow font-bold text-center py-2">Shri Alok Anand Tripathi</h2>
            <p className="text-custom-yellow text-lg leading-relaxed max-w-2xl mx-auto">
            Alok Anand Tripathi better known as Pandit Ji, the founder of Daiv-Prashna, is a distinguished figure in the world of Vedic astrology and spiritual guidance. With 18 years of experience, Alok has built a reputation as a mystical astrologer, renowned not only for his expertise but also for his deep commitment to social service and his rich guru lineage. His practice is a rare fusion of ancient astrological wisdom and a heartfelt desire to help individuals from all walks of life.
            </p>
            <p className="text-custom-yellow text-lg leading-relaxed max-w-2xl mx-auto">
            Pandit Ji's social service is a cornerstone of his work. For over 15 years, he has been offering free consultations to individuals of all castes and financial backgrounds, ensuring that astrology and spiritual guidance are accessible to everyone. His unwavering belief in using astrology as a tool for uplifting society has led him to serve thousands of people, particularly those in need of clarity and guidance but without the means to afford traditional services. Pandit Ji's philosophy is rooted in the understanding that spiritual insight should transcend material boundaries, aiming to create a positive impact on the lives of the less privileged.
            </p>
            <p className="text-custom-yellow text-lg leading-relaxed max-w-2xl mx-auto">Pandit Ji's unique ability to blend mystical knowledge of astrology with practical guidance is what sets him apart. His method of Manual Vedic Horoscope Making, using over 102 years of Vedic penchant data, is mystical in nature, drawing on centuries-old wisdom. His intuitive ability to craft horoscopes and offer precise predictions by simply observing a person’s appearance, caste, and financial status speaks to his profound connection with the spiritual and astrological realms. It is this depth of knowledge that allows Alok to provide accurate and life-changing predictions for his clients, helping them navigate personal and professional challenges with newfound clarity.</p>
            <p className="text-custom-yellow text-lg leading-relaxed max-w-2xl mx-auto">At the heart of Pandit Ji's practice lies his guru lineage, which is an essential part of his spiritual identity. He is a direct disciple of Shree Neelkanth Shastri, one of the foremost Vedic scholars and astrologers. His guru, Shree Neelkanth Shastri, was a disciple of Shri Gopinath Kaviraj, who was in turn a direct disciple of the legendary Shri Vishuddhanand Paramhansa, the enlightened sage who consecrated the Nav Mundi Asan in Varanasi. This unbroken chain of spiritual masters provides Alok with a rich and sacred legacy, offering him access to powerful, time-honored wisdom that has been passed down through generations.</p>
            <p className="text-custom-yellow text-lg leading-relaxed max-w-2xl mx-auto">Through his deep connection to this sacred lineage, Alok inherits not only knowledge but a spiritual responsibility to guide others. His teachings and astrological practices are rooted in the profound insights shared by these great masters, and he continues to preserve and pass on this mystical knowledge through his work at Daiv-Prashna.</p>
            <p className="text-custom-yellow text-lg leading-relaxed max-w-2xl mx-auto">In addition to his spiritual and astrological work, Alok is an accomplished entrepreneur, owning GGC Clothing Company and Nivesh Jano. His entrepreneurial ventures reflect his versatile nature, but it is his dedication to social service and spiritual enlightenment that truly defines his legacy.</p>
            <p className="text-custom-yellow text-lg leading-relaxed max-w-2xl mx-auto">Alok Anand Tripathi’s vision for Daiv-Prashna is to offer spiritual guidance and astrological wisdom to a global audience, with a focus on uplifting individuals through both practical advice and spiritual transformation. Through his unwavering commitment to service, mystical knowledge, and deep spiritual roots, Alok continues to make a lasting impact on the lives of those he serves.</p>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Lineage;
