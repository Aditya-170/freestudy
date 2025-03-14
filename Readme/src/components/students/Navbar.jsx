import { assets } from './../../assets/assets';
import { Link } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

function Navbar() {
  const isCourseListpage = window.location.pathname === '/course-List';
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { navigate, isEducator } = useContext(AppContext);

  return (
    <div
      className={`flex w-full items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCourseListpage ? 'bg-white' : 'bg-cyan-50'
      }`}
    >
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
        className="w-28 lg:w-32 cursor-pointer"
      />

      {/* Right Section (Educator Dashboard + Enrollments + User Button) */}
      <div className="flex items-center gap-5 text-gray-500 ml-auto">
        {/* Educator Dashboard & My Enrollments */}
        {user && (
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/educator')}>
              {isEducator ? 'Educator Dashboard' : 'Become Educator'}
            </button>
            | <Link to="/my-enrollments">My Enrollments</Link>
          </div>
        )}

        {/* User Button or Create Account */}
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={openSignIn}
            className="bg-blue-600 text-white px-5 py-2 rounded-full"
          >
            Create Account
          </button>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-5 text-gray-500">
        {user && (
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/educator')}>
              {isEducator ? 'Educator Dashboard' : 'Become Educator'}
            </button>
            | <Link to="/my-enrollments">My Enrollments</Link>
          </div>
        )}
        {user ? (
          <UserButton />
        ) : (
          <button onClick={openSignIn}>
            <img src={assets.user_icon} alt="User Icon" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
