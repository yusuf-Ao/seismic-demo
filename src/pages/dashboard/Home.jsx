import { useState } from 'react';
import { avatar } from '../../assets';
import { useSelector } from 'react-redux';
import Project from './Project';
import Summary from './Summary';

const Home = () => {
  const [activeLink, setActiveLink] = useState('Summary');
  const { user } = useSelector((state) => state.auth);

  return (
    <div className='flex flex-col h-screen'>
      {/* Navigation Bar */}
      <nav className='bg-gray-800 p-4 flex items-center justify-between'>
        <div className='flex items-center space-x-4 text-white'>
          {['Summary', 'Projects'].map((item, index) => (
            <div
              onClick={() => setActiveLink(item)}
              className={`p-2 pb-0 cursor-pointer text-sm text-nowrap lg:text-lg ${
                activeLink === item ? 'text-blue-400 ' : 'hover:text-blue-300'
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        <div className='flex items-center space-x-4'>
          {activeLink === 'Projects' && user?.profile?.role == 'ADMIN' && (
            <button className='bg-blue-500 text-white px-6 py-2 rounded-md'>
              New Project
            </button>
          )}
          <div className=''>
            <img className='rounded-full border w-12 h-12' src={avatar} />
            <div className='text-stone-300 italic text-xs'>
              logged in as {user?.profile?.role}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className='flex-grow p-8 overflow-hidden'>
        {activeLink === 'Projects' && <Project />}
        {activeLink === 'Summary' && <Summary />}
      </main>
    </div>
  );
};

export default Home;
