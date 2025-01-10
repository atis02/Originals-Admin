import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useThemeContext } from "../../Components/db/Theme/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import Forms from "./components/Forms";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import SwiperWithFileInput from "./components/ImageInput";
import MinImgInput from "./components/MinImgInput";
import HoverImgInput from "./components/HoverImgInput";
import { LuPackagePlus } from "react-icons/lu";
import ProductSwitchComponent from "../../layouts/ProductSwitch";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../Components/db/Redux/api/ProductSlice";
import { getCategory } from "../../Components/db/Redux/api/ReduxSlice";
import { getSubCategory } from "../../Components/db/Redux/api/SubCategorySlice";
const UpdateProduct = () => {
  const data = useSelector((state) => state.product.data);
  const status = useSelector((state) => state.product.status);
  const error = useSelector((state) => state.product.error);
  const [formData, setFormData] = useState({
    nameTm: data?.nameTm,
    nameRu: data?.nameRu,
    nameEn: data?.nameEn,
    barcode: data?.barcode,
    categoryId: data?.categoryId,
    subCategoryId: data?.subCategoryId,
  });
  const [openProductType, setOpenProductType] = useState(false);
  const [images, setImages] = useState(Array(5).fill(null));
  const [imagesMin, setImagesMin] = useState(null);
  const [imageMin, setImageMin] = useState(null);
  const [imagesHover, setImagesHover] = useState(null);
  const [imageHover, setImageHover] = useState(null);
  const [active, setActive] = useState(true);
  const [textFieldValues, setTextFieldValues] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [formValues, setFormValues] = useState({
    sizesWithQuantities: textFieldValues,
    nameTm: "",
    nameRu: "",
    nameEn: "",
    descriptionTm: "",
    descriptionRu: "",
    descriptionEn: "",
    sellPrice: "",
    discount_priceTMT: 0,
    discount_pricePercent: 0,
    incomePrice: "",
  });
  const [productImages, setProductImages] = useState([]);
  const [productType, setProductType] = useState(data?.ProductColorDetails);
  const dispatch = useDispatch();
  const { mode } = useThemeContext();
  const params = useParams();
  const sizeTable = useSelector((es) => es.size.data);
  const sizeTableStatus = useSelector((es) => es.size.status);
  const categories = useSelector((state) => state.data.data);
  const subCategories = useSelector((state) => state.subcategory.data);

  console.log(productType);
  console.log(data);

  useEffect(() => {
    setProductType(data?.ProductColorDetails);
  }, [data]);

  useEffect(() => {
    dispatch(getProductById(params.id));
    dispatch(getCategory());
    dispatch(getSubCategory());
  }, [dispatch]);

  useEffect(() => {
    if (selectedValue.sizes?.length > 0) {
      const initialValues = selectedValue.sizes.map((elem) => ({
        size: elem.name,
        quantity: 0, // Initially, set quantity as an empty string
      }));
      setTextFieldValues(initialValues);
    }
  }, [selectedValue.sizes]);

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

  const addProductType = () => {
    setOpenProductType(true);
  };

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    if (!file) return;
    setProductImages((prevImagesAll) => [...prevImagesAll, file]);
    const newImages = [...images];
    newImages[index] = URL.createObjectURL(file);
    setImages(newImages);
  };

  const handleMinImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageMin(file);
      setImagesMin(URL.createObjectURL(file));
    }
  };
  const handleHoverImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageHover(file);
      setImagesHover(URL.createObjectURL(file));
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
  const inputsStyle2 = {
    "& .MuiOutlinedInput-root": {
      height: 40,
      width: "150px",
      ...(mode === "dark" ? { color: "#fff" } : { color: "#00B69B" }),
      "&:hover fieldset": {
        borderColor: "#00B69B",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#00B69B",
        borderWidth: 2,
      },
    },
    "& .MuiInputLabel-root": {
      pt: -3,
      lineHeight: "1",
      "&.Mui-focused": {
        color: "#00B69B",
      },
    },
  };
  const handleSwitchToggle = (newState) => {
    console.log("Switch toggled to:", newState);
    setActive(newState);
  };

  const handleChangeSelectedValue = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleProductTypeInputChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleTextFieldChange = (sizeName, quantity) => {
    const parsedQuantity = parseInt(quantity, 10) || 0; // Parse input to a number
    const updatedTextFieldValues = textFieldValues.map((item) =>
      item.size === sizeName ? { ...item, quantity: parsedQuantity } : item
    );
    setTextFieldValues(updatedTextFieldValues);
    setFormValues((prevValues) => ({
      ...prevValues,
      sizesWithQuantities: updatedTextFieldValues, // Update sizesWithQuantities in formValues
    }));
  };
  const style2 = {
    p: 0,
    pl: 2,
    fontFamily: "Montserrat",
    textAlign: "center",
  };
  const handleNewProductSubmit = () => {
    const checkAllData = (data) => {
      const keysToCheck = [
        "incomePrice",
        "nameEn",
        "nameRu",
        "nameTm",
        "sellPrice",
      ];
      for (let key of keysToCheck) {
        if (data[key] === null || data[key] === undefined || data[key] === "") {
          toast.warn(`Maglumatlary doly giriz!`);
          return false; // If any field is invalid, return false
        }
      }
      for (let i = 0; i < data.sizesWithQuantities.length; i++) {
        const size = data.sizesWithQuantities[i];

        if (size.size === 0) {
          toast.warn(`Size for entry ${i} is invalid`);
          return false;
        }

        if (
          size.quantity === null ||
          size.quantity === undefined ||
          size.quantity === 0
        ) {
          toast.warn(`Haryt sany ${size.size} razmerde ýok`);
          return false; // If any quantity is invalid
        }
      }
      if (!data.sizesWithQuantities.length) {
        toast.warn(`Razmeri hökman girizmeli!`);
        return false;
      }
      if (imagesMin == null || imagesHover == null || images[0] == null) {
        toast.warn(`Surat goşmaly!`);
        return;
      }
      toast.success("Üstünlikli!");
      setProductType((prev) => [...prev, formValues]);
      setOpenProductType(false);

      return true; // Return true if everything is valid
    };
    checkAllData(formValues);
  };
  const navigate = useNavigate();
  const handleDelete = (index) => {
    const filtered = [...productType];
    filtered.splice(index, 1);
    setProductType(filtered);
  };

  const handleSubmit = () => {
    const productDetail = JSON.stringify(formData);
    const colorDetail = JSON.stringify(productType);
    const body = new FormData();
    body.append("productDetail", productDetail);
    body.append("colorDetail", colorDetail);
    body.append("hoverImage", imageHover);
    productImages.forEach((image) => body.append("fullImages", image));
    body.append("minImage", imageMin);
    if (
      !formData.nameTm ||
      !formData.nameEn ||
      !formData.nameRu ||
      !formData.barcode ||
      formData.categoryId == null ||
      formData.subCategoryId == null ||
      !productType.length ||
      !productImages.length ||
      imageHover == null ||
      imagesMin == null
    ) {
      toast.error("Maglumatlary giriziň!");
      return;
    } else {
      dispatch(createProduct(body));
      navigate("/products");
    }
  };
  return (
    <Box height="100vh" overflow="auto" width="100%" p={1}>
      <Stack direction="row" p="5px 13px" justifyContent="space-between">
        <Typography
          fontSize={{ lg: "20px", md: "20px", sm: "18px", xs: "16px" }}
          fontFamily="Montserrat"
          fontWeight="600"
          sx={mode === "dark" ? { color: "inherit" } : { color: "#474747" }}
        >
          {data?.nameTm}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Stack width="100%" spacing={1}>
          <TextField
            sx={inputStyle}
            label="Ady (TM)"
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
            label="Ady (RU)"
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
            label="Ady (EN)"
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
            label="Barkody"
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
            defaultValue={formData.subCategoryId}
            getOptionLabel={(option) => option.nameTm || ""}
            onChange={handleSubCategoryChange}
            renderInput={(params) => (
              <TextField {...params} label="Subkategoriýa" size="small" />
            )}
          />
        </Stack>
      </Stack>
      <Divider sx={{ mt: 2, mb: 2, bgcolor: "gray" }} />
      {productType ? (
        <Stack spacing={1} mt={1}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              fontSize={{ lg: "20px", md: "20px", sm: "18px", xs: "16px" }}
              fontFamily="Montserrat"
              fontWeight="600"
              sx={mode === "dark" ? { color: "inherit" } : { color: "#474747" }}
            >
              Harydyň görnüşleri
            </Typography>
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
          </Stack>
          <Stack
            // key={index}
            direction="row"
            alignItems="center"
            spacing={1}
            border="1px solid gray"
            borderRadius={3}
            p={0}
          >
            {/* <img
                src={imagesMin}
                style={{ width: 60, height: 60, borderRadius: 3 }}
                alt=""
              />
              <Typography>
                {index + 1}. {item.nameTm}
              </Typography> */}
            <TableContainer
              sx={{
                ...(mode === "dark"
                  ? { background: "#0D1117" }
                  : { background: "#F3F2F7" }),
                borderRadius: 3,
              }}
              component={Paper}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ ...style2, p: 1 }}>№</TableCell>
                    <TableCell sx={{ ...style2, p: 1 }}>Surady</TableCell>
                    <TableCell sx={{ ...style2, p: 1 }}>Ady (TM)</TableCell>
                    <TableCell sx={{ ...style2, p: 1 }}>Bahasy (TMT)</TableCell>
                    <TableCell sx={{ ...style2, p: 1 }}>
                      Arzanladyş (TMT)
                    </TableCell>
                    <TableCell sx={{ ...style2, p: 1 }}>Aktiw</TableCell>
                    <TableCell sx={{ ...style2, p: 1 }}></TableCell>
                    {/* <TableCell>Hereketler</TableCell> */}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {productType.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell sx={style2}>{index + 1}</TableCell>
                      <TableCell sx={style2}>
                        <img
                          src={imagesMin}
                          alt="image of product"
                          style={{
                            maxWidth: "50px",
                            maxHeight: "50px",
                            objectFit: "contain",
                          }}
                          crossOrigin="anonymous"
                        />
                      </TableCell>
                      <TableCell sx={style2}>{item.nameTm}</TableCell>
                      <TableCell sx={style2}>{item.sellPrice}</TableCell>
                      <TableCell sx={style2}>
                        {item.discount_priceTMT}
                      </TableCell>
                      <TableCell sx={style2}>
                        {active ? "Hawa" : "Ýok"}
                      </TableCell>
                      <TableCell sx={style2}>
                        {/* <IconButton
                          onClick={() => {
                            handleOpenUpdateitem(item);
                            setId(item.id);
                          }}
                          sx={{ backgroundColor: "inherit", color: "#fff" }}
                        >
                          <BorderColorOutlinedIcon
                            sx={{
                              color: "#00B69B",
                              width: 20,
                              height: 20,
                            }}
                          />
                        </IconButton> */}
                        <IconButton
                          onClick={() => handleDelete(index)}
                          sx={{ backgroundColor: "inherit", color: "#fff" }}
                        >
                          <img
                            style={{ width: 20, height: 20 }}
                            src="/images/Delete.png"
                            alt=""
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Stack>
      ) : (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            fontSize={{ lg: "20px", md: "20px", sm: "18px", xs: "16px" }}
            fontFamily="Montserrat"
            fontWeight="600"
            sx={mode === "dark" ? { color: "inherit" } : { color: "#474747" }}
            textAlign="center"
          >
            Harydyň görnüşini goşuň{" "}
          </Typography>
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
        </Stack>
      )}

      <Stack mt={1} width="100%" alignItems={"end"}>
        <Stack direction="row" spacing={1}>
          {openProductType && (
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
          )}
        </Stack>

        {/* <Stack></Stack> */}
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
              formValues={formValues}
              handleProductTypeInputChange={handleProductTypeInputChange}
              textFieldValues={textFieldValues}
              setTextFieldValues={setTextFieldValues}
              handleTextFieldChange={handleTextFieldChange}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              handleChangeSelectedValue={handleChangeSelectedValue}
              setFormValues={setFormValues}
            />
            <Stack
              direction="row"
              // flexWrap="wrap"
              alignItems="center"
              spacing={4}
              mb={2}
            >
              <Stack width={"25%"} m={1}>
                <FormControl>
                  <InputLabel id="select-label" sx={{ height: 40, mb: 2 }}>
                    Razmer hataryny saýlaň
                  </InputLabel>
                  <Select
                    labelId="select-label"
                    value={selectedValue}
                    onChange={handleChangeSelectedValue}
                    label="Razmer hataryny saýlaň"
                    // size="small"
                    sx={{
                      borderRadius: "10px", // Custom border radius
                      // backgroundColor: "white", // Background color
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#00B69B", // Border color
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#007A5A", // Hover border color
                      },
                    }}
                  >
                    {sizeTableStatus === "succeeded" ? (
                      sizeTable.map((elem) => (
                        <MenuItem value={elem} key={elem.id}>
                          {elem.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>Loading...</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Stack>
              <Stack width="100%" direction="row" gap={1} flexWrap="wrap">
                {selectedValue.sizes?.length == 0 ? (
                  <Typography>Razmer ýok</Typography>
                ) : (
                  selectedValue.sizes?.map((elem) => (
                    <Stack
                      key={elem.id}
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <Typography>{elem.name}</Typography>
                      <TextField
                        autoComplete="off"
                        label="Haryt sany"
                        value={
                          textFieldValues.find(
                            (item) => item.size === elem.name
                          )?.quantity || ""
                        }
                        onChange={(e) =>
                          handleTextFieldChange(elem.name, e.target.value)
                        }
                        size="small"
                        fullWidth
                        sx={inputsStyle2}
                      />
                    </Stack>
                  ))
                )}
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2}>
              <SwiperWithFileInput
                images={images}
                setImages={setImages}
                handleFileChange={handleFileChange}
              />

              <Stack direction="column" spacing={1} height="30%">
                <Stack direction="row" spacing={1} height="30%">
                  <MinImgInput
                    images={imagesMin}
                    setImages={setImagesMin}
                    handleFileChange={handleMinImage}
                  />
                  <HoverImgInput
                    images={imagesHover}
                    setImages={setImagesHover}
                    handleFileChange={handleHoverImage}
                  />
                </Stack>
                <Stack alignItems="center" width="100%">
                  <ProductSwitchComponent
                    // data={data}
                    onChange={handleSwitchToggle}
                  />

                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "revert",
                      minWidth: "70%",
                      height: 40,
                      color: "#fff",
                      bgcolor: "#00B69B",
                      "&:hover": { bgcolor: "#00B69B" },
                      fontWeight: 500,
                      fontFamily: "Montserrat",
                      fontSize: 16,
                      mt: 2,
                    }}
                    // onClick={handleNewProductSubmit}
                    onClick={handleNewProductSubmit}
                  >
                    {/* <LuPackagePlus /> */}
                    <LuPackagePlus
                      style={{ width: 30, height: 30, marginRight: 8 }}
                    />
                    Goşmak
                    {/* Tassykla */}
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>
      {openProductType == false && productType ? (
        <Button
          variant="contained"
          sx={{
            textTransform: "revert",
            minWidth: "20%",
            height: 40,
            color: "#fff",
            bgcolor: "#00B69B",
            "&:hover": { bgcolor: "#00B69B" },
            fontWeight: 500,
            fontFamily: "Montserrat",
            fontSize: 16,
            mt: 2,
          }}
          // onClick={handleNewProductSubmit}
          onClick={handleSubmit}
        >
          {/* <LuPackagePlus /> */}
          <LuPackagePlus style={{ width: 30, height: 30, marginRight: 8 }} />
          {/* Goşmak */}
          Tassykla
        </Button>
      ) : (
        ""
      )}
    </Box>
  );
};

export default UpdateProduct;
