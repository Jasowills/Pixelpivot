import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AOS from 'aos';
import 'aos/dist/aos.css';

const filterImagesBySearch = (images, search) => {
  return images.filter((image) =>
    image.alt.toLowerCase().includes(search.toLowerCase())
  );
};

const Gallery = ({ searchTerm }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = 'xD8DuDylYDtaSUqTC14VA1rAaRsT4gdXU1ZIE8ihs7jhKDH9Fv1i6uHe';
  const [searchedImagesExist, setSearchedImagesExist] = useState(true);

  useEffect(() => {
    AOS.init();
    fetch('https://api.pexels.com/v1/curated?per_page=50', {
      method: 'GET',
      headers: {
        Authorization: apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const portraitImages = data.photos.filter(
          (photo) => photo.height > photo.width
        );

        const imageList = portraitImages.map((photo) => ({
          id: photo.id.toString(),
          src: photo.src.medium,
          alt: photo.photographer,
        }));

        setImages(imageList);
        setLoading(false);

        // Update searchedImagesExist based on whether there are any filtered images
        setSearchedImagesExist(imageList.length > 0);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        setLoading(false);
        setSearchedImagesExist(false);
      });
  }, [apiKey]);

  const filteredImages = filterImagesBySearch(images, searchTerm);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = [...filteredImages];
    const [reorderedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedImage);

    setImages(reorderedImages);
  };

  return (
    <div>
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          Loading...
        </div>
      ) : (
        <>
          {searchedImagesExist ? (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="image-gallery" direction="horizontal">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="image-grid-container"
                  >
                    {filteredImages.map((image, index) => (
                      <Draggable key={image.id} draggableId={image.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`image-container ${
                              snapshot.isDragging ? 'dragging' : ''
                            }`}
                          >
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="gallery-image"
                              data-aos="fade-up"
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <div className="image-not-found">
              Image not found for "{searchTerm}".
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Gallery;
