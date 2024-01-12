import _ from 'lodash';
import React, { useState, useEffect, useLayoutEffect } from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Paper, Grid, Box, Checkbox, FormGroup, FormControlLabel} from '@mui/material'
import { property } from "lodash";
import { ContactsOutlined } from "@mui/icons-material";
import './css/OptionDisplay.css';

const court_spots = [
    //Court Spot Name (Label) : Value for the "handleChange"
    "center_3pt", //0
    "left_3pt_wing", //1
    "right_3pt_wing", //2
    "left_3pt_corner", //3
    "right_3pt_corner", //4
    "left_elbow", //5
    "right_elbow", //6
    "free_throw", //7
    "left_short_corner", //8
    "right_short_corner", //9
    "center_basket", //10
    "left_basket", //11
    "right_basket" //12
];

const span_mappings = {
    "All Time": 0,
    "Last Day" : 1,
    "Last 3 Days": 3,
    "Last 5 Days": 5,
    "Last Week": 7,
    "Last Month": 30, //Can do some time math here but we'll say 30 for now
    "Last 3 Months": 90,
    "Last 6 Months": 180,
    "Last Year": 365
} //So on and so forth, we can expand outwards from here

const span_count_mappings = {
    0: "All Time",
    1: "Last Day",
    3: "Last 3 Days",
    5: "Last 5 Days",
    7: "Last Week",
    30: "Last Month", 
    90: "Last 3 Months",
    180: "Last 6 Months",
    365: "Last Year"
}


const spot_names = ["Total",
                            "Center 3 PT", 
                            "Left Wing 3 PT", 
                            "Right Wing 3 PT", 
                            "Left Corner 3 PT", 
                            "Right Corner 3 PT", 
                            "Left Elbow", 
                            "Right Elbow", 
                            "Free Throw", 
                            "Left Short Corner", 
                            "Right Short Corner", 
                            "Center Basket", 
                            "Left Basket", 
                            "Right Basket"];

//Need to re-create for shot graph

function convert_obj_to_array(obj){
    //Needs to be an object with boolean values
    const object_keys = Object.keys(obj);
    var output_arr = []
    for(let key of object_keys){
        if(obj[key]) output_arr.push(key);
    }
    return output_arr;
}

function OptionDisplay(props){

    //Menu variables, used for each of the drop down menus of the option display
    const [anchorDispEl, setAnchorDispEl] = React.useState(null);
    const [anchorGraphSpotEl, setAnchorGraphSpotEl] = React.useState(null);
    const [anchorGraphSpanEl, setAnchorGraphSpanEl] = React.useState(null);
    //Default values
    const [spotData, setSpotData] = React.useState(0);
    const [typeData, setTypeData] = React.useState({
        shots: true,
        makes: false,
        percentage: false
    });
    const [spanData, setSpanData] = React.useState(1)

    const openDispSummary = Boolean(anchorDispEl);
    const openGraphSpot = Boolean(anchorGraphSpotEl);
    const openGraphSpan = Boolean(anchorGraphSpanEl);

    const handleTrackerClick = (event) => {
        setAnchorDispEl(event.currentTarget);
    };

    const handleSpotClick = (event) => {
        setAnchorGraphSpotEl(event.currentTarget);
    }

    const handleSpanClick = (event) => {
        setAnchorGraphSpanEl(event.currentTarget);
    }

    //Used for the tracker option menu closes
    const handleTrackerClose = (dataType) => {
        setAnchorDispEl(null);
        if(dataType !== ""){
            props.setSummaryType(dataType);
        }
    };

    const handleTypeChange = (event, type_id) => {
        var output_type_data = _.cloneDeep(typeData);
        output_type_data[type_id] = event.target.checked;
        setTypeData(output_type_data);
        props.setGraphOptions(spotData, convert_obj_to_array(output_type_data), spanData);
        //console.log("Data Type Change: " + convert_obj_to_array(output_type_data));
    };

    const handleSpotClose = (spotIndex) => {    
        setAnchorGraphSpotEl(null);
        setSpotData(spotIndex);
        props.setGraphOptions(spotIndex, convert_obj_to_array(typeData), spanData); //This can be expanded out if we can read the spot data after setting it
        //console.log("Court Spot Pressed: " + court_spots[spotIndex]);
    };

    const handleSpanClose = (spanLength) => {
        setAnchorGraphSpanEl(null);
        setSpanData(spanLength);
        props.setGraphOptions(spotData, convert_obj_to_array(typeData), spanLength)
        //console.log("Span of Days: " + span_mappings[spanLength]);
    };

    const handleGraphClose = (func, data) => {
        //May cause timing issues, need to make sure that the data is set when properly setting the graph options 
        //(rn using state, if that doesn't work just apply the data directly)
        func(data);
        props.setGraphOptions()
    }

    const generateSpotOptions = () => {
        var spotNamesList = spot_names.map((name, index) => {
            return <MenuItem onClick={()=>handleSpotClose(index)} sx={{color: "#f9e400"}}>{name}</MenuItem>;
        }) 
        return spotNamesList;
    }

    const generateSpanOptions = () => {
        const spanNames = Object.keys(span_mappings);
        var spanNameList = spanNames.map((name) => {
            return <MenuItem onClick={()=>handleSpanClose(span_mappings[name])} sx={{color: "#f9e400"}}>{name}</MenuItem>;
        })
        return spanNameList;
    }

    var summaryTitle = "";
    if (props.summaryType==="shots"){
        summaryTitle="Total Shots"
    }
    else if (props.summaryType==="makes"){
        summaryTitle="Total Makes"
    }
    if (props.summaryType==="percentage"){
        summaryTitle="Shot Percentage"
    }

    var summaryData = "";
    if(props.summaryType === "percentage"){
        summaryData = ( props.summaryData.toFixed(2)*100 )+ "%"
    }
    else{
        summaryData = props.summaryData;
    }

    //Defining the different displays dependent on the mode passed in through the props (Graph vs Tracker)
    const TrackerOptions = (
        <Grid container>
            <Grid container item xs={6} flexDirection={"column"} >
                <Box border={2} borderColor={"#f9e400"} borderRadius={5} marginTop={"20px"}>
                    <Grid item>{summaryTitle}</Grid>
                    <Grid item>{summaryData}</Grid>
                </Box>
            </Grid>
            <Grid container item xs={6} justifyContent={"center"} alignItems="center">
                <div style={{width: "100%", marginTop:"20px"}}>
                    <div className="data-type-button">
                        <Button
                            id="demo-positioned-button"
                            aria-controls={openDispSummary ? 'demo-positioned-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openDispSummary ? 'true' : undefined}
                            onClick={handleTrackerClick}
                            variant="contained"
                            sx = {{width: "80%", backgroundColor: "#393939", color: "#f9e400", '&:hover': {backgroundColor: '#353535'}}}
                        >
                            {props.summaryType.toUpperCase()}
                        </Button>
                    </div>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorDispEl}
                        open={openDispSummary}
                        onClose={()=>handleTrackerClose("")}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                        }}
                    >
                        <MenuItem onClick={()=>handleTrackerClose("shots")} sx={{color: "#f9e400"}}>SHOTS</MenuItem>
                        <MenuItem onClick={()=>handleTrackerClose("makes")} sx={{color: "#f9e400"}}>MAKES</MenuItem>
                        <MenuItem onClick={()=>handleTrackerClose("percentage")} sx={{color: "#f9e400"}}>PERCENTAGE</MenuItem>
                    </Menu>    
                </div>
            </Grid>
        </Grid>
    )

    const GraphInfoOptions = (
        <Grid container>
            <Grid container item xs={4} justifyContent={"center"} alignItems="center">
                <div style={{width: "100%", marginTop:"20px"}}>
                    <div>Court Spot</div> {/* Might Want some Font Work on this */}
                    <div className="data-type-button">
                        <Button
                            id="demo-positioned-button"
                            aria-controls={openGraphSpot ? 'demo-positioned-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openGraphSpot ? 'true' : undefined}
                            onClick={handleSpotClick}
                            variant="contained"
                            sx = {{width: "80%", backgroundColor: "#393939", color: "#f9e400", '&:hover': {backgroundColor: '#353535'}}}
                        >
                            {spot_names[spotData]}
                        </Button>
                    </div>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorGraphSpotEl}
                        open={openGraphSpot}
                        onClose={()=>handleSpotClose(spotData)}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                        }}
                        sx={{
                            minWidth: "100%"
                        }}
                    >
                        {/*Want a loop of components Here - Take a list and map returning the proper component*/}
                        {generateSpotOptions()}
                    </Menu>    
                </div>
            </Grid>


            {/* Checkbox for showing makes/shots/percentage */}
            <Grid container item xs={4} flexDirection={"column"} >
                <Box border={2} borderColor={"#f9e400"} borderRadius={3} marginTop={"20px"}>
                    <Grid item>{"Data Type"}</Grid>
                    <Grid item >
                        <FormGroup>
                            <Grid container flexDirection={"row"}>
                                <Grid item xs={4}>
                                <FormControlLabel
                                    value="shots"
                                    control={<Checkbox checked={typeData["shots"]} onChange={(event) => {handleTypeChange(event, "shots")}} sx={{color: "#f9e400", '&.Mui-checked': {color: "#f9e400",},}}/>}
                                    label="Shots"
                                    labelPlacement="bottom"
                                />
                                </Grid>
                                <Grid item xs={4}>
                                <FormControlLabel
                                    value="makes"
                                    control={<Checkbox checked={typeData["makes"]} onChange={(event) => {handleTypeChange(event, "makes")}} sx={{color: "#f9e400", '&.Mui-checked': {color: "#f9e400",},}}/>}
                                    label="Makes"
                                    labelPlacement="bottom"
                                />
                                </Grid>
                                <Grid item xs={4}>
                                <FormControlLabel
                                    value="percentage"
                                    control={<Checkbox checked={typeData["percentage"]} onChange={(event) => {handleTypeChange(event, "percentage")}} sx={{color: "#f9e400", '&.Mui-checked': {color: "#f9e400",},}}/>}
                                    label="Percentage"
                                    labelPlacement="bottom"
                                />
                                </Grid>
                            </Grid>
                            </FormGroup>
                    </Grid>
                </Box>
            </Grid>
            

            {/* FOCUS POINT 1 */}
            <Grid container item xs={4} justifyContent={"center"} alignItems="center">
                <div style={{width: "100%", marginTop:"20px"}}>
                    <div>Time Span</div> {/* Might Want some Font Work on this */}
                    <div className="data-type-button">
                        <Button
                            id="demo-positioned-button"
                            aria-controls={openGraphSpan ? 'demo-positioned-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openGraphSpan ? 'true' : undefined}
                            onClick={handleSpanClick}
                            variant="contained"
                            sx = {{width: "80%", backgroundColor: "#393939", color: "#f9e400", '&:hover': {backgroundColor: '#353535'}}}
                        >
                            {span_count_mappings[spanData]}
                        </Button>
                    </div>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorGraphSpanEl}
                        open={openGraphSpan}
                        onClose={()=>handleSpanClose(spanData)}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                        }}
                    >
                        {generateSpanOptions()}
                    </Menu>    
                </div>
            </Grid>
            
        </Grid>
    )
    
    var outputOptions = props.displayMode ? GraphInfoOptions : TrackerOptions;

    return (
        <div>{outputOptions}</div>
    );
}export default OptionDisplay