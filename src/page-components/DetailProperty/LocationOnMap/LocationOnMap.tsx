import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Map } from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoicHAzMTEiLCJhIjoiY2xvMW9hazBtMWRuczJ0cWh0eDl1andncCJ9.cINZ3UYbzs7plrM2seqPjg';

//get coordinates from API

interface Propstype {
  latitude: number;
  longitude: number;
}
const LocationOnMap = ({ latitude, longitude }: Propstype) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const [lng, setLng] = useState(longitude);
  const [lat, setLat] = useState(latitude);
  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: 'mapbox://styles/pp311/clo1ucw6g00fd01r26ds09u1z',
      center: [lng, lat],
      zoom: zoom,
    });
    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
    map.current.on('move', () => {
      setLng(Number(map.current?.getCenter().lng.toFixed(4)));
      setLat(Number(map.current?.getCenter().lat.toFixed(4)));
      setZoom(Number(map.current?.getZoom().toFixed(2)));
    });
  });

  return (
    <div className="py-4">
      <h1 className='text-xl text-cyan-800 font-bold py-5'>Nơi bạn cần đến</h1>
      <div ref={mapContainer} className='map-container' style={{ height: '600px' }} />
    </div>
  );
};
export default LocationOnMap;
