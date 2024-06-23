import Bannerforwebsite from '../assets/images/Banner for website.png';
import logo from '../assets/images/logo.png';

function Example() {
  return (
    <div className='flex flex-col gap-4 bg-custom-ivory'>
        <div className='flex justify-center bg-custom-ivory'>
        <img src={Bannerforwebsite} alt="Bannerforwebsite" className='w-3/4'/>
        </div>

    <div className='text-center h-96 border-t'>
        <img src={logo} alt='logo' className='h-96 w-full'/>
    </div>
    </div>
  )
}

export default Example;