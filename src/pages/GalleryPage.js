import React, { useState } from 'react';
import GalleryNavbar from '../components/GalleryNavbar';
import Gallery from '../components/Gallery';

const GalleryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <GalleryNavbar setSearchTerm={setSearchTerm} />
      &nbsp;
      <br/>
      <br/>
      <br/>
      <br/>
      <Gallery searchTerm={searchTerm} />
    </div>
  );
};

export default GalleryPage;
