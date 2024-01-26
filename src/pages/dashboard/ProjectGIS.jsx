import { Wrapper } from '@googlemaps/react-wrapper';
import React from 'react';
import Map from '../../components/map/Map';
import Marker from '../../components/map/Marker';
import { ProjectData } from '../../data';

const ProjectGIS = () => {
  const [clicks, setClicks] = React.useState([]);
  const [zoom, setZoom] = React.useState(6.5); // initial zoom
  const [center, setCenter] = React.useState({
    lat: 9.082,
    lng: 8.6753,
  });

  const onMapClick = (e) => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng]);
  };

  const onMapIdle = (m) => {
    //console.log("onIdle");
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };

  const renderMap = (status) => {
    return (
      <span className='text-center text-gray-500'>
        <p className='py-[30vh] text-3xl font-medium'>
          Map Status is: {status}
        </p>
      </span>
    );
  };

  return (
    <Wrapper
      apiKey='AIzaSyCVucpkQ9qcC4YuR1GC21RKKzlQvdsnb - o'
      render={renderMap}
    >
      <Map
        center={center}
        onClick={onMapClick}
        onIdle={onMapIdle}
        zoom={zoom}
        mapTypeId={'roadmap'}
        streetViewControl={false}
        mapTypeControl={false}
        style={{ flexGrow: '1', height: '100%' }}
      >
        <Marker data={ProjectData} />
      </Map>
    </Wrapper>
  );
};

export default ProjectGIS;
