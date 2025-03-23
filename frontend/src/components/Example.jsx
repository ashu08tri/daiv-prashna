import Bannerforwebsite from '../assets/images/Banner for website.png';
import logo from '../assets/images/logo_bottom.png';
import TabsComponent from './Tab';

function Example() {
  return (
    <div className='flex flex-col gap-4 bg-custom-ivory'>
      
      {/* Banner Section */}
      <div className='flex justify-center bg-custom-ivory'>
        <img src={Bannerforwebsite} alt="Bannerforwebsite" className='w-3/4' />
      </div>

      {/* Tabs Section */}
      <div className='pb-4'>
        <TabsComponent />
      </div>

      {/* Logo Section - Fix Applied */}
      <div className='relative h-96 border-t flex justify-center items-center overflow-hidden'>
        <img 
          src={logo} 
          alt='logo' 
          className='absolute h-[700px] w-auto object-cover'
        />
      </div>

    </div>
  );
}

export default Example;
