import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ProjectData } from '../../data';

// Register the chart.js components required for the Doughnut chart
ChartJS.register(ArcElement, Tooltip, Legend);

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

  // Chart data
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

  // Add chart options if needed for additional customization
  const chartOptions = {
    responsive: true,
    // For more options refer to Chart.js documentation
  };

  return (
    <div className='h-full w-full p-8 overflow-y-scroll scrollbar-1'>
      <h1 className='text-2xl font-bold mb-4'>Project Analytics</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
        {/* Total Projects */}
        <div className='bg-white rounded-lg shadow-md p-4'>
          <h2 className='text-lg font-semibold mb-2'>Total Projects</h2>
          <p className='text-4xl font-bold'>{totalProjects}</p>
        </div>

        {/* Status Chart */}
        <div className='bg-white rounded-lg shadow-md p-4'>
          <h2 className='text-lg font-semibold mb-2'>Projects by Status</h2>
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Summary;
