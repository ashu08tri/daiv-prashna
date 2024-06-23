import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import consultancy from '../assets/images/consultancy.png';
import horoscope from '../assets/images/horoscope.png';
import shraddha from '../assets/images/shraddha.png';
import vastu from '../assets/images/vastu.png';
import yoga from '../assets/images/yoga.png';
import pooja from '../assets/images/Vedic  Pooja.png';


const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

function Carousal() {
    return (
        <>
            <div className='h-[calc(72vh)] md:h-[calc(85vh)] flex flex-col items-center mt-4'>
                <h1 className='text-center text-4xl py-6 font-bold text-custom-ivory'>Our Services</h1>
                <div className='h-full w-[calc(90vw)] pl-2 flex justify-center'>
                    <div className='w-[calc(90%)] md:w-full'>
                    <Carousel
                        responsive={responsive}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={3000}
                        transitionDuration={500}

                    >
                        <div className='mr-2 p-2 bg-custom-ivory flex flex-col items-center rounded-md'>
                            <img src={yoga} alt="yoga" className='w-full h-64 md:h-72 rounded-t-md shadow-lg' />
                            <h2 className='py-1 text-xl md:text-2xl font-semibold'>Yoga</h2>
                            <p className='py-2'>Learn Proven Techniques and Practices</p>
                            <Link to='yoga' className='px-3 py-2 bg-custom-maroon text-custom-ivory rounded-lg my-3 active:scale-95'>View Details</Link>
                        </div>
                        <div className='mr-2 p-2 bg-custom-ivory flex flex-col items-center rounded-md'>
                            <img src={shraddha} alt="shraddha" className='w-full h-64 md:h-72 rounded-t-md shadow-lg' />
                            <h2 className='py-1 text-xl md:text-2xl font-semibold'>Shraddha (Ancestral Rites )</h2>
                            <p className='py-2'>Learn Proven Techniques and Practices</p>
                            <Link to='shraddha' className='px-3 py-2 bg-custom-maroon text-custom-ivory rounded-lg my-3 active:scale-95'>View Details</Link>
                        </div>
                        <div className='mr-2 p-2 bg-custom-ivory flex flex-col items-center rounded-md'>
                            <img src={pooja} alt="yogaimg" className='w-full h-64 md:h-72 rounded-t-md shadow-lg' />
                            <h2 className='py-1 text-xl md:text-2xl font-semibold'>Vedic Pooja</h2>
                            <p className='py-2'>Learn Proven Techniques and Practices</p>
                            <Link to='pooja' className='px-3 py-2 bg-custom-maroon text-custom-ivory rounded-lg my-3 active:scale-95'>View Details</Link>
                        </div>
                        <div className='mr-2 p-2 bg-custom-ivory flex flex-col items-center rounded-md'>
                            <img src={vastu} alt="vastu" className='w-full h-64 md:h-72 rounded-t-md shadow-lg' />
                            <h2 className='py-1 text-xl md:text-2xl font-semibold'>Vastu-Shastra</h2>
                            <p className='py-2'>Learn Proven Techniques and Practices</p>
                            <Link to='vastu' className='px-3 py-2 bg-custom-maroon text-custom-ivory rounded-lg my-3 active:scale-95'>View Details</Link>
                        </div>
                        <div className='mr-2 p-2 bg-custom-ivory flex flex-col items-center rounded-md'>
                            <img src={horoscope} alt="horoscope" className='w-full h-64 md:h-72 rounded-t-md shadow-lg' />
                            <h2 className='py-1 text-xl md:text-2xl font-semibold'>Astrology</h2>
                            <p className='py-2'>Learn Proven Techniques and Practices</p>
                            <Link to='astrology' className='px-3 py-2 bg-custom-maroon text-custom-ivory rounded-lg my-3 active:scale-95'>View Details</Link>
                        </div>
                        <div className='mr-2 p-2 bg-custom-ivory flex flex-col items-center rounded-md'>
                            <img src={consultancy} alt="consultancy" className='w-full h-64 md:h-72 rounded-t-md shadow-lg' />
                            <h2 className='py-1 text-xl md:text-2xl font-semibold'>Disease Consultancy</h2>
                            <p className='py-2'>Learn Proven Techniques and Practices</p>
                            <Link to='astrology' className='px-3 py-2 bg-custom-maroon text-custom-ivory rounded-lg my-3 active:scale-95'>View Details</Link>
                        </div>
                    </Carousel>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Carousal