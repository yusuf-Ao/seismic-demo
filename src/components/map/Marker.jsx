import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import { status_colors } from '../../data';

const Marker = (options) => {
  const [marker, setMarker] = React.useState();
  console.log(options);
  const map = options.map;
  const data = options.data;

  function setColor(name) {
    return status_colors[name];
  }

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }

    if (data !== null) {
      data.forEach((element) => {
        const lat = element.lat;
        const lng = element.long;
        const latLng = new google.maps.LatLng(lat, lng);

        const infowindow = new google.maps.InfoWindow({
          ariaLabel: element.title,
          content: `<div
        class="uppercase block min-w-[300px] max-w-[420px] p-6 border rounded-lg shadow-md dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 font-roboto">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${element.title}</h5>
        <h4 class="capitalize mb-2 text-xl font-light tracking-tight text-gray-300">${element.location}
        </h4>
        <div class="flex">
            <p class="font-normal text-lg text-gray-700 dark:text-gray-400">Status: ${element.status}
            </p>
        </div>
    </div>`,
        });

        const marker = new google.maps.Marker({
          position: latLng,
          map: map,
          // label: element.affiliation_category,
          title: element.organization_type,
          draggable: false,
          fullscreenControl: false,
          icon: {
            path: faLocationDot.icon[4],
            fillColor: setColor(element.status),
            fillOpacity: 1,
            anchor: new google.maps.Point(
              faLocationDot.icon[0] / 2, // width
              faLocationDot.icon[1] // height
            ),
            strokeWeight: 0.75,
            strokeColor: '#000000',
            scale: 0.077,
          },
        });

        marker.addListener('click', () => {
          infowindow.open({
            anchor: marker,
            map,
          });
        });
      });
    }
  }, [marker, options]);
  return null;
};

export default Marker;
