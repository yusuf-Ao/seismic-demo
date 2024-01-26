import ProjectCard from '../../components/ProjectCard';
import { ProjectData } from '../../data';

const Project = () => {
  return (
    <div className='h-full w-full flex justify-evenly gap-4 px-4 flex-wrap py-8 mt-2 overflow-y-scroll scrollbar-1'>
      {ProjectData.map((project, index) => (
        <ProjectCard
          key={index}
          title={project.title}
          description={project.description}
          startDate={project.startDate}
          status={project.status}
          location={project.location}
          percentageDone={project.percentageDone}
        />
      ))}
    </div>
  );
};

export default Project;
