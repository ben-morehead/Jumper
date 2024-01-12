import React, { useState, useEffect, useLayoutEffect } from "react";
import {Routes, Route, useNavigate} from "react-router-dom";
import Layout from "./pages/Layout";
import LeaderBoard from "./pages/Leaderboard";
import NoPage from "./pages/NoPage";
import './App.css';
import ShotTracker from "./pages/ShotTracker";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import { createTheme, ThemeProvider} from '@mui/material/styles';

function App(){
    //Navigate hook for redirecting page
    const navigate = useNavigate();
    
    //State variables
    const [userInfo, changeUserInfo] = useState({
        first_name: "",
        last_name: "",
        auth_code: ""
    });
    const [currentUser, changeCurrentUser] = useState("");
    const [loadingState, changeLoadingState] = useState(false);
    const [accessState, changeAccessState] = useState("USER0");
    
    
    //CONVERT INTO ASYNC/AWAIT because stuff is being weird
    const handleGetCurrentUser = async () => {
        changeLoadingState(true);
        try{
            var res = await fetch("/current-user", {
                method: 'GET',
                mode: 'cors'
            })
        }
        catch (err) {
            console.log(err.message);
        }
        finally {
            let data = await res.json() //Reminder, res.json() also takes time to return (its not immediate)
            changeCurrentUser(data.lastUser);
            if(data.userInfo.status){
                console.log(data.userInfo)
                changeUserInfo({first_name: data.userInfo.first_name, 
                                last_name: data.userInfo.last_name, 
                                auth_code: data.userInfo.auth_code});//Might add some issues with timing, need to see how the name gets loaded on the profile screen
            }
            
        }
        changeLoadingState(false);
    }

    //Post first-rendering (Mount) useEffect instance
    useLayoutEffect(() => {
        handleGetCurrentUser.call();
    }, []);
    

    //Signout Function to be passed to profile
    const handleSignOut = () => {
        changeLoadingState(true);
        fetch("/signout", {
            method: 'GET',
            mode: 'cors'
        })
        .then((res) => res.json())
        .then((data) => {
            changeCurrentUser(data.lastUser);
            changeLoadingState(false);
            navigate("/login");
            })
        .then(error => {
            console.log(error)
        })
        .catch(console.error);
    }

    const handleUserSignup = async (param_obj) => {
        return await fetch('/add-user', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(param_obj),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

    }

    const findUserInfo = async (username) => {
        return await fetch('/username-check', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                "username": username
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }

    //Grabbing login from the server based on username and password
    const handleUserLogin = async (username, password) => {
        console.log("Login Requested with Username :'" + username + "' and Password: '" + password +"'");
        try{
            var response = await fetch('/auth', {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    "username": username,
                    "password": password
    
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
        }
        catch (err) {
            console.log(err.message);
            return -1
        }
        finally {
            let data = await response.json();
            if(data.login_user){
                console.log("USER INFO FROM SERVER");
                console.log(data.userInfo);
                changeUserInfo({first_name: data.userInfo.first_name, 
                                last_name: data.userInfo.last_name, 
                                auth_code: data.userInfo.auth_code});//Might add some issues with timing, need to see how the name gets loaded on the profile screen
                changeCurrentUser(username);
                navigate("/shot-tracker");
            }
            else{
                return data.login_status;
            }
            return 1;
        }    
    }

    const handlePasswordChange = async(old_pass, new_pass, conf_pass) => {
        console.log("handlePasswordChange -- DEBUG -- TO REMOVE -- " + currentUser + ":" + old_pass + ":" + new_pass + ":" + conf_pass);
        try{
            var response = await fetch('/change-password', {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    "username": currentUser,
                    "old_password": old_pass,
                    "new_password": new_pass,
                    "confirm_password": conf_pass
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
        }
        catch (err) {
            console.log(err.message);
            return -1
        }
        finally{
            //A good response returns response code of 0
            //A bad response returns response code > 0 with following reasons
            //1. Invalid Old Password
            //2. Non-matching new passwords
            //3. Other ---

            let data = await response.json();
            let retval = data.response_code;
            console.log("Change Password Response Code: " + retval);
            return retval;
        }
    }

    //Themes of the application
    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#3f51b5',
            },
            secondary: {
                main: '#f9e400',
            },
            background: {
                paper: '#272727',
            },
        },
    })

    //Sanity Check
    console.log("App Component Call")
    
    //Theme Provider for implementing the theme
    //Routes for each of the pages
    if(loadingState){
        return <div></div>
    }

    return (
        <ThemeProvider theme={theme}> 
                <Routes>
                    <Route path="/" element={<Layout user={currentUser}/>}>
                        <Route index element={<Login onLogin={handleUserLogin}/>} />
                        <Route path="shot-tracker" element={<ShotTracker currentUser={currentUser} accessLevel={accessState} changeLoadingState={changeLoadingState}/>} />
                        <Route path="leaderboard" element = {<LeaderBoard accessLevel={accessState}/>} />
                        <Route path="login" element = {<Login onLogin={handleUserLogin}/>} />
                        <Route path="signup" element = {<Signup onSignup={handleUserSignup} findUser={findUserInfo} onLogin={handleUserLogin}/>} />
                        <Route path="profile" element = {<Profile handleSignOut={handleSignOut} userInfo={userInfo} onPasswordChange={handlePasswordChange}/>} />
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
        </ThemeProvider>
    );
}
export default App;
