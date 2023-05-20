import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Button from "../../Elements/button";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
   query, onSnapshot, orderBy,Timestamp 
} from "firebase/firestore/lite";
import useStyles from "./style";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { database } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [title, setTitle] = useState("");
  const { logoutBtn, logoutBtnContainer, inputStyle, addBtn } = useStyles();

  let dataBasecollection = collection(database, "docs-data");

  let userEmail = localStorage.getItem("userEmail");
  let auth = getAuth();
  let navigate = useNavigate();

  const Logout = () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  const [firebaseDocs, setFirebaseDocs] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [dataAdded, setDataAdded] = useState(false);

  const addDocument = () => {
    addDoc(dataBasecollection, {
      title: title,
      author: userEmail,
      body: "",
      createdAt: new Date().toISOString(),
    })
      .then((response) => {
        toast.success("Document Created", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
        setDataAdded(!dataAdded)
        setIsAdd(false);
        setTitle("");
      })
      .catch(() => {
        toast.error("cannot add data", {
          autoClose: 1000,
        });
      });
  };

  
  useEffect(() => {
    
    getDocs(collection(database, "docs-data")).then((doc) => {
      const firebaseDocsCopy = [];
      doc?.docs?.forEach((docItem) => {
        firebaseDocsCopy.push({ ...docItem.data(), id: docItem.id })     
        
      });
      const sortedData = firebaseDocsCopy.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setFirebaseDocs(sortedData)
    });

   
  }, [dataAdded]);

 
 

  const handleDoc =(id)=>{
navigate(`/editor/${id}`)
  }

  return (
    <>
      <div className={logoutBtnContainer}>
        {/* <button className={logoutBtn} onClick={Logout}>
          Log Out
        </button> */}
      </div>
      <Grid
        container
        // justifyContent="center"
        // alignItems="center"
        direction="column"
        padding={"0px 10px 10px 20px"}
      >
       
        <Grid item xs={12} sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
          <Button label={"ADD DOCUMENT"} onClick={() => setIsAdd(!isAdd)} />
        </Grid>
        {isAdd && (
          <Grid item xs={12} className={inputStyle}>
            <input
              placeholder="Add a Title.."
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              style={{
                height: "20px",
                padding: "10px",
                border: "1px solid #9e9e9e",
                outline: "none",
                borderRadius: "3px",
              }}
            />
            <button className={addBtn} onClick={addDocument}>
              Add
            </button>
          </Grid>
        )}
        <Grid item xs={12}>
          <Grid container xs={12}>
            {firebaseDocs?.map((docItems) => (
              <Grid item xs={3}>
                <div
                  onClick={()=>handleDoc(docItems?.id)}
                  style={{
                    border: "1px solid #A9B5B9",
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "10px 10px 0px 0px",
                    cursor: "pointer"
                  }}
                >
                  {docItems?.title}
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default Home;
