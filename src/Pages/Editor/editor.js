import { Link } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloudIcon from "@mui/icons-material/Cloud";
import GoogleMapsIcon from "@mui/icons-material/Map";
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Grid } from "@mui/material";
import { doc, updateDoc, getDoc } from "firebase/firestore/lite";
import { database } from "../../firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useStyles from "./style";

const Editor = () => {
  const { sideListContainer } = useStyles();
const navigate = useNavigate();
  const params = useParams();
 
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const handleReactQuill = (value) => {
    setValue(value);
  };

  useEffect(() => {
    const autoUpdateData = setTimeout(() => {
      const documentRef = doc(database, "docs-data", params?.id);
      updateDoc(documentRef, {
        body: value,
      })
        .then(() => {
          toast.success("Document Updated", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });
        })
        .catch(() => {
          toast.error("cannot add data", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });
        });
    }, 2000);

    return () => clearTimeout(autoUpdateData);
  }, [value]);

  useEffect(() => {
    const docRef = doc(database, "docs-data", params?.id);
    getDoc(docRef)
      .then((docItem) => {
        const docItemData = docItem.data();
        setTitle(docItemData?.title);
        setValue(docItemData?.body);
      })
      .catch(() => {
        toast.error("cannot fetch data", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
      });
  }, []);
  const handleButtonClick = (link,label) => {
    if(label==="Back"){
        navigate('/mainPage')
        
    }
    else{
        window.open(link, "_blank"); // Opens a new tab with the specified URL
    }
  };

  const sideBarListItems = [
    {
      label: "Mail",
      icon: <MailIcon />,
      link: "https://mail.google.com",
    },
    {
      label: "Maps",
      icon: <GoogleMapsIcon />,
      link: "https://www.google.com/maps",
    },
    {
      label: "Drive",
      icon: <CloudIcon />,
      link: "https://drive.google.com",
    },
    {
      label: "Calender",
      icon: <CalendarTodayIcon />,
      link: "https://calendar.google.com",
    },
    {
        label: "Back",
        icon: <KeyboardReturnRoundedIcon />,
        link: "/mainPage",
      },
  ];

  return (
    <>
      <Grid container xs={12}>
        <Grid
          item
          xs={2}
          style={{
            height: "100vh",
            backgroundColor: "#D3D3D3",
            paddingTop: "30px",
          }}
        >
          <Grid container xs={12} rowGap={2}>
            {sideBarListItems.length > 0 &&
              sideBarListItems?.map((item) => (
                <Grid item xs={12}>
                  <div
                    onClick={() => handleButtonClick(item.link,item.label)}
                    className={sideListContainer}
                  >
                    <Grid
                      container
                      xs={12}
                  
                    >
                      <Grid
                        item
                        xs={2}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </Grid>
                      <Grid
                        item
                        xs={10}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          paddingLeft: "10px",
                        }}
                      >
                        {item.label}
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              ))}
          
          </Grid>
        </Grid>

        <Grid item xs={10}>
          <Grid container xs={12} rowGap={5} sx={{ padding: "20px" }}>
            <Grid
              item
              xs={12}
              textAlign={"center"}
              sx={{ fontFamily: "Poppins" }}
            >
              <h1 style={{ padding: "0", margin: "0" }}>Google Docs Clone</h1>
            </Grid>

            <Grid item xs={12} textAlign={"center"}>
              <h3 style={{ padding: "0", margin: "0" }}>
                {title.toUpperCase()}
              </h3>
            </Grid>

            <Grid item xs={12}>
              <ReactQuill value={value} onChange={handleReactQuill} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default Editor;
