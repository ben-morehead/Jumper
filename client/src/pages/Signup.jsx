import React, { useState, useEffect, useLayoutEffect } from "react";
import './css/Signup.css';
import {Paper, Box, TextField, Button, Grid, Typography} from '@mui/material';

//REWRITING TO FUNCTION COMPONENT

function Signup(props) {

    const [usernameField, changeUsernameField] = useState("");
    const [passwordField, changePasswordField] = useState("");
    const [confirmPasswordField, changeConfirmPasswordField] = useState("");
    const [firstNameField, changeFirstNameField] = useState("");
    const [lastNameField, changeLastNameField] = useState("");
    const [authCodeField, changeAuthCodeField] = useState("");

    const [signupErrorMsg, changeErrorMsg] = useState("");
    
    const handleFirstNameChange = (e) => {
        changeFirstNameField(e.target.value);
    }

    const handleLastNameChange = (e) => {
        changeLastNameField(e.target.value);
    }

    const handleUsernameChange = (e) => {
        changeUsernameField(e.target.value);
    }

    const handlePasswordChange = (e) => {
        changePasswordField(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        changeConfirmPasswordField(e.target.value);
    }

    const handleAuthCodeChange = (e) => {
        changeAuthCodeField(e.target.value);
    }

    const validCheck = async () => {
        let error_code = 1;
        if(usernameField === "" || passwordField === "" || confirmPasswordField === "" || firstNameField === "" || lastNameField === "" || authCodeField === ""){
            console.log("ERROR_CODE = 0 SIGNUP.JSX");
            error_code = 0;
            return error_code 
        }
        if (passwordField !== confirmPasswordField){
            console.log("ERROR_CODE = 3 SIGNUP.JSX");
            error_code = 3
            return error_code
        }
        //CHECK FOR AUTH CODE - errcode = 4

        let user_check = 0; //There is no user in the database so its free to be used
        try{
            var find_user_response = await props.findUser(usernameField);
            
        } catch (error) {
            console.log(error.message);
            return -1;

        } finally {
            let resp_json = await find_user_response.json();
            if(resp_json.status_code){
                user_check = resp_json.user_status;
            }
            else{
                error_code = -1;
                console.log("ERROR: " + resp_json.error_msg);
                return error_code;
            }
        }
        
        if(!user_check){
            //ADD THE USER TO THE SERVER - IF -1 ERROR, IF 1: Information Added Succesfully
            try{
                var add_user_response = await props.onSignup({
                    username: usernameField,
                    password: passwordField,
                    first_name: firstNameField,
                    last_name: lastNameField,
                    authcode: authCodeField
                });
            } catch (error) {
                console.log(error.message);
                return -1;
            } finally {
                let resp_json = await add_user_response.json();
                if (resp_json.status_code){
                    return error_code;
                }
                else{
                    console.log("ERROR: SQL INSERT CAUSED PROBLEMS");
                    return -1;
                }
            }
        }
        else{
            error_code = 2;
            return error_code;
        }

    }

    const handleErrorCode = (code) => {
        console.log(code);
        if(code === 0){
            changeErrorMsg("Missing Fields");
            console.log(signupErrorMsg);
        }
        else if (code === 1){
            props.onLogin(usernameField, passwordField);
        }
        else if(code === 2){
            changeErrorMsg("Username Already in Use");
        }
        else if(code === 3){
            changeErrorMsg("Passwords do not Match");
        }
        else if(code === 4){
            changeErrorMsg("Authentication Code is Invalid");
        }
        else if(code === -1){
            changeErrorMsg("ERROR: Issue in Processing - Please Refresh Page");
        }
        else{
            changeErrorMsg("");
        }
    }

    const handleKeyDown = async (e) => {
        if(e.key === 'Enter'){
            console.log("Enter Key Pressed")
            //Error checking for all possible cases
            let signupErrCode = await validCheck.call();
            console.log("Signup Code: " + signupErrCode)
            handleErrorCode.call(this, signupErrCode);
        }
    }

    const err_msg = signupErrorMsg === "" ? <div></div> : (
        <Grid container display="flex" marginTop={"5%"} marginBottom={"0%"} color={"red"} justifyContent={"center"}> <b>{signupErrorMsg}</b> </Grid>
    )
    
    return(
        <div className="login-page">
            <Box display="flex" sx={{width: "100%"}} justifyContent={"center"}>
                <Paper display="flex" elevation={8} sx={{width: "90%"}} margin="auto">
                    <Typography variant="h4" sx={{marginTop: "3%"}}>Account Signup</Typography>

                    <Grid container display="flex" marginTop={"2%"}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8} >
                            <TextField color="text" size="small" label="First Name" sx={{width: "100%"}} value={firstNameField} onChange={(e) => {handleFirstNameChange(e)}} onKeyDown={(e) => {handleKeyDown(e)}}></TextField>
                        </Grid >
                        <Grid item xs={2}></Grid>
                    </Grid>

                    <Grid container display="flex" marginTop={"2%"}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8} >
                            <TextField color="text" size="small" label="Last Name" sx={{width: "100%"}} value={lastNameField} onChange={(e) => {handleLastNameChange(e)}} onKeyDown={(e) => {handleKeyDown(e)}}></TextField>
                        </Grid >
                        <Grid item xs={2}></Grid>
                    </Grid>

                    <Grid container display="flex" marginTop={"2%"}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8} >
                            <TextField color="text" size="small" label="Username" sx={{width: "100%"}} value={usernameField} onChange={(e) => {handleUsernameChange(e)}} onKeyDown={(e) => {handleKeyDown(e)}}></TextField>
                        </Grid >
                        <Grid item xs={2}></Grid>
                    </Grid>

                    <Grid container display="flex" marginTop={"2%"}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8} >
                            <TextField color="text" size="small" label="Password" sx={{width: "100%"}} type="password" value={passwordField} onChange={(e) => {handlePasswordChange(e)}} onKeyDown={(e) => {handleKeyDown(e)}}></TextField>
                        </Grid >
                        <Grid item xs={2}></Grid>
                    </Grid>
                    
                    <Grid container display="flex" marginTop={"2%"}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8} >
                            <TextField color="text" size="small" label="Confirm Password" sx={{width: "100%"}} type="password" value={confirmPasswordField} onChange={(e) => {handleConfirmPasswordChange(e)}} onKeyDown={(e) => {handleKeyDown(e)}}></TextField>
                        </Grid >
                        <Grid item xs={2}></Grid>
                    </Grid>

                    <Grid container display="flex" marginTop={"2%"}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8} >
                            <TextField color="text" size="small" label="Authorization Code" sx={{width: "100%"}} value={authCodeField} onChange={(e) => {handleAuthCodeChange(e)}} onKeyDown={(e) => {handleKeyDown(e)}}></TextField>
                        </Grid >
                        <Grid item xs={2}></Grid>
                    </Grid>

                    <Grid container display="flex" marginTop={"3%"}>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <Button variant="contained" sx={{width: "100%"}} onClick={() => {console.log("Button Pressed")}}>Login</Button>
                        </Grid >
                        <Grid item xs={4}></Grid>
                    </Grid>
                    {err_msg}
                </Paper>
            </Box>
        </div>
    )
}export default Signup