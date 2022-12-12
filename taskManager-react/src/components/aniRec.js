import React, { useState, useEffect } from 'react';

const Anirec = () => {
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    fetch('https://api.jikan.moe/v4/random/anime')
    .then(response => response.json())
    .then(data => setAnime(data));
  }, []);

return(
    <div>
    <h4>{anime?.data?.title}</h4>
    <img src={anime?.data?.images?.jpg?.image_url} alt={anime?.data?.title} />
    </div>
);
};

export default Anirec;