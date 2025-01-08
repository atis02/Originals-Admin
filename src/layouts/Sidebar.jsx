import React, { useState, useEffect } from "react";
import {
  Badge,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import { MenuItem, Menu, Sidebar, sidebarClasses } from "react-pro-sidebar";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EmailIcon from "@mui/icons-material/Email";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import SmsIcon from "@mui/icons-material/Sms";
import { dbDoc } from "../Components/db/dbDocuments.mjs";
import axios from "axios";
import { logout } from "../Components/db/Redux/reducers/ReduxSlice";
import { ToastContainer, toast } from "react-toastify";
import { useThemeContext } from "../Components/db/Theme/ThemeContext";
import LogoutIcon from "@mui/icons-material/Logout";
import ClearIcon from "@mui/icons-material/Clear";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { PiPackageFill } from "react-icons/pi";

export default function SidebarNav() {
  const [open, setOpen] = useState(() =>
    JSON.parse(localStorage.getItem("sidebarOpen"))
  );
  const { mode, toggleMode } = useThemeContext();
  console.log(open);

  const handleOpen = () => {
    setOpen(true);
    localStorage.setItem("sidebarOpen", true);
  };
  const handleClose = () => {
    setOpen(false);
    localStorage.setItem("sidebarOpen", false);
  };
  const navigate = useNavigate();
  // const stateDocs = useSelector((state) => state.sendedDocs);
  // const DeletedDocs = JSON.parse(localStorage.getItem("deletedDocs")) || [];
  // const isLoggedIn = useSelector((state) => state.auth.user);

  // const Logout = async () => {
  //   const response = await axios
  //     .post("https://alemhasap.alemtilsimat.com/api/auth/signout")
  //     .then(
  //       (res) => console.log(res),
  //       localStorage.removeItem("token"),

  //       dispatch(logout()),
  //       setTimeout(() => navigate("/login"), 1000),
  //       toast.success("Succesfully Logout!")
  //     );
  // };
  // const dispatch = useDispatch();

  const Logout = () => {
    localStorage.removeItem("token");
    setTimeout(() => navigate("/login"), 1000);

    toast.success("Üstünlikli!");
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            // backgroundColor: "#010409",
            // color: "#F3F3F4",
            backgroundColor: mode === "dark" ? "#0D1117" : "#F3F2F7",
            color: mode === "dark" ? "#ffffff" : "#474747",
            maxHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRight:
              mode === "dark"
                ? "1px solid rgb(85, 85, 85)"
                : "1px solid lightgray",
          },
        }}
        className="sidebar"
        style={{
          minHeight: "100vh",
          ...(open
            ? {
                minWidth: "250px",

                width: { ...(isMobile ? "150px" : "250px") },
              }
            : {
                width: "80px",
                minWidth: "80px",
              }),
          ...(isMobile ? { display: "none" } : { display: "flex" }),
          border: "none",
        }}
      >
        <Stack>
          <Stack
            sx={{ ...(open ? "" : { flexDirection: "column" }) }}
            height="54px"
            direction="row"
            alignItems="center"
            justifyContent="center"
            m="20px 30px"
          >
            <Link style={{ textDecoration: "none" }} to="/">
              {/* <ToastContainer /> */}
              <Typography
                color={mode === "dark" ? "#ffffff" : "#474747"}
                fontWeight="700"
                sx={{ ...(open ? { fontSize: "20px" } : { fontSize: "16px" }) }}
                textAlign="center"
                fontFamily="Montserrat"
              >
                Originals Admin
              </Typography>
            </Link>
            {open ? (
              <IconButton
                color="inherit"
                sx={{
                  // color: "#F3F3F4",
                  ...(open
                    ? ""
                    : {
                        width: "30px",
                        height: "30px",
                        backgroundColor:
                          mode === "dark" ? "#0D1117" : "#F3F2F7",
                      }),
                }}
                onClick={handleClose}
              >
                {" "}
                <ClearIcon />
              </IconButton>
            ) : (
              <IconButton
                color="inherit"
                sx={{
                  // color: "#F3F3F4",
                  ...(open
                    ? ""
                    : {
                        width: "30px",
                        height: "30px",
                        backgroundColor:
                          mode === "dark" ? "#0D1117" : "#F3F2F7",
                      }),
                }}
                onClick={handleOpen}
              >
                {" "}
                <MenuOpenIcon />
              </IconButton>
            )}
          </Stack>
          <Menu
            menuItemStyles={{
              button: {
                // ...(open ? { margin: "5px" } : { margin: "0" }),

                margin: "5px",
                backgroundColor: mode === "dark" ? "#0D1117" : "#F3F2F7",
                "&:hover": {
                  // backgroundColor: "#2c2c2c",
                  backgroundColor: mode === "dark" ? "#2c2c2c" : "#F8F9FA",
                  borderRadius: "7px",
                  // ...(open ? { margin: "3px" } : { margin: "0" }),
                  margin: "5px",
                  color: mode === "dark" ? "#ffffff" : "#0D1117",
                },
              },
            }}
          >
            <MenuItem
              component={<NavLink className="sideNav" to="/" />}
              icon={<HomeIcon />}
            >
              {open ? "Baş sahypa" : ""}
            </MenuItem>
            <MenuItem
              component={<NavLink className="sideNav" to="/dashboard" />}
              icon={<DashboardIcon />}
            >
              {open ? "Dolandyryş" : ""}
            </MenuItem>

            <MenuItem
              component={<NavLink className="sideNav" to="/category" />}
              icon={<CategoryIcon />}
            >
              {open ? "Kategoriýa" : ""}
            </MenuItem>

            <MenuItem
              component={<NavLink className="sideNav" to="/subcategory" />}
              icon={<WidgetsIcon />}
            >
              {open ? "Subkategoriýa" : ""}
            </MenuItem>
            <MenuItem
              component={<NavLink className="sideNav" to="/products" />}
              icon={<PiPackageFill size={26} />}
            >
              {open ? "Harytlar" : ""}
            </MenuItem>
            {/*  <MenuItem
              component={<NavLink className="sideNav" to="/video" />}
              icon={<YouTubeIcon />}
            >
              {open ? "Video" : ""}
            </MenuItem>
            <MenuItem
              component={<NavLink className="sideNav" to="/gift-cards" />}
              icon={<CardGiftcardIcon />}
            >
              {open ? "Sowgat Kartlary" : ""}
            </MenuItem>
            <MenuItem
              component={<NavLink className="sideNav" to="/subscription" />}
              icon={<CardGiftcardIcon />}
            >
              {open ? "Abuna" : ""}
            </MenuItem> */}
            <MenuItem
              component={<NavLink className="sideNav" to="/account" />}
              icon={<AccountCircleIcon />}
            >
              {open ? "Profil" : ""}
            </MenuItem>
          </Menu>
        </Stack>

        <Stack
          direction={open ? "row" : "column"}
          alignItems="center"
          justifyContent="space-evenly"
          mb={2}
          spacing={1}
        >
          {/* <Stack>
          
        </Stack> */}
          <IconButton
            onClick={toggleMode}
            sx={{
              border:
                mode === "dark"
                  ? "1px solid rgb(85, 85, 85)"
                  : "1px solid gray",
            }}
            color="inherit"
          >
            {mode === "dark" ? (
              <LightModeIcon sx={{ width: 25, height: 25 }} />
            ) : (
              <DarkModeIcon sx={{ width: 25, height: 25 }} />
            )}
          </IconButton>
          {/* <IconButton
            color="inherit"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1px",
              fontSize: "12px",
              fontFamily: "Montserrat",
            }}
          >
            <HelpOutlineIcon sx={{ width: 25, height: 25 }} />
            Kömek
          </IconButton> */}
          <IconButton
            onClick={Logout}
            color="inherit"
            sx={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Montserrat",
              fontSize: "11px",
            }}
          >
            <LogoutIcon sx={{ width: 25, height: 25 }} />

            {/* Çykmak */}
          </IconButton>
        </Stack>
      </Sidebar>
    </>
  );
}
