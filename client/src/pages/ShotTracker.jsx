import React, {useState, useEffect} from 'react';
import _ from 'lodash';

//Material UI Components and Icons
import {Paper, Grid, Box, Button, Fade, Modal, Typography} from '@mui/material'
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

//Custom Project Components
import ShotDisplay from "./components/ShotDisplay"
import ShotGraph from "./components/ShotGraph"
import DateDisplay from "./components/DateDisplay"
import OptionDisplay from "./components/OptionDisplay"

//Date Handler
import dayjs, { Dayjs } from 'dayjs';

//Modal Calendar Imports
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import './css/ShotTracker.css';

//REWRITING TO FUNCTION COMPONENT - TODO: 11/21/2023

function ShotTracker(props){
    //Current date being adjusted, default is todays date
    var date = dayjs(); 
    
    //Default shot chart value
    const default_shot_chart = {
        shots: {
            center_3pt: 0,
            left_3pt_wing: 0,
            right_3pt_wing: 0,
            left_3pt_corner: 0,
            right_3pt_corner: 0,
            left_elbow: 0,
            right_elbow: 0,
            free_throw: 0,
            left_short_corner: 0,
            right_short_corner: 0,
            center_basket:0,
            left_basket: 0,
            right_basket: 0
        },
        makes: {
            center_3pt: 0,
            left_3pt_wing: 0,
            right_3pt_wing: 0,
            left_3pt_corner: 0,
            right_3pt_corner: 0,
            left_elbow: 0,
            right_elbow: 0,
            free_throw: 0,
            left_short_corner: 0,
            right_short_corner: 0,
            center_basket:0,
            left_basket: 0,
            right_basket: 0
        },
        percentage: {
            center_3pt: 0,
            left_3pt_wing: 0,
            right_3pt_wing: 0,
            left_3pt_corner: 0,
            right_3pt_corner: 0,
            left_elbow: 0,
            right_elbow: 0,
            free_throw: 0,
            left_short_corner: 0,
            right_short_corner: 0,
            center_basket:0,
            left_basket: 0,
            right_basket: 0
        }
    };

    // State Defintion
    //  dateState: Date selected
    //  data_type: Summary display type
    //  summary_val: Total shots/makes/percentage
    //  shot_chart: Shot information for the Shot display
    //  display_mode: Mode for the main view (Shot Display or Shot Graph)
    //  calendar_modal: calendar modal flag
    //  calendar_date: date within the calendar popup
    //  graph_options: Option object for the graph
    //  graph_spot: id num for the shot spot - mapping in OptionDisplay/court_spots
    //  graph_span: integer starting at 1 meant for display how far back to go
    //  graph_types: ["shots"]
    const [dateState, changeDateState] = useState(date.format('dddd, MMMM D, YYYY'));
    const [dataTypeState, changeDataTypeState] = useState('shots');
    const [summaryValState, changeSummaryValState] = useState(0);
    const [shotChartState, changeShotChartState] = useState(_.cloneDeep(default_shot_chart));
    const [displayModeState, changeDisplayModeState] = useState(1);
    const [calendarModalState, changeCalendarModalState] = useState(false);
    const [calendarDateState, changeCalendarDateState] = useState(date.format('dddd, MMMM D, YYYY'));
    const [graphOptionsState, changeGraphOptionsState] = useState({});
    const [graphSpotState, changeGraphSpotState] = useState(0);
    const [graphSpanState, changeGraphSpanState] = useState(1);
    const [graphTypesState, changeGraphTypesState] = useState(["shots"]);

    const getShotGraphOptions = (spot, type, span) => {
        //Get the options from the server and store it in the options member of the state
        //pass that state down through the props of the ShotGraph
        //On change of state it will re-render and when the fetch completes it will re-render again so don't want
        //to run it again
        //
        //Need to pay attention to how the data changes as certain elements are changed
        console.log("Current Graph Info: Spot[" + spot + "] Span[" + span + "] Type: [" + type + "]"); //Info does not immediately update in this 
        fetch('/get-graph-options', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                username: props.currentUser,
                date: date.format('YYYY-MM-DD'),
                dateSpan: span,
                spot: spot, //needs to be in undercase form
                dataType: type
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("THE DATA: ");
            console.log(data.graphOptions)
            changeGraphOptionsState(data.graphOptions)
        })
        .catch(console.error);
    } //CLEAR

    const changeShotGraphInputData = (spot, dataTypes, dateSpan) => {
        //Updating the shot graph input data based on the functions arguments
        changeGraphSpotState(spot);
        changeGraphTypesState(dataTypes);
        changeGraphSpanState(dateSpan);

        //Getting the next set of graph options
        getShotGraphOptions(spot, dataTypes, dateSpan);
    } //CLEAR
    
    const updateDataSummary = (data_obj, input_type) => {
        var shot_info = Object.values(data_obj[input_type]);
        if(input_type === "shots"){
            console.log(shot_info);
            let sum_val = shot_info.reduce((a, b) => {
                return a + b;
            }, 0); //SUMMING Function
            changeSummaryValState(sum_val);
        }
        else if(input_type === "makes"){
            let sum_val = shot_info.reduce((a, b) => {
                return a + b;
            }, 0); //SUMMING Function
            changeSummaryValState(sum_val);
        }
        else if(input_type === "percentage"){
            let perc_val = 0;
            let shot_info_length = shot_info.length;
            var sum_count = 0;
            let sum_val = shot_info.reduce((a, b) => {
                if(b!==0){
                    sum_count++;
                }
                return a + b;
            }, 0); //SUMMING Function
            if(sum_count !== 0){
                perc_val = sum_val / sum_count;
            }//AVERAGING
            changeSummaryValState(perc_val);
        }
        else{
            console.log("ERROR: NO DATATYPE FOR this.state.shot_chart")
        }
    } //CLEAR

    const changeDataType = (input_type) => {
        changeDataTypeState(input_type);
        updateDataSummary(shotChartState, input_type);
    }//CLEAR

    const loadShotData = (username, date) => {
        fetch("/get-shotdata", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                user_input: username,
                date_input: date
            })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if(data.success){
                changeShotChartState(_.cloneDeep(data.shot_data));
                updateDataSummary(data.shot_data, dataTypeState);
            }
            else{
                changeShotChartState(_.cloneDeep(default_shot_chart));
                updateDataSummary(default_shot_chart, dataTypeState);
            }
            console.log(shotChartState);
        })
        .catch(console.error);
    } //CLEAR

    const handleChangeShotChart = (data_type, key, value) => {
        const shot_chart_val = {...shotChartState};
        shot_chart_val[data_type][key] = value;
        changeShotChartState(shot_chart_val);
        updateDataSummary(shot_chart_val, dataTypeState);
    } //CLEAR

    const handleClearShotChart = () => {
        changeShotChartState(_.cloneDeep(default_shot_chart));
        updateDataSummary(default_shot_chart, dataTypeState);
    } //CLEAR

    const handleBackwardsDate = () => {
        updateShotData();
        date = date.subtract(1, 'day');
        //Read the data for that date and populate the shot chart
        changeDateState(date.format('dddd, MMMM D, YYYY'));
        changeCalendarDateState(date.format('dddd, MMMM D, YYYY'));
        loadShotData(props.currentUser, String(date.format('YYYY-MM-DD')));
        getShotGraphOptions(graphSpotState, graphTypesState, graphSpanState);
    } //CLEAR

    const handleForwardsDate = () => {
        //Updating server side shotchart data
        updateShotData();
        date = date.add(1, 'day');
        //Read the data for that date and populate the shot chart
        changeDateState(date.format('dddd, MMMM D, YYYY'));
        changeCalendarDateState(date.format('dddd, MMMM D, YYYY'));
        loadShotData(props.currentUser, String(date.format('YYYY-MM-DD')));
        getShotGraphOptions(graphSpotState, graphTypesState, graphSpanState);
    } //CLEAR

    const handleCalendarModalOpen = () => {
        console.log("Modal Open, Current State Date: " + dateState);
        changeCalendarModalState(true);
    } //CLEAR

    const handleCalendarModalClose = () => {
        changeCalendarModalState(false);
    } //CLEAR

    const handlePickerChange = (value) => {
        changeCalendarDateState(value.format('dddd, MMMM D, YYYY'));
    } //CLEAR

    const handlePickerAccept = () => {
        updateShotData();
        date = dayjs(calendarDateState);
        
        changeDateState(this.date.format('dddd, MMMM D, YYYY'));
        handleCalendarModalClose();
        loadShotData(props.currentUser, String(date.format('YYYY-MM-DD')));
    } //CLEAR

    const updateShotData = () => {
        fetch('/set-shotdata', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                user: props.currentUser,
                date: date.format('YYYY-MM-DD'),
                shot_data: shotChartState
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err.message);
        });
    } //CLEAR

    

    useEffect(() => {
        loadShotData(props.currentUser, date.format('YYYY-MM-DD'));
        getShotGraphOptions(graphSpotState, graphTypesState, graphSpanState);
      }, [])

    //MUI STYLINGS
    const BasePaperCSS = {
        width: "95%",
        flexGrow: 0.98 //As we fill it out the number will likely have to be futsed around with
    };

    const modal_style={
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        color: "white",
        borderRadius:"5%",
        boxShadow: 24,
        p: 4,
    };
    
    //Date value assignment
    const dateVal = dateState;
        
    //Checking for empty user - Will also indicate whether the auth code is
    if(!props.currentUser){
        return (<div>Feature Unavailable</div>);
    }

    //Toggling between the shot display (for tracking) and the shot graph (for checking results)
    var shot_disp = <ShotDisplay shotChart={shotChartState} dataType={dataTypeState} onChangeShotChart={handleChangeShotChart} clearDisplay={handleClearShotChart}/>
    var shot_icon = <BarChartIcon className="svg_icons" fontSize="large" sx={{minHeight: "100%", color: "#f9e400"}}></BarChartIcon>
    if(displayModeState !== 0) {
        shot_disp = <ShotGraph options={graphOptionsState} />
        shot_icon = <SportsBasketballIcon className="svg_icons" fontSize="large" sx={{minHeight: "100%", color: "#f9e400"}}></SportsBasketballIcon>
    }

    return (
        <div className="Shot-Tracker Shot-Tracker-header">
            <Paper elevation={12} sx={BasePaperCSS}>
                <Box sx={{ width: '100%'}}>
                    <Grid container direction="row" spacing={1}>

                        {/*Button for Switching Between Display Modes*/}
                        <Grid item container xs={2} justifyContent={"center"}>
                            <div className="toggle-chart-button">
                                <Button variant="contained" size="large" sx={{width: "100%", minHeight: "80px", backgroundColor: "#393939", '&:hover': {backgroundColor: '#353535'}}} onClick={() => {
                                        changeDisplayModeState(Number(!displayModeState));
                                    }
                                }>
                                    {shot_icon}
                                </Button>
                            </div>
                        </Grid>

                        {/*MAIN DISPLAY - Dats + Options + Data Displays*/}
                        <Grid item xs={8}>
                            <Grid container direction="column">
                                <Grid item>
                                    <DateDisplay 
                                        date={dateVal} 
                                        onBackwardsDate={handleBackwardsDate} 
                                        onForwardsDate={handleForwardsDate} 
                                    />
                                </Grid>
                                <Grid item>
                                    <OptionDisplay displayMode={displayModeState}
                                                   summaryType={dataTypeState} 
                                                   summaryData={summaryValState} 
                                                   setSummaryType={changeDataType}
                                                   setGraphOptions={changeShotGraphInputData}/>
                                </Grid>
                                <Grid item>
                                    {shot_disp}
                                </Grid>
                            </Grid>
                        </Grid>

                        {/*Button for Calendar Style Selection
                        
                            TODO: To be done manually using a modal (See ShotSpot.jsx) and a <DateCalendar />
                            TODO: Need to replace: this.state.modalOpen, this.handleModalClose, this.state.modalOpen, modal_style

                        */}
                        <Grid item container xs={2} justifyContent={"center"}>
                            <div className="toggle-chart-button">
                                <Button variant="contained" size="large" sx={{width: "100%", minHeight: "80px", backgroundColor: "#393939", '&:hover': {backgroundColor: '#353535'}}} onClick={handleCalendarModalOpen}>
                                    <CalendarMonthIcon className="svg_icons" fontSize="large" sx={{minHeight: "100%", color: "#f9e400"}}></CalendarMonthIcon>
                                </Button>
                                {
                                <Modal
                                    aria-labelledby="transition-modal-title"
                                    open={calendarModalState}
                                    onClose={handleCalendarModalClose}
                                    closeAfterTransition
                                >
                                    <Fade in={calendarModalState}>
                                        <Box sx={modal_style} color="primary">
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <StaticDatePicker value={calendarDateState} 
                                                                  onChange={(date) => {handlePickerChange(date)}} 
                                                                  onAccept={handlePickerAccept}
                                                                  onClose={handleCalendarModalClose}/>
                                            </LocalizationProvider>
                                        </Box>
                                    </Fade>
                                </Modal>
                                }
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </div>
    );  
} export default ShotTracker;