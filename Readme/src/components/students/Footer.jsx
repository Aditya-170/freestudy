import { assets } from './../../assets/assets';

function Footer() {
  return (
    <footer className="bg-gray-900 md:px-36 text-left w-full mt-10 text-gray-300">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30">
       
        <div className="flex flex-col md:items-start items-center w-full md:w-auto text-center md:text-left">
          <img src={assets.logo_dark} alt="logo" className="w-32 mb-4" />
          <p className="text-gray-400 max-w-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&rsquo;s standard dummy text.
          </p>
        </div>

       
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="text-gray-400 space-y-2">
            <li><a href="#" className="hover:text-blue-500">Home</a></li>
            <li><a href="#" className="hover:text-blue-500">About</a></li>
            <li><a href="#" className="hover:text-blue-500">Courses</a></li>
            <li><a href="#" className="hover:text-blue-500">Contact</a></li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-white">Contact</h3>
          <p className="text-gray-400">Email: support@example.com</p>
          <p className="text-gray-400">Phone: +123 456 7890</p>
        </div>
      </div>

      
      <p className="text-center text-gray-500 py-4">
        Copyright 2025 © GreatStack. All Rights Reserved.
      </p>
    </footer>
  )
}

export default Footer