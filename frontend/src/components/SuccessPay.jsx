import namaste from '../assets/images/namaste.jpg'

function SuccessPay({desc,title}) {
  return (
<div class="bg-gray-100 absolute">
      <div class="bg-white p-6  md:mx-auto">
       <div className='flex justify-center'>
       <img src={namaste} alt="namaste" className='w-20 h-20'/>
       </div>
        <div class="text-center">
            <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">{title}</h3>
            <p class="text-gray-600 my-2">{desc}</p>
            <p> Have a great day!  </p>
            <div class="py-10 text-center">
                <a href="/" class="px-12 bg-custom-yellow hover:bg-custom-yellow-dark text-white font-semibold py-3">
                    GO BACK 
               </a>
            </div>
        </div>
    </div>
  </div>
  )
}

export default SuccessPay;