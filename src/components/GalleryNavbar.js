import React from 'react';
import { FaSearch } from 'react-icons/fa';

const GalleryNavbar = ({ setSearchTerm }) => {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="navbar">
      <h2>PixelsPivot</h2>
      <nav className="nav">
        <form className="search-form">
          <input
            type="search"
            placeholder="Search images"
            className="search-input"
            onChange={handleInputChange}
          />
        </form>
        <ul>
          <li>Trending</li>
          <li>Collections</li>
        </ul>
      </nav>
    </div>
  );
};

export default GalleryNavbar;
