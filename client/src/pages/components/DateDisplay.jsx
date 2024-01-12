import React from 'react';
import {Card, Box, Grid, Fab, Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import './css/DateDisplay.css';


class DateDisplay extends React.Component{
    
    constructor(props){
        super(props);
    }
    

    render(){
        const BaseCardCSS = {
           // width: "95%",
            //flexGrow: 0.98, //As we fill it out the number will likely have to be futsed around with
            padding: "10px",
        }

        const spotFabCSS = {
            justifyContent: "center",
            fontSize: '35px',
            minHeight: '70px',
            width: '70px',
            color: "#f9e400",
            backgroundColor: "#393939",
            '&:hover': {backgroundColor: '#353535'}
        }

        const testCSS = {
            border: "1px solid black"
        }

        const some_number = 50;
        const tempDate = this.props.date;

        return(    
            <div className="date-display">
                <Card elevation={8} sx={BaseCardCSS}>
                    <Grid container>
                        {/* Left Button */}
                        <Grid item display={"flex"} justifyContent={"start"} xs={1}>
                            <Button variant="contained" size="large" sx={spotFabCSS} onClick={this.props.onBackwardsDate}>
                                <ArrowLeftIcon className="svg_icons" fontSize="large" sx={{minHeight: "100%"}}></ArrowLeftIcon>
                            </Button>
                        </Grid>

                        {/* Main Date */}
                        <Grid item xs={10} sx={{
                            margin: "auto"
                        }}> 
                            <b>{tempDate}</b>
                        </Grid>

                        {/* Right Button */}
                        <Grid item display={"flex"} justifyContent={"end"} xs={1}>
                            <Button variant="contained" size="large" sx={spotFabCSS} onClick={this.props.onForwardsDate}>
                                <ArrowRightIcon className="svg_icons" fontSize="large" sx={{minHeight: "100%"}}></ArrowRightIcon>
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </div>  
        );
    }
}export default DateDisplay;

/*<CardMedia
                        square
                        title="Half Court"   
                    >
                        <img src={require("../../imgs/BasketballHalfCourt.png")} className="shot-display-img" alt='BasePhoto'>
                        </img>
                    </CardMedia>*/