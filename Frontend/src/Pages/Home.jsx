import React from 'react';
import Try from '../Components/Try';
import Glass from '../Components/Glass';
import './Home.css';
import lossImage from '../assets/loss.png';
import foundImage from '../assets/found.png';
import findImage from '../assets/find.png';

function Home() {
  return (
    <>
      <div className="homepage">
      <Try />
      </div>
<div className="home">
<Glass
          title="Lost an Item"
          subtitle="Report"
          imageSrc={lossImage}
          to="/Report"
        />
        <Glass
          title="Found an Item"
          subtitle="Report"
          imageSrc={foundImage}
          to="/Report"
        />
        <Glass
          title="Find Your Lost Item"
          subtitle="Browse"
          imageSrc={findImage}
          to="/Lostitm"
        />
    </div>

    </>
  );
}

export default Home;
