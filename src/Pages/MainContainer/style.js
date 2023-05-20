import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    logoutBtn:{
        
        cursor:"pointer",
        height:"25px",
        margin:"10px",
        borderRadius:"5px",
        border:"none",
        
        "&:hover":{
            backgroundColor:"#C7C7D3",
            
        }
    }
});

export default useStyles;
