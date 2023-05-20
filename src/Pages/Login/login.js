import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import GoogleButton from "react-google-button";
import "./login.css";
import { Grid } from "@mui/material";

function Login() {
  let navigate = useNavigate();
  let auth = getAuth();
  let googleProvider = new GoogleAuthProvider();
  const signIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        localStorage.setItem("userEmail", res.user.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (response) => {
      if (response) {
        navigate("/mainPage");
      } else {
        navigate("/");
      }
    });
  }, []);
  return (
    <Grid container xs={12}>
      <Grid item xs={12} textAlign={"center"} sx={{fontFamily: "Poppins"}}>
        <h1>Google Docs Clone</h1>
      </Grid>
      <Grid
        item
        xs={12}
        textAlign={"center"}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <GoogleButton onClick={signIn} />
      </Grid>
    </Grid>
  );
}

export default Login;
