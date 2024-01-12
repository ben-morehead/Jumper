import React, {useState} from 'react';
import { IconButton, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import { Box, List, Divider, ListItem, Drawer, Button, Grid } from '@mui/material';
import { MenuBook, PersonAddAlt, Menu, Login, SportsBasketball, AccountCircle } from '@mui/icons-material';
import { BrowserRouter, Route, Link, Redirect} from "react-router-dom";
import './Navigation.css';
import useMediaQuery from "@mui/material/useMediaQuery";

function Navigation(props) {

    const [openState, changeOpenState] = useState(false);

    //Screen Information Exists in the layout as well as the main App as it gets passed down
    //Media Query for Mobile vs Landscape
    //If mobile_screen_flag == 0:Landscape Mode
    //If mobile_screen_flag == 1: Mobile Mode

    const mobile_screen_flag = useMediaQuery('(max-width:768px)');

    //Put Login/Signup in this Menu
    const list = () => {
        console.log("List Function");
        var iconList = [];
        var pageList = [];
        var titleList = []
        if (mobile_screen_flag){
            if(props.user !== null){
                if(props.user){
                    iconList = [<SportsBasketball/>, <AccountCircle/>];
                    pageList = ["/shot-tracker", "/profile"];
                    titleList = ["Shot Tracker", props.user]
                }
            }
            else{
                iconList = [<SportsBasketball/>, <Login/>, <PersonAddAlt/>];
                pageList = ["/shot-tracker", "/login", "/signup"];
                titleList = ["Shot Tracker", "Login", "Signup"]
            }
            
        }
        else{
            iconList = [<SportsBasketball/>];
            pageList = ["/shot-tracker"];
            titleList = ["Shot Tracker"]
        }
        
        console.log(pageList);
       
        const listComponent = titleList.map((text, index) => (
            <ListItem key={text} disablePadding>
                <ListItemButton>
                <ListItemIcon>
                    {iconList[index]}
                </ListItemIcon>
                    <div className="link">
                        <Link to={pageList[index]}>
                            <ListItemText primary={text} />
                        </Link>
                    </div>
                </ListItemButton>
            </ListItem>
        ));
        
        return(
            <Box sx={{ width: 250 }} role="presentation" onClick={toggleMenu} onKeyDown={toggleMenu}>
                <List>
                {listComponent}
                </List>
                <Divider />
            </Box>
        );
    };

    const user_access = (buttonCSS) => {
        console.log("User Access : " + mobile_screen_flag);
        var output = <div></div>;
        if(!mobile_screen_flag){
            if(props.user !== null){
                if(props.user){
                    output = (
                        <Grid container display="flex" justifyContent={"end"}>
                            <Grid item>
                                <div className="link">
                                    <Link to={"/profile"}>
                                        <Button variant="contained" sx={ProfileButtonCSS}>{props.user}</Button>
                                    </Link>
                                </div>
                            </Grid>
                        </Grid>
                    );
                }
            }
            else{
                //GOING TO LEAVE IT FOR NOW -  BUT
                //Great opportunity to change button contribution based on the screen size, unneccessary for functionality but 
                //a nice to have - 11/21/2023
                output = (
                    <Grid container>
                        <Grid item xs = {2}></Grid>
                        <Grid item xs = {4}>
                            <div className="link">
                                <Link to={"/login"}>
                                    <Button sx={ProfileButtonCSS}>Login</Button>
                                </Link>
                            </div>
                        </Grid>
                        <Grid item xs = {4}>
                            <div className="link">
                                <Link to={"/signup"}>
                                    <Button sx={ProfileButtonCSS}>Sign Up</Button>
                                </Link>
                            </div>
                        </Grid>
                        <Grid item xs = {2}></Grid>
                    </Grid>
                );  
            }
        }        
        return output
    };

    const toggleMenu = () => {
        changeOpenState(!openState);
    }

    const MenuButtonCSS = {
        margin: "15px 15px",
        padding: "15px 15px",
        color: "black"
    };

    const ProfileButtonCSS = {
        margin: "15px 0px",
        padding: "15px 1em",
        color: "black",
        backgroundColor: "#689ccc"
    };

    const BoxCSS = {
        display: 'flex',
        width: "99vw"
    };

    
    const LinkCSS = {
        margin: "10px 20px"
    };

    const CenterCSS = {
        alignItems: "center",
        color: "white",
        display:"flex",
        justifyContent: "center"
    };
    
    console.log("Before Return Value");

    console.log("Open State: " + openState);

    return(
        <div className="Navigation-Base">
            <Grid container align="center" justify="center" direction="row">
                <Grid item xs={4}>
                    <React.Fragment>
                        <Box component="span" sx={BoxCSS}>
                            <IconButton aria-label="open menu" size="large" disableRipple  sx={MenuButtonCSS} onClick={toggleMenu}>
                                <Menu fontSize="inherit" />
                            </IconButton>
                        </Box>
                        <Drawer anchor="left" open={openState} onClose={toggleMenu}>
                            {list()}
                        </Drawer>
                    </React.Fragment>
                </Grid>
                <Grid item xs={4} sx={CenterCSS}> 
                    <h1 className="site-title">Development Site</h1>
                </Grid>
                <Grid item xs={4} display={"flex"} justifyContent={"end"} >
                    {user_access()} 
                </Grid>
            </Grid>
        </div>
    )
} export default Navigation

//OLD LIST FOR MULTIPLE APPS
/*
list(){
        const iconList = [<SportsBasketball/>, <Scoreboard/>, <MenuBook/>, <TrendingUp/>]
        const pageList = ["/shot-tracker", "/leaderboard", "/", "/"]
        return(
            <Box sx={{ width: 250 }} role="presentation" onClick={this.toggleDrawer} onKeyDown={this.toggleDrawer}>
                <List>
                {['Shot Tracker', 'Holiday Leaderboard', 'Drill Catalog', 'Progress Tracker'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            {iconList[index]}
                        </ListItemIcon>
                            <div className="link">
                                <Link to={pageList[index]}>
                                    <ListItemText primary={text} />
                                </Link>
                            </div>
                        </ListItemButton>
                    </ListItem>
                ))}
                </List>
                <Divider />
            </Box>
        );
    }
*/