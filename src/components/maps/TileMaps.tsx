import { useContext, useEffect, useState } from 'react';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { defaults as defaultControls } from 'ol/control';
import MapView, { MapContext } from './MapView';
import { Group, Radio } from '@mantine/core';
import './TileMaps.css';
import TileSource from 'ol/source/Tile';
import XYZ from 'ol/source/XYZ';

type GSILayerName = 'standard' | 'light' | 'photo';

const gsiUrl = 'https://maps.gsi.go.jp/development/ichiran.html';

const gsiLayerUrls: { [key in GSILayerName]: string } = {
  standard: 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
  light: 'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
  photo: 'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
};

const gsiLayerAttributions =
  `<a href="${gsiUrl}" ` +
  'target="_blank" ' +
  'class="layer attributions">地理院タイル</a>';

//type MapKind = 'osm' | 'gsi-std' | 'gsi-pale' | 'gsi-photo';
type MapKind = 'osm' | GSILayerName;

type TileMapsInnerProps = {
  mapKind: MapKind;
};

const createGSILayer = (layerName: GSILayerName): TileLayer<XYZ> =>
  new TileLayer({
    source: new XYZ({
      url: gsiLayerUrls[layerName],
      attributions: gsiLayerAttributions,
    }),
  });

const gsiLayers: { [key in GSILayerName]: TileLayer<XYZ> } = {
  standard: createGSILayer('standard'),
  light: createGSILayer('light'),
  photo: createGSILayer('photo'),
};

const tileLayer = (mapKind: MapKind) => {
  switch (mapKind) {
    case 'osm':
      return new TileLayer({
        source: new OSM(),
      });
    case 'standard':
      return gsiLayers.standard;
    case 'light':
      return gsiLayers.light;
    default:
      return gsiLayers.photo;
  }
};

const TileMapsInner: React.FC<TileMapsInnerProps> = ({ mapKind }) => {
  const map = useContext(MapContext);

  useEffect(() => {
    if (!map) return;
    defaultControls().forEach((control) => {
      map.addControl(control);
    });
    const view = map.getView();
    map.addLayer(tileLayer(mapKind));
    view.setCenter(fromLonLat([0, 0]));
    view.setZoom(1);
  }, [map]);

  useEffect(() => {
    if (!map) return;
    map.getAllLayers().forEach((layer) => {
      map.removeLayer(layer);
    });
    map.addLayer(tileLayer(mapKind));
  }, [mapKind]);

  return <></>;
};

const TileMaps: React.FC = () => {
  const [currentMap, setCurrentMap] = useState<MapKind>('osm');

  const onChange = (value: string) => {
    console.log(value);
    setCurrentMap(value as MapKind);
  };

  return (
    <>
      <Radio.Group value={currentMap} onChange={onChange} mb="xs">
        <Group>
          <Radio value="osm" label="Open Street Map" />
          <Radio value="standard" label="地理院地図 (標準)" />
          <Radio value="light" label="地理院地図 (淡色)" />
          <Radio value="photo" label="地理院地図 (写真)" />
        </Group>
      </Radio.Group>
      <MapView>
        <TileMapsInner mapKind={currentMap} />
      </MapView>
    </>
  );
};

export default TileMaps;
