import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
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
import {
  createProductColor,
  deleteProductColor,
  getProductById,
  updateProduct,
} from "../../Components/db/Redux/api/ProductSlice";
import { getCategory } from "../../Components/db/Redux/api/ReduxSlice";
import { getSubCategory } from "../../Components/db/Redux/api/SubCategorySlice";
import { BASE_URL_Img } from "../../Components/db/Redux/api/AxiosHelper";
import SaveIcon from "@mui/icons-material/Save";
import CreateIcon from "@mui/icons-material/Create";
import ProductTypeUpdate from "./updateProductType/ProductTypeUpdate";

const UpdateProduct = () => {
  const data = useSelector((state) => state.product.onProductData);
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
  const [productImages, setProductImages] = useState([]);
  const [imagesMin, setImagesMin] = useState(null);
  const [imageMin, setImageMin] = useState(null);
  const [imagesHover, setImagesHover] = useState(null);
  const [imageHover, setImageHover] = useState(null);
  const [active, setActive] = useState(true);
  const [activeProduct, setActiveProduct] = useState(true);
  const [selectedValue, setSelectedValue] = useState([]);
  const [textFieldValues, setTextFieldValues] = useState([]);
  const [updateProductType, setUpdateProductType] = useState([]);
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
  const [productType, setProductType] = useState(data?.ProductColorDetails);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { mode } = useThemeContext();
  const params = useParams();
  const sizeTable = useSelector((es) => es.size.data);
  const sizeTableStatus = useSelector((es) => es.size.status);
  const categories = useSelector((state) => state.data.data);
  const subCategories = useSelector((state) => state.subcategory.data);

  console.log(activeProduct);
  console.log(selectedValue);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setProductType(data?.ProductColorDetails);
    setFormData({
      nameTm: data?.nameTm,
      nameRu: data?.nameRu,
      nameEn: data?.nameEn,
      barcode: data?.barcode,
      categoryId: data?.categoryId,
      subCategoryId: data?.subCategoryId,
    });
  }, [data]);

  useEffect(() => {
    dispatch(getProductById(params.id));
    dispatch(getCategory());
    dispatch(getSubCategory());
  }, [dispatch]);

  useEffect(() => {
    if (selectedValue[0]?.sizes?.length > 0) {
      const initialValues = selectedValue[0].sizes.map((elem) => ({
        size: elem.name,
        quantity: 0,
      }));
      setTextFieldValues(initialValues);
    }
  }, [selectedValue[0]?.sizes]);
  console.log(textFieldValues);

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
    setActive(newState);
  };
  const handleSwitchToggleProduct = (newState) => {
    setActiveProduct(newState);
  };
  const handleChangeSelectedValue = (event) => {
    setSelectedValue([event.target.value]);
  };

  const handleProductTypeInputChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleTextFieldChange = (sizeName, quantity) => {
    const parsedQuantity = Number(quantity, 10);
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
    cursor: "pointer",
    p: 0,
    pl: 2,
    fontFamily: "Montserrat",
    textAlign: "center",
  };
  console.log(selectedValue);
  const handleClear = () => {
    setTextFieldValues([]); // Clear the textFieldValues array
    setFormValues({
      sizesWithQuantities: [],
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
    setSelectedValue([]);
    setTextFieldValues([]);
    setImages(Array(5).fill(null));
    setImagesMin(null);
    setImageMin(null);
    setImagesHover(null);
    setImageHover(null);
    setProductImages([]);
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

      // Check required fields
      for (let key of keysToCheck) {
        if (!data[key]) {
          toast.warn(`Maglumatlary doly giriz! (${key} is missing)`);
          return false;
        }
      }

      // Check sizes and quantities
      if (
        !data.sizesWithQuantities.length ||
        !selectedValue.length ||
        !selectedValue[0]?.sizes?.length
      ) {
        toast.warn(`Razmeri hökman girizmeli!`);
        return false;
      }

      for (let i = 0; i < data.sizesWithQuantities.length; i++) {
        const size = data.sizesWithQuantities[i];
        if (size.size === 0) {
          toast.warn(`Size for entry ${i} is invalid`);
          return false;
        }

        if (!size.quantity || size.quantity === 0) {
          toast.warn(`Haryt sany ${size.size} razmerde ýok`);
          return false;
        }
      }

      // Check images
      if (
        !imagesMin ||
        !imagesHover ||
        !images[0] ||
        !productImages.length ||
        !imageHover ||
        !imageMin
      ) {
        toast.warn(`Surat goşmaly!`);
        return false;
      }

      return true; // All checks passed
    };

    // Validate form data
    if (!checkAllData(formValues)) {
      return; // Exit if validation fails
    }

    const colorDetail = JSON.stringify(formValues);
    const body = new FormData();
    body.append("colorDetail", colorDetail);
    body.append("hoverImage", imageHover);
    body.append("productId", params.id);
    productImages.forEach((image) => body.append("fullImages", image));
    body.append("minImage", imageMin);
    dispatch(createProductColor({ body: body, id: params.id }));
    handleClear();
    setOpenProductType(false);
  };

  const navigate = useNavigate();
  const handleDelete = (id) => {
    if (id) {
      dispatch(deleteProductColor({ body: id, id: params.id }));
    }
  };

  const handleSubmitNewColor = () => {
    const colorDetail = JSON.stringify(productType);
    const body = new FormData();
    body.append("colorDetail", colorDetail);
    body.append("hoverImage", imageHover);
    body.append("productId", data?.id);
    productImages.forEach((image) => body.append("fullImages", image));
    body.append("minImage", imageMin);
    if (
      !data?.id ||
      !productType.length ||
      !productImages.length ||
      imageHover == null ||
      imagesMin == null
    ) {
      toast.error("Maglumatlary giriziň!");
      return;
    } else {
      dispatch(createProductColor({ body: body, id: data?.id }));
      // navigate("/products");
    }
  };

  const handleSubmit = () => {
    const body = {
      nameTm: formData.nameTm,
      nameRu: formData.nameEn,
      nameEn: formData.nameRu,
      barcode: formData.barcode,
      categoryId: formData.categoryId,
      subCategoryId: formData.subCategoryId,
      isActive: activeProduct,
      id: params.id,
    };
    if (
      !formData.nameTm ||
      !formData.nameEn ||
      !formData.nameRu ||
      !formData.barcode ||
      formData.categoryId == null ||
      formData.subCategoryId == null
    ) {
      toast.error("Maglumatlary giriziň!");
      return;
    } else {
      dispatch(updateProduct(body));
      navigate("/products");
    }
  };
  const selectedValueSubcategory = subCategories.find(
    (subCategory) => subCategory.id === formData.subCategoryId
  );
  console.log(selectedValueSubcategory);

  const productNavigate = (id) => {
    navigate(`/products/${params.id}/${id}`);
  };
  const handleUpdateProductType = (item) => {
    setUpdateProductType(item);
    setOpen(true);
  };
  return (
    <Box height="100vh" overflow="auto" width="100%" p={1}>
      <Stack direction="row" p="5px 13px" justifyContent="space-between">
        <Typography
          fontSize={{ lg: "20px", md: "20px", sm: "18px", xs: "16px" }}
          fontFamily="Montserrat"
          fontWeight="600"
          sx={mode === "dark" ? { color: "inherit" } : { color: "#474747" }}
          mb={2}
        >
          Haryt (Ady) : {data?.nameTm}
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
          <FormControl sx={inputStyle} size="small">
            <InputLabel>Kategoriýa</InputLabel>
            <Select
              value={formData.categoryId || ""} // Controlled value
              onChange={(event) => handleCategoryChange(event.target.value)}
              label="Kategoriýa"
            >
              {categories?.map((subCategory) => (
                <MenuItem key={subCategory.id} value={subCategory.id}>
                  {subCategory.nameTm}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={inputStyle} size="small">
            <InputLabel>Subkategoriýa</InputLabel>
            <Select
              value={formData.subCategoryId || ""} // Controlled value
              onChange={(event) => handleSubCategoryChange(event.target.value)}
              label="Subkategoriýa"
            >
              {subCategories?.map((subCategory) => (
                <MenuItem key={subCategory.id} value={subCategory.id}>
                  {subCategory.nameTm}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
              Harydyň görnüşleri {`(${productType.length})`}
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
          {status === "loading" ? (
            <Stack
              direction="column"
              height="60%"
              alignItems="center"
              sx={{ gap: "10px", pt: 8 }}
            >
              <CircularProgress />
              Loading...
            </Stack>
          ) : status === "failed" ? (
            error == "Network Error" ? (
              (toast.error("Internet baglanyşygy ýok"),
              (
                <Typography textAlign="center" color="tomato" mt={7}>
                  Internet baglanyşygy ýok
                </Typography>
              ))
            ) : (
              (toast.error(error),
              (
                <Typography textAlign="center" color="tomato" mt={7}>
                  {error}
                </Typography>
              ))
            )
          ) : status === "succeeded" ? (
            <Box>
              {data.length === 0 ? (
                <Typography textAlign="center" mt={7}>
                  Haryt gornüşi ýok!
                </Typography>
              ) : (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  border="1px solid gray"
                  borderRadius={3}
                  p={0}
                >
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
                          <TableCell sx={{ ...style2, p: 1 }}>
                            Ady (TM)
                          </TableCell>
                          <TableCell sx={{ ...style2, p: 1 }}>
                            Bahasy (TMT)
                          </TableCell>
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
                            <TableCell
                              onClick={() => handleUpdateProductType(item)}
                              sx={style2}
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell
                              onClick={() => handleUpdateProductType(item)}
                              sx={style2}
                            >
                              <img
                                src={`${BASE_URL_Img}/images/${item.minImage}`}
                                alt="image of product"
                                style={{
                                  maxWidth: "50px",
                                  maxHeight: "50px",
                                  objectFit: "contain",
                                }}
                                crossOrigin="anonymous"
                              />
                            </TableCell>
                            <TableCell
                              onClick={() => handleUpdateProductType(item)}
                              sx={style2}
                            >
                              {item.nameTm}
                            </TableCell>
                            <TableCell
                              onClick={() => handleUpdateProductType(item)}
                              sx={style2}
                            >
                              {item.sellPrice}
                            </TableCell>
                            <TableCell
                              onClick={() => handleUpdateProductType(item)}
                              sx={style2}
                            >
                              {item.discount_priceTMT}
                            </TableCell>
                            <TableCell
                              onClick={() => handleUpdateProductType(item)}
                              sx={style2}
                            >
                              {active ? "Hawa" : "Ýok"}
                            </TableCell>
                            <TableCell sx={style2}>
                              <IconButton
                                onClick={() => handleUpdateProductType(item)}
                                sx={{
                                  backgroundColor: "inherit",
                                  color: "#fff",
                                }}
                              >
                                <CreateIcon
                                  sx={{
                                    color: "#00B69B",
                                    width: 25,
                                    height: 25,
                                  }}
                                />
                              </IconButton>
                              <IconButton
                                onClick={() => handleDelete(item.id)}
                                sx={{
                                  backgroundColor: "inherit",
                                  color: "#fff",
                                }}
                              >
                                <img
                                  style={{ width: 25, height: 25 }}
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
              )}
            </Box>
          ) : null}
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
      <ProductTypeUpdate
        open={open}
        handleClose={handleClose}
        data={updateProductType}
      />
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
                    value={selectedValue[0]}
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
                {selectedValue[0]?.sizes?.length == 0 ? (
                  <Typography>Razmer ýok</Typography>
                ) : (
                  selectedValue[0]?.sizes?.map((elem) => (
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
                          )?.quantity ?? 0
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
                    onClick={handleNewProductSubmit}
                    // onClick={handleSubmitNewColor}
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
        <Stack
          alignItems="center"
          justifyContent="flex-end"
          direction="row"
          width="100%"
          mt={2}
        >
          <Stack direction="row" width="40%" spacing={2}>
            <ProductSwitchComponent
              data={data}
              onChange={handleSwitchToggleProduct}
            />
            <Button
              variant="contained"
              sx={{
                textTransform: "revert",
                width: "100%",
                height: 50,
                color: "#fff",
                bgcolor: "#00B69B",
                "&:hover": { bgcolor: "#00B69B" },
                fontWeight: 500,
                fontFamily: "Montserrat",
                fontSize: 16,
                mt: 1,
                borderRadius: 2,
              }}
              // onClick={handleNewProductSubmit}
              onClick={handleSubmit}
            >
              {/* <LuPackagePlus /> */}
              <SaveIcon style={{ width: 30, height: 30, marginRight: 8 }} />
              {/* Goşmak */}
              Ýatda sakla
            </Button>
          </Stack>
        </Stack>
      ) : (
        ""
      )}
    </Box>
  );
};

export default UpdateProduct;
