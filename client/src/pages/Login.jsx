import React, { useState, useEffect, useLayoutEffect } from "react";
import './css/Login.css';
import {Paper, Box, TextField, Button, Grid, Typography} from '@mui/material';

import useMediaQuery from "@mui/material/useMediaQuery";

function Login(props){
    
    //State definitions
    const [usernameField, changeUsernameField] = useState("");
    const [passwordField, changePasswordField] = useState("");
    const [loginErrorMsg, changeErrorMsg] = useState("");

    
    //Media Query for Mobile vs Landscape
    //If mobile_screen_flag == 0:Landscape Mode
    //If mobile_screen_flag == 1: Mobile Mode
    const mobile_screen_flag = useMediaQuery('(max-width:768px)');
    
    //Media Query setup - USED MAINLY FOR DEBUGGING
    const xs_flag = useMediaQuery('(max-width:600px)');//Small Phones (600px and down)
    const s_flag = useMediaQuery('(min-width:600px)'); //Tablet Horizontal/Vertical/Phone Horizontal
    const m_flag = useMediaQuery('(min-width:768px)'); //Bigger computers (Assume )
    const l_flag = useMediaQuery('(min-width:992px)'); // 1024,768
    const xl_flag = useMediaQuery('(min-width:1200px)')

    const get_screen_size_char = () => {
        //PURELY FOR DEBUGGING PURPOSES
        if(xl_flag){
            return 'xl'
        }
        else if(l_flag){
            return 'l';
        }
        else if(m_flag){
            return 'm';
        }
        else if(s_flag){
            return 's';
        }
        else if (xs_flag){
            return 'xs';
        }
        else{
            return 'MEDIA QUERY ERROR';
        }
    }

    //Turn username field value to the username state
    const handleUsernameChange = (e) =>{
        changeUsernameField(e.target.value);
    }

    //Turn password field value to the password state
    const handlePasswordChange = (e) => {
        changePasswordField(e.target.value);
    }

    //Call for login, waits for the onLogin props function then changes the error message
    const handleLogin = async (username, password) => {
        let err_code = await props.onLogin(username, password);
        if (err_code === -1){
            changeErrorMsg("Missing Username or Password");
        }
        else if (err_code === 0){
            changeErrorMsg("Invalid Username and Password Combination");
        }
        else{
            changeErrorMsg("");
        }
    }

   //Enter button press handler
   const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            handleLogin.call(this, usernameField, passwordField);
        }
    }

    const err_msg = loginErrorMsg === "" ? (<div></div>) : (<Grid container display="flex" marginTop={"5%"} marginBottom={"0%"} color={"red"} justifyContent={"center"}> <b>{loginErrorMsg}</b> </Grid> )

    return(
        <div className="login-page">
            <Box display="flex" sx={{width: "100%"}} justifyContent={"center"}>
                <Paper display="flex" elevation={8} sx={{width: "90%"}} margin="auto">
                    <Typography variant="h4" sx={{marginTop: "5%"}}>User Login</Typography>
                    <Grid container display="flex" marginTop={"5%"}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8} >
                            <TextField color="text" label="Username" sx={{width: "100%"}} value={usernameField} onChange={(e) => {handleUsernameChange.call(this, e)}} onKeyDown={(e) => {handleKeyDown.call(this, e)}}></TextField>
                        </Grid >
                        <Grid item xs={2}></Grid>
                    </Grid>
                    
                    <Grid container display="flex" marginTop={"5%"}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8} >
                            <TextField color="text" label="Password" sx={{width: "100%"}} type="password" value={passwordField} onChange={(e) => {handlePasswordChange.call(this, e)}} onKeyDown={(e) => {handleKeyDown.call(this, e)}}></TextField>
                        </Grid >
                        <Grid item xs={2}></Grid>
                    </Grid>

                    <Grid container display="flex" marginTop={"7%"}>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <Button variant="contained" sx={{width: "100%"}} onClick={() => handleLogin.call(this, usernameField, passwordField)}>Login</Button>
                        </Grid >
                        <Grid item xs={4}></Grid>
                    </Grid>
                    {err_msg}
                    {"Screen Size: " + get_screen_size_char()}
                </Paper>
            </Box>
        </div>
    )
}export default Login