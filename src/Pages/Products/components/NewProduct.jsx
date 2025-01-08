// import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useThemeContext } from "../../../Components/db/Theme/ThemeContext";
// import { useDispatch, useSelector } from "react-redux";
// import { getCategory } from "../../../Components/db/Redux/api/ReduxSlice";
// import { getSubCategory } from "../../../Components/db/Redux/api/SubCategorySlice";

// const NewProduct = () => {
//   const [formData, setFormData] = useState({
//     nameTm: "",
//     nameRu: "",
//     nameEn: "",
//     barcode: "",
//     categoryId: null,
//     subCategoryId: null,
//   });
//   const [filteredSubCategories, setFilteredSubCategories] = useState([]);

//   const categories = useSelector((state) => state.data.data);
//   const subCategories = useSelector((state) => state.subcategory.data);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getCategory());
//     dispatch(getSubCategory());
//   }, [dispatch]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCategoryChange = (event, value) => {
//     const categoryId = value ? value.id : null;
//     setFormData((prev) => ({ ...prev, categoryId, subCategoryId: null }));

//     // Filter subcategories based on the selected category
//     const filtered = subCategories.filter(
//       (sub) => sub.categoryId === categoryId
//     );
//     setFilteredSubCategories(filtered);
//   };

//   const handleSubCategoryChange = (event, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       subCategoryId: value ? value.id : null,
//     }));
//   };

//   const inputStyle = {
//     "& .MuiOutlinedInput-root": {
//       "&:hover fieldset": {
//         borderColor: "#00B69B",
//       },
//       "&.Mui-focused fieldset": {
//         borderColor: "#00B69B",
//         borderWidth: 2,
//       },
//     },
//     "& .MuiInputLabel-root": {
//       pt: -3,
//       lineHeight: "1",
//       "&.Mui-focused": {
//         color: "#00B69B",
//       },
//     },
//   };

//   const { mode } = useThemeContext();

//   return (
//     <Box height="100vh" overflow="auto" width="100%">
//       <Stack direction="row" p="5px 13px" justifyContent="space-between">
//         <Typography
//           fontSize={{ lg: "20px", md: "20px", sm: "18px", xs: "16px" }}
//           fontFamily="Montserrat"
//           fontWeight="600"
//           width="10%"
//           sx={{
//             ...(mode === "dark" ? { color: "inherit" } : { color: "#474747" }),
//           }}
//         >
//           Täze Haryt
//         </Typography>
//       </Stack>

//       <Stack width="100%" justifyContent="space-between" direction="row">
//         <Stack width="100%" spacing={1} p={1}>
//           <TextField
//             sx={inputStyle}
//             label="Ady (TM)"
//             name="nameTm"
//             autoComplete="off"
//             value={formData.nameTm}
//             onChange={handleInputChange}
//             variant="outlined"
//             size="small"
//             fullWidth
//           />
//           <TextField
//             sx={inputStyle}
//             label="Ady (RU)"
//             autoComplete="off"
//             name="nameRu"
//             value={formData.nameRu}
//             onChange={handleInputChange}
//             variant="outlined"
//             size="small"
//             fullWidth
//           />
//           <TextField
//             sx={inputStyle}
//             label="Ady (EN)"
//             autoComplete="off"
//             name="nameEn"
//             value={formData.nameEn}
//             onChange={handleInputChange}
//             variant="outlined"
//             size="small"
//             fullWidth
//           />
//         </Stack>
//         <Stack width="100%" spacing={1} p={1}>
//           <TextField
//             sx={inputStyle}
//             label="Barkod"
//             autoComplete="off"
//             name="barcode"
//             value={formData.barcode}
//             onChange={handleInputChange}
//             variant="outlined"
//             size="small"
//             fullWidth
//           />
//           <Autocomplete
//             sx={inputStyle}
//             options={categories || []}
//             getOptionLabel={(option) => option.nameTm || ""}
//             onChange={handleCategoryChange}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 fullWidth
//                 label="Kategoriýa"
//                 size="small"
//               />
//             )}
//           />
//           <Autocomplete
//             sx={inputStyle}
//             options={filteredSubCategories || []}
//             getOptionLabel={(option) => option.nameTm || ""}
//             onChange={handleSubCategoryChange}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Subkategoriýa"
//                 variant="outlined"
//                 size="small"
//               />
//             )}
//           />
//         </Stack>
//       </Stack>
//     </Box>
//   );
// };

// export default NewProduct;

import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useThemeContext } from "../../../Components/db/Theme/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../Components/db/Redux/api/ReduxSlice";
import { getSubCategory } from "../../../Components/db/Redux/api/SubCategorySlice";
import Forms from "./Forms";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearIcon from "@mui/icons-material/Clear";
import SwiperWithFileInput from "./ImageInput";

const NewProduct = () => {
  const [formData, setFormData] = useState({
    nameTm: "",
    nameRu: "",
    nameEn: "",
    barcode: "",
    categoryId: null,
    subCategoryId: null,
  });
  const [openProductType, setOpenProductType] = useState(true);
  const [productImages, setProductImages] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [productTypeFields, setProductTypeFields] = useState([
    {
      nameTm: "",
      nameRu: "",
      nameEn: "",
      descriptionTm: "",
      descriptionRu: "",
      descriptionEn: "",
      sellPrice: 0,
      salePrice: 0,
      salePricePercent: 0,
      incomePrice: 0,
      productQuantity: "",
      productColorId: "",
    },
  ]);

  const categories = useSelector((state) => state.data.data);
  const subCategories = useSelector((state) => state.subcategory.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getSubCategory());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (event, value) => {
    setFormData((prev) => ({ ...prev, categoryId: value ? value.id : null }));
  };

  const handleSubCategoryChange = (event, value) => {
    setFormData((prev) => ({
      ...prev,
      subCategoryId: value ? value.id : null,
    }));
  };

  const handleProductTypeChange = (index, field, value) => {
    const updatedFields = [...productTypeFields];
    updatedFields[index][field] = value;
    setProductTypeFields(updatedFields);
  };

  const addProductType = () => {
    setOpenProductType(true);
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    console.log("Product Types:", productTypeFields);
    setProductTypeFields([
      ...productTypeFields,
      {
        nameTm: "",
        nameRu: "",
        nameEn: "",
        descriptionTm: "",
        descriptionRu: "",
        descriptionEn: "",
        sellPrice: "",
        incomePrice: "",
        productQuantity: "",
        productColorId: "",
      },
    ]);
  };
  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newProductImages = [...productImages];
      newProductImages[index] = file;
      setProductImages(newProductImages);
    }
  };
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#00B69B",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#00B69B",
        borderWidth: 2,
      },
    },
    "& .MuiInputLabel-root": {
      "&.Mui-focused": {
        color: "#00B69B",
      },
    },
  };

  const { mode } = useThemeContext();

  return (
    <Box height="100vh" overflow="auto" width="100%" p={1}>
      <Stack direction="row" p="5px 13px" justifyContent="space-between">
        <Typography
          fontSize={{ lg: "20px", md: "20px", sm: "18px", xs: "16px" }}
          fontFamily="Montserrat"
          fontWeight="600"
          sx={mode === "dark" ? { color: "inherit" } : { color: "#474747" }}
        >
          Täze Haryt
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Stack width="100%" spacing={1}>
          <TextField
            sx={inputStyle}
            label="Name (TM)"
            name="nameTm"
            autoComplete="off"
            value={formData.nameTm}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            sx={inputStyle}
            label="Name (RU)"
            name="nameRu"
            autoComplete="off"
            value={formData.nameRu}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            sx={inputStyle}
            label="Name (EN)"
            name="nameEn"
            autoComplete="off"
            value={formData.nameEn}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Stack>

        <Stack width="100%" spacing={1}>
          <TextField
            sx={inputStyle}
            label="Barcode"
            name="barcode"
            autoComplete="off"
            value={formData.barcode}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            fullWidth
          />
          <Autocomplete
            sx={inputStyle}
            options={categories || []}
            getOptionLabel={(option) => option.nameTm || ""}
            onChange={handleCategoryChange}
            renderInput={(params) => (
              <TextField {...params} label="Kategoriýa" size="small" />
            )}
          />
          <Autocomplete
            sx={inputStyle}
            options={subCategories || []}
            getOptionLabel={(option) => option.nameTm || ""}
            onChange={handleSubCategoryChange}
            renderInput={(params) => (
              <TextField {...params} label="Subkategoriýa" size="small" />
            )}
          />
        </Stack>
      </Stack>
      <Divider sx={{ mt: 2, bgcolor: "gray" }} />
      <Stack alignItems="end" mt={1} width="100%">
        <Stack direction="row" spacing={1}>
          {openProductType ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenProductType(false)}
              sx={{
                textTransform: "revert",
                minWidth: "3%",
                height: 40,
                color: "#fff",
                bgcolor: "#00B69B",
                "&:hover": { bgcolor: "#00B69B" },
                fontWeight: 500,
                fontFamily: "Montserrat",
                fontSize: 16,
              }}
            >
              <ClearIcon sx={{ width: 20, height: 20, mr: 0.5 }} />
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={addProductType}
              sx={{
                textTransform: "revert",
                minWidth: "15%",
                height: 40,
                color: "#fff",
                bgcolor: "#00B69B",
                "&:hover": { bgcolor: "#00B69B" },
                fontWeight: 500,
                fontFamily: "Montserrat",
                fontSize: 16,
              }}
            >
              <AddIcon sx={{ width: 20, height: 20, mr: 0.5 }} />
              Täze haryt görnüşi
            </Button>
          )}
        </Stack>

        {openProductType && (
          <Stack width="100%" mt={-4}>
            <Typography
              fontSize={{ lg: "20px", md: "20px", sm: "18px", xs: "16px" }}
              fontFamily="Montserrat"
              fontWeight="600"
              sx={mode === "dark" ? { color: "inherit" } : { color: "#474747" }}
            >
              Täze haryt görnüşi
            </Typography>

            <Forms
              productTypeFields={productTypeFields}
              handleProductTypeChange={handleProductTypeChange}
            />
            <SwiperWithFileInput
            // images={productImages.filter((img) => img !== null)}
            />
            {/* <Stack
              direction="row"
              flexWrap="wrap"
              spacing={2}
              sx={{ width: "100%", gap: 2 }}
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <Stack
                  key={num}
                  direction="column"
                  alignItems="center"
                  spacing={1}
                  sx={{ width: "100%", maxWidth: "150px" }}
                >
                  <Input
                    type="file"
                    onChange={(e) => handleImageUpload(e, num - 1)}
                    inputProps={{
                      accept: "image/*",
                      id: `productImage${num}`,
                    }}
                    sx={{
                      display: "none",
                    }}
                  />
                  <label htmlFor={`productImage${num}`}>
                    <Button
                      variant="outlined"
                      component="span"
                      sx={{
                        textAlign: "center",
                        textTransform: "none",
                        fontSize: "0.875rem",
                      }}
                    >
                      Картина {num}
                    </Button>
                  </label>
                  {productImages[num - 1] && (
                    <Typography variant="body2">
                      {productImages[num - 1].name}
                    </Typography>
                  )}
                </Stack>
              ))}
            </Stack> */}
          </Stack>
        )}
        {/* <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button> */}
      </Stack>
    </Box>
  );
};

export default NewProduct;
