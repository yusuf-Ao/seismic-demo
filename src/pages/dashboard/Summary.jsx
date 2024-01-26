import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';

import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { ProjectData } from '../../data';

// Register the chart.js components required for the Doughnut chart
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  BarElement,
  Title
);

const Summary = () => {
  // Calculate analytics data
  const totalProjects = ProjectData.length;
  const inProgressProjects = ProjectData.filter(
    (project) => project.status === 'In Progress'
  ).length;
  const completedProjects = ProjectData.filter(
    (project) => project.status === 'Completed'
  ).length;
  const upcomingProjects = ProjectData.filter(
    (project) => project.status === 'Upcoming'
  ).length;

  const chartData = {
    labels: ['In Progress', 'Completed', 'Upcoming'],
    datasets: [
      {
        label: 'Projects',
        data: [inProgressProjects, completedProjects, upcomingProjects],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const inProgressPercentages = ProjectData.filter(
    (project) => project.status === 'In Progress'
  ).map((project) => project.percentageDone);

  const barChartData = {
    labels: ProjectData.filter(
      (project) => project.status === 'In Progress'
    ).map((project) => project.title),
    datasets: [
      {
        label: 'Percentage Done',
        data: inProgressPercentages,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
  const barChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const chartOptions = {
    responsive: true,
  };

  return (
    <div className='h-full w-full p-8 overflow-y-scroll scrollbar-1 flex flex-col justify-between'>
      <div>
        <h1 className='text-2xl font-bold mb-4'>Project Analytics</h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
        <div className='flex flex-col justify-between text-white'>
          <div className='flex justify-between mb-4'>
            <div
              className='bg-cyan-700 rounded-lg shadow-md p-4'
              style={{ flexBasis: 'calc(50% - 8px)' }}
            >
              <h2 className='text-lg font-semibold mb-2'>Total Projects</h2>
              <p className='text-4xl font-bold'>{totalProjects}</p>
            </div>
            <div
              className='bg-green-700 rounded-lg shadow-md p-4'
              style={{ flexBasis: 'calc(50% - 8px)' }}
            >
              <h2 className='text-lg font-semibold mb-2'>Completed</h2>
              <p className='text-4xl font-bold'>{completedProjects}</p>
            </div>
          </div>
          {/* Second row */}

          <div className='flex justify-between mb-4'>
            <div
              className='bg-black rounded-lg shadow-md p-4 border border-green-400'
              style={{ flexBasis: 'calc(50% - 8px)' }}
            >
              <h2 className='text-lg font-semibold mb-2'>Upcoming</h2>
              <p className='text-4xl font-bold'>{upcomingProjects}</p>
            </div>
            <div
              className='bg-blue-900 rounded-lg shadow-md p-4'
              style={{ flexBasis: 'calc(50% - 8px)' }}
            >
              <h2 className='text-lg font-semibold mb-2'>Inprogress</h2>
              <p className='text-4xl font-bold'>{inProgressProjects}</p>
            </div>
          </div>
          {/* THird row */}
          <div className='flex justify-between'>
            <div
              className='bg-orange-400 rounded-lg shadow-md p-4'
              style={{ flexBasis: 'calc(50% - 8px)' }}
            >
              <h2 className='text-lg font-semibold mb-2'>Due soon</h2>
              <p className='text-4xl font-bold'>6</p>
            </div>
            <div
              className='bg-red-600 rounded-lg shadow-md p-4'
              style={{ flexBasis: 'calc(50% - 8px)' }}
            >
              <h2 className='text-lg font-semibold mb-2'>Deadline Exceeded</h2>
              <p className='text-4xl font-bold'>3</p>
            </div>
          </div>
        </div>
        <div
          className='bg-white rounded-lg shadow-md p-4'
          style={{ height: '500px' }}
        >
          <h2 className='text-lg font-semibold'>Projects by Status</h2>
          <Doughnut className='pb-4' data={chartData} options={chartOptions} />
        </div>
      </div>
      <div className='bg-white rounded-lg shadow-md p-4'>
        <h2 className='text-lg font-semibold mb-2'>
          In-Progress Projects Completion
        </h2>
        <Bar data={barChartData} options={barChartOptions} />
      </div>
    </div>
  );
};

export default Summary;
