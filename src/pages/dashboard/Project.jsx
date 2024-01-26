import { useState } from 'react';
import SwitchSelector from 'react-switch-selector';
import { toggle_options } from '../../data';
import ProjectGIS from './ProjectGIS';
import ProjectList from './ProjectList';

const Project = () => {
  const [mapView, setMapView] = useState(false);

  const onViewChange = () => {
    if (mapView) {
      setMapView(false);
    } else {
      setMapView(true);
    }
  };
  return (
    <div className='font-poppins flex flex-col bg-background h-full pb-2 overflow-y-hidden'>
      <div className='flex flex-col h-full col-span-3 relative overflow-y-auto'>
        {mapView && <ProjectGIS />}
        {!mapView && <ProjectList />}
        <div className='fixed mt-2 ml-2'>
          <div
            className='your-required-wrapper'
            style={{ width: 100, height: 40 }}
          >
            <SwitchSelector
              onChange={onViewChange}
              options={toggle_options}
              initialSelectedIndex={0}
              backgroundColor={'#1f2937'}
              fontColor={'#f5f6fa'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
