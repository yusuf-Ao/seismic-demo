import React from 'react';
import { useSelector } from 'react-redux';

const ProjectCard = ({
  title,
  description,
  startDate,
  status,
  location,
  percentageDone,
}) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden flex flex-col w-[300px] h-[200px]'>
      {/* Header */}
      <div className='flex justify-between items-center px-4 py-3 border-b border-gray-200'>
        <h2 className='text-lg font-semibold'>{title}</h2>
        {user?.profile?.role == 'ADMIN' && (
          <div className='space-x-2 items-center relative'>
            <button className='text-gray-600 hover:text-gray-800'>
              <svg
                class='w-4 h-4 text-blue-800'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='m10.8 17.8-6.4 2.1 2.1-6.4m4.3 4.3L19 9a3 3 0 0 0-4-4l-8.4 8.6m4.3 4.3-4.3-4.3m2.1 2.1L15 9.1m-2.1-2 4.2 4.2'
                />
              </svg>
            </button>

            <button className='text-red-600 hover:text-red-800'>
              <svg
                class='w-4 h-4 text-red-600'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z'
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Body */}
      <div className='flex-1 px-4 py-2'>
        <p className='text-sm text-gray-600'>{description}</p>
        <div className='flex justify-between items-center pt-4'>
          <p className='text-xs text-gray-500'>Start Date: {startDate}</p>
          <p className='text-xs text-gray-500'>Status: {status}</p>
        </div>
        <p className='text-xs text-gray-500 mt-1'>Location: {location}</p>
      </div>
      {/* Progress Bar */}
      <div className='bg-gray-200 h-4'>
        <div
          className='h-full bg-green-500'
          style={{ width: `${percentageDone}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProjectCard;
