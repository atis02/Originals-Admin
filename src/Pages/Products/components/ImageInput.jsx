import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Thumbs } from "swiper/modules";
import { Stack, Button, Typography } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useThemeContext } from "../../../Components/db/Theme/ThemeContext";
import "../../../Components/db/utils/swiper.css";
import { toast } from "react-toastify";

const SwiperWithFileInput = () => {
  const [images, setImages] = useState([]);
  const { mode } = useThemeContext();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  console.log(images.length);

  // Handle file selection
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    console.log(files);

    const newImages = files.map((file) => URL.createObjectURL(file));
    images.length === 6
      ? toast.error("Surat 6 dan kän bolup bilenok!")
      : setImages((prev) => [...prev, ...newImages]);
  };

  // Clear selected images
  const handleClear = () => {
    setImages([]);
  };
  const slides = [
    { id: 1, title: "Surat 1", name: "", image: images[0] },
    { id: 2, title: "Surat 2", name: "", image: images[1] },
    { id: 3, title: "Surat 3", name: "", image: images[2] },
    { id: 4, title: "Surat 4", name: "", image: images[3] },
    { id: 5, title: "Surat 5", name: "", image: images[4] },
    { id: 6, title: "Surat 6", name: "", image: images[5] },
  ];
  console.log(slides);

  const handleButtonClick = (index) => {
    setActiveIndex(index);
  };
  return (
    <Stack
      spacing={2}
      width="50%"
      sx={{
        border:
          mode === "dark" ? "1px solid rgb(85, 85, 85)" : "1px solid gray",
        borderRadius: 3,
        padding: 2,
      }}
      alignItems="center"
    >
      {/* File Input Button */}

      {/* Swiper or No Images Selected */}
      {images.length >= 0 ? (
        <>
          {/* Main Swiper */}
          <Swiper
            modules={[Navigation, Thumbs]}
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            initialSlide={activeIndex}
            style={{ width: "400px", height: "300px" }}
          >
            {images.map((imgSrc, index) => (
              <SwiperSlide key={index}>
                <img
                  src={imgSrc}
                  alt={`Slide ${index + 1}`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnail Swiper */}
          <Swiper
            modules={[Thumbs]}
            onSwiper={setThumbsSwiper}
            spaceBetween={7}
            slidesPerView={6}
            watchSlidesProgress
            style={{
              width: "80%",
              marginTop: 10,
            }}
          >
            {images.map((imgSrc, index) => (
              <SwiperSlide key={index}>
                <img
                  src={imgSrc}
                  alt={`Thumbnail ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100px",
                    objectFit: "contain",
                    cursor: "pointer",
                    border:
                      mode === "dark"
                        ? "1px solid rgb(85, 85, 85)"
                        : "1px solid gray",
                    borderRadius: 10,
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{
              marginTop: 2,
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {slides.map((slide, index) => (
              <Button
                component="label"
                variant="outlined"
                color="primary"
                // disabled={activeIndex === index}
                sx={{
                  textTransform: "none",
                  padding: "5px 10px",
                  fontSize: "14px",
                  color: activeIndex === index ? "#00B69B" : "lightgray",
                  borderColor: activeIndex === index ? "#00B69B" : "gray",
                  "&:hover": {
                    borderColor: "#00B69B",
                  },
                }}
              >
                <AddPhotoAlternateIcon />
                {slide.title}

                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept="image/*"
                  multiple
                />
              </Button>
            ))}
          </Stack>
        </>
      ) : (
        <Typography>No images selected</Typography>
      )}

      {/* Clear Button */}
      {images.length > 0 && (
        <Button variant="outlined" color="secondary" onClick={handleClear}>
          Clear Images
        </Button>
      )}
    </Stack>
  );
};

export default SwiperWithFileInput;

// "use client";

// import Image from "next/image";
// import React from "react";
// import { Box, Button } from "@mui/material";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { FreeMode, Navigation, Thumbs } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";

// const ImageSwiperComponent = ({ images, thumbsSwiper, setThumbsSwiper }) => {
//   return (
//     <Box
//       sx={{
//         // backgroundColor: "white",
//         border: "1px solid #e0e0e0",
//         boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//         padding: 2,
//         width: "30%",
//         zIndex: 0,
//         borderRadius: 2,
//       }}
//     >
//       {/* Main Swiper */}
//       <Swiper
//         loop={true}
//         spaceBetween={10}
//         navigation={true}
//         thumbs={{
//           swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
//         }}
//         modules={[FreeMode, Navigation, Thumbs]}
//         style={{
//           borderRadius: "8px",
//           height: "14rem",
//           width: "70%",
//         }}
//       >
//         {images.map((file, index) => (
//           <SwiperSlide key={index}>
//             <Box
//               sx={{
//                 position: "relative",
//                 // height: "100%",
//                 // width: "100%",
//               }}
//             >
//               <img
//                 src={URL.createObjectURL(file)}
//                 alt="image of product"
//                 style={{
//                   borderRadius: "8px",
//                   objectFit: "contain",
//                   width: "100%",
//                   height: "100%",
//                 }}
//               />
//             </Box>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Thumbnail Swiper */}
//       <Swiper
//         onSwiper={setThumbsSwiper}
//         loop={true}
//         spaceBetween={12}
//         slidesPerView={6}
//         freeMode={true}
//         watchSlidesProgress={true}
//         modules={[FreeMode, Navigation, Thumbs]}
//         style={{
//           borderRadius: "8px",
//           display: "flex",
//           justifyContent: "space-between",
//           marginTop: "8px",
//           height: "3.5rem",
//           // width: "100%",
//         }}
//       >
//         {images.map((file, index) => (
//           <SwiperSlide key={index}>
//             <Button
//               sx={{
//                 position: "relative",
//                 height: "100%",
//                 // width: "100%",
//                 backgroundColor: "white",
//                 border: "1px solid #e0e0e0",
//                 padding: "8px",
//               }}
//               onClick={(e) => e.preventDefault()}
//             >
//               <img
//                 src={URL.createObjectURL(file)}
//                 alt="thumbnail of currently selected image"
//                 style={{
//                   objectFit: "contain",
//                   width: "100%",
//                   height: "100%",
//                 }}
//               />
//             </Button>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </Box>
//   );
// };

// export default ImageSwiperComponent;
