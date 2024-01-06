import { useEffect, useRef, useState, createContext } from 'react';
import { Map, View } from 'ol';
import 'ol/ol.css';

export const MapContext = createContext<Map | null>(null);

type Props = {
  children?: React.ReactNode;
};

const MapView: React.FC<Props> = ({ children }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    const mapObj = new Map({
      view: new View(),
      layers: [],
      controls: [],
      overlays: [],
    });
    mapObj.setTarget(mapRef.current!);
    setMap(mapObj);

    return () => mapObj.setTarget(undefined!);
  }, []);

  return (
    <MapContext.Provider value={map}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
  );
};

export default MapView;
