import React from 'react';

function Footer() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.reload();
  };

  return (
    <footer className="bg-custom-maroon border-t border-custom-yellow-dark">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          <div>
            <h2 className="mb-6 text-sm text-custom-yellow uppercase font-bold">Help center</h2>
            <ul className="text-custom-ivory dark:text-custom-ivory font-medium">
              <li>
                <a href="/contact_us" className="hover:underline">Contact Us</a>
              </li>
              <li className='my-2'>
                <a href="/founder" className="hover:underline">Founder</a>
              </li>
              <li>
                {token ? (
                  <li className='flex flex-col items-start my-2'>
                    <a href="/admin" className="hover:underline">Admin</a>
                    <button onClick={handleLogout} className="hover:underline text-red-500 mt-2">
                      Logout
                    </button>
                  </li>
                ) : (
                  <a href="/admin" className="hover:underline">Admin</a>
                )}
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm text-custom-yellow uppercase font-bold">Legal</h2>
            <ul className="text-custom-ivory dark:text-custom-ivory font-medium">
              <li className="mb-4">
                <a href="/privacy_policy" className="hover:underline">Privacy Policy</a>
              </li>
              <li className="mb-4">
                <a href="/privacy_policy#term" className="hover:underline">Terms &amp; Conditions</a>
              </li>
              <li className="mb-4">
                <a href="/return_refund" className="hover:underline">Return &amp; Refund</a>
              </li>
              <li className="mb-4">
                <a href="/shipping" className="hover:underline">Shipping Policy</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="px-4 py-6 bg-custom-yellow md:flex md:items-center md:justify-between rounded-t-lg">
          <span className="text-base text-custom-maroon dark:text-custom-maroon sm:text-center font-bold">
            © 2024 <a href="https://flowbite.com/">Daiv-Prashna</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
            <a href="#" className="text-white">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
              </svg>
              {/* <span className="sr-only">Facebook page</span> */}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
