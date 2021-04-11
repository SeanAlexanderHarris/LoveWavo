import React from 'react';
import useLatestData from '../utils/useLatestData';
import { HomePageGrid } from '../styles/Grids';
import LoadingGrid from '../components/LoadingGrid';
import ItemGrid from '../components/ItemGrid';

function CurrentlySlicing({ sliceMasters }) {
  return (
    <>
      <h2 className="center">
        <span className="mark tilt">Who's In Today?</span>
      </h2>
      <p>Standing by, ready to communify!</p>
      {!sliceMasters && <LoadingGrid count={4} />}
      {sliceMasters && !sliceMasters?.length && (
        <p>No one is working right now!</p>
      )}
      {sliceMasters?.length && <ItemGrid items={sliceMasters} />}
    </>
  );
}

function HotSlices({ hotslices }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Picks of the Week</span>
      </h2>
      <p>Come on by, check it out!</p>
      {!hotslices && <LoadingGrid count={4} />}{' '}
      {hotslices && !hotslices?.length && <p>Nothin' in the Case</p>}
      {hotslices?.length && <ItemGrid items={hotslices} />}
    </div>
  );
}

export default function HomePage() {
  const { staff, hotslices } = useLatestData();

  return (
    <div className="center">
      <h1>Making Wavertree Lovely Again!</h1>
      <p>Open 11am to 6pm Every Day</p>
      <HomePageGrid>
        <CurrentlySlicing sliceMasters={staff} />
        <HotSlices hotslices={hotslices} />
      </HomePageGrid>
    </div>
  );
}
