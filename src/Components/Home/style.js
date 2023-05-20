import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  logoutBtn: {
    height: "40px",
    width: "100px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },

  logoutBtnContainer: {
    position: "absolute",
    top: "20px",
    right: "10px",
  },

  inputStyle: {
    marginTop: "20px !important",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Poppins",
  },

  addBtn: {
    width: "50px",
    height:"42px",
    backgroundColor: "#212121",
    color: "whitesmoke",
    fontFamily: "Poppins",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
  },
});

export default useStyles;
