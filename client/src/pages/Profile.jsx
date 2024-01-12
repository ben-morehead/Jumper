import React, { useState, useEffect, useLayoutEffect } from "react";
import { Button, Grid, Paper, Modal, Fade, Box, Typography, TextField } from '@mui/material';
import profile_photo from '../imgs/pp_benmorehead.png';

// GENERAL THOUGHTS
// Whenever the user is logged in, we want to save all of the info (name/auth_code) and continue to use this data throughout
// This will be on the App.jsx side of things
// This should be "on loggin" and get the current user "on mount"

function Profile(props){
    
    //Modal State Variables
    const [passwordModalState, setPasswordModalState] = React.useState(false);

    //Text Field State Variables
    const [oldPassword, setOldPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
    
    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
    }

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmNewPassword(e.target.value);
    }

    const handleConfirm = () => {
        //Make the call to the server to change the password if the hashes of the two values match
        //Something like: "/change-password"
        //user, new password, confirm password, capcha check???
        //Also need to check that the inputs aren't empty strings
        props.onPasswordChange(oldPassword, newPassword, confirmNewPassword);

        setPasswordModalState(false);
    }

    const handleKeyDown = async (e) => {
        if(e.key === 'Enter'){
            console.log("Enter Key Pressed")
            //Error checking for all possible cases
            //let signupErrCode = await validCheck.call();
            //console.log("Signup Code: " + signupErrCode)
            //handleErrorCode.call(this, signupErrCode);
            
        }
    }

    const modal_style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        color: "white",
        borderRadius:"5%",
        boxShadow: 24,
        p: 4
    };

    return (
    <div>
        <Grid container justifyContent={"center"}>
            <Grid item>
                {props.userInfo.first_name + " " + props.userInfo.last_name}
            </Grid>
        </Grid>
        <Grid container direction="row" spacing={2} justifyContent={"center"}>
            <Grid item>
                <Button variant="contained" onClick={() => {setPasswordModalState(true)}}>Change Password</Button>
                
                <div>
                    <Modal
                            aria-labelledby="transition-modal-title"
                            open={passwordModalState}
                            onClose={() => {setPasswordModalState(false)}}
                            closeAfterTransition
                        >
                        
                        <Fade in={passwordModalState}>
                            <Box sx={modal_style} color="primary">
                                <div>
                                    <Typography id="transition-modal-title" variant="h6" component="h2" textAlign={"center"}>
                                        Change Password
                                    </Typography>

                                    <Grid container display="flex" marginTop={"2%"}>
                                        <Grid item xs={2}></Grid>
                                        <Grid item xs={8} >
                                            <TextField color="text" size="small" label="Old Password" sx={{width: "100%"}} value={oldPassword} onChange={(e) => {handleOldPasswordChange(e)}} onKeyDown={(e) => {handleKeyDown(e)}}></TextField>
                                        </Grid >
                                        <Grid item xs={2}></Grid>
                                    </Grid>

                                    <Grid container display="flex" marginTop={"2%"}>
                                        <Grid item xs={2}></Grid>
                                        <Grid item xs={8} >
                                            <TextField color="text" size="small" label="New Password" sx={{width: "100%"}} value={newPassword} onChange={(e) => {handleNewPasswordChange(e)}} onKeyDown={(e) => {handleKeyDown(e)}}></TextField>
                                        </Grid >
                                        <Grid item xs={2}></Grid>
                                    </Grid>

                                    <Grid container display="flex" marginTop={"2%"}>
                                        <Grid item xs={2}></Grid>
                                        <Grid item xs={8} >
                                            <TextField color="text" size="small" label="Confirm New Password" sx={{width: "100%"}} value={confirmNewPassword} onChange={(e) => {handleConfirmPasswordChange(e)}} onKeyDown={(e) => {handleKeyDown(e)}}></TextField>
                                        </Grid >
                                        <Grid item xs={2}></Grid>
                                    </Grid>
                                    
                                    <Grid>
                                        <Button variant="contained" sx={{width: "70%"}} onClick = {() => {handleConfirm()}}>Confirm</Button>
                                    </Grid>
                                    <h8>
                                        ERROR MSG
                                    </h8>
                                </div>
                            </Box>
                        </Fade>
                        
                    </Modal>
                </div>
                
            </Grid>
        </Grid>
        <Grid container justifyContent={"center"}>
            <Grid item><Button variant="contained" onClick={props.handleSignOut}>Sign Out</Button></Grid>
        </Grid>
    </div> 
    );
} export default Profile;