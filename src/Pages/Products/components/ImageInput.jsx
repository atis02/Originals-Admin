import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Thumbs } from "swiper/modules";
import { Stack, Button, Typography, Divider } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { toast } from "react-toastify";
import "../../../Components/db/utils/swiper.css";
import { useThemeContext } from "../../../Components/db/Theme/ThemeContext";

const SwiperWithFileInput = ({ images, setImages, handleFileChange }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { mode } = useThemeContext();

  const handleClear = () => {
    setImages(Array(5).fill(null));
  };

  return (
    <Stack
      spacing={2}
      width="55%"
      sx={{
        border: "1px solid gray",
        borderRadius: 3,
        // padding: 2,
        pt: 1,
        pb: 1,
      }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography>
        Suratlaryň ölçegi 840x840 we surat sany 1-5 çenli bolmaly.
      </Typography>
      {/* Слайды изображений */}
      {images.some((img) => img) ? (
        <Stack direction="row">
          {/* Основной слайдер */}
          <Swiper
            modules={[Navigation, Thumbs]}
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            spaceBetween={10}
            slidesPerView={1}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            style={{
              width: "350px",
              height: "300px",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {images.map(
              (imgSrc, index) =>
                imgSrc && (
                  <SwiperSlide
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={imgSrc}
                      alt={`Slide ${index + 1}`}
                      style={{
                        position: "absolute",
                        maxWidth: "100%",
                        maxHeight: "100%",
                        inset: 0,
                        top: 0,
                        marginLeft: 23,
                        objectFit: "contain",
                      }}
                    />
                  </SwiperSlide>
                )
            )}
          </Swiper>
          <Stack>
            <Typography fontSize={14}>
              * Suratlaryň göwrümi 2MB kän bolmaly däl
            </Typography>

            {/* Миниатюры */}
            {/* <Stack direction="column" width="40%"> */}
            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbsSwiper}
              // spaceBetween={55}
              slidesPerView={5}
              style={{
                display: "flex",
                flexDirection: "column",
                // width: "100px",
                marginTop: 10,
                width: "300px",
                height: "300px",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {images.map(
                (imgSrc, index) =>
                  imgSrc && (
                    <SwiperSlide key={index}>
                      <img
                        src={imgSrc}
                        alt={`Thumbnail ${index + 1}`}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "contain",
                          cursor: "pointer",
                          border: "1px solid gray",
                          borderRadius: 4,
                        }}
                      />
                    </SwiperSlide>
                  )
              )}
            </Swiper>
          </Stack>
          {/* </Stack> */}
        </Stack>
      ) : (
        <AddPhotoAlternateIcon sx={{ width: 50, height: 50 }} />
        // <Typography>Surat goşuň</Typography>
      )}

      {/* Кнопки для загрузки изображений */}
      <Stack
        direction="row"
        // spacing={1}
        width="100%"
        justifyContent="space-around"
        sx={{ flexWrap: "wrap", gap: 0.5 }}
      >
        <Stack direction="row" spacing={1} justifyContent="space-between">
          {images.map((_, index) => (
            <Button
              key={index}
              component="label"
              variant="outlined"
              color="primary"
              // disabled={activeIndex === index}
              sx={{
                textTransform: "none",
                padding: "5px 10px",
                fontSize: "14px",
                color: activeIndex === index ? "#00B69B" : "inherit",
                borderColor: activeIndex === index ? "#00B69B" : "gray",
                "&:hover": {
                  borderColor: "#00B69B",
                },
              }}
            >
              <AddPhotoAlternateIcon />
              {`Surat ${index + 1}`}
              <input
                type="file"
                hidden
                onChange={(e) => handleFileChange(e, index)}
                accept="image/*"
              />
            </Button>
          ))}
        </Stack>
        <Stack>
          {images.some((img) => img) && (
            <Button
              variant="outlined"
              sx={{
                color: "#00B69B",
                borderColor: "#00B69B",
                textTransform: "revert",
              }}
              onClick={handleClear}
            >
              Arassala
            </Button>
          )}
        </Stack>
      </Stack>

      {/* Кнопка очистки */}
    </Stack>
  );
};

export default SwiperWithFileInput;


