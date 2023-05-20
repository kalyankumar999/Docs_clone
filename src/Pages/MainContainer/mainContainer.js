import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import Home from '../../Components/Home';
import { useNavigate } from "react-router-dom";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import useStyles from './style';

const MainContainer = () => {

  const{logoutBtn}=useStyles();
  let navigate = useNavigate();
  let auth = getAuth();

  const Logout = () => {
    signOut(auth).then(() => {
      navigate("/");
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
    <>
    <Grid container xs={12}>

    <Grid item sx={12} textAlign={"center"}>
      <button className={logoutBtn} onClick={Logout}>
          Log Out
        </button>
      </Grid>
      <Grid item xs={12} textAlign={"center"} sx={{fontFamily: "Poppins"}}>
      <h1>Google Docs</h1>
      </Grid>
   
      <Grid item xs={12}>
        <Home/>
      </Grid>
    </Grid>
    

    </>
  )
}

export default MainContainer