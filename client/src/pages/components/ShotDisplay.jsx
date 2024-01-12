import React from 'react';
import {Card, Box, Grid, Fab, Modal, Fade, Typography, Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ShotSpot from "./ShotSpot"
import './css/ShotDisplay.css';
import Image from "../../imgs/BasketballHalfCourt.png";

class ShotDisplay extends React.Component{
    
    constructor(props){
        super(props);
    }

    render(){
        const BaseCardCSS = {
            width: "95%",
            flexGrow: 0.98, //As we fill it out the number will likely have to be futsed around with
            
        }

        const bgndImageCSS = {
            backgroundImage: `url(${Image})`,
            backgroundSize: '100%'
            
        }

        const spotFabCSS = {
            justifyContent: "center",
            fontSize: '35px',
            minHeight: '70px',
            width: '70px',
        }

        const testCSS = {
            border: "1px solid black"
        }

        const some_number = 50;
        const data_type = "shots"

        return(    
            <div className="shot-display">
                <Card elevation={8} sx={BaseCardCSS}>
                    <div className="shot-display-img">
                        <Box sx={{width: "100%"}}>
                            <Grid container direction="row" justifyContent={"center"} sx={bgndImageCSS}>
                                <Grid item justifyText={"center"} xs={6} sx={{minWidth: "100%"}}>
                                    <Grid container direction="column" sx={{minWidth:"100%"}}>
                                        <Grid container item sx={{marginTop:'2%', marginBottom: '2%'}}>
                                            <Grid item xs={2}></Grid>
                                            <Grid item xs={8}><ShotSpot shotChart={this.props.shotChart} dataType={this.props.dataType} spotName="center_3pt" onShotChange={this.props.onChangeShotChart}/></Grid>
                                            <Grid item xs={2}><Button variant="contained" color="error" onClick={this.props.clearDisplay}><b>Clear</b></Button></Grid>
                                        </Grid>
                                        <Grid item>
                                            <div style={{minHeight:"100px"}}></div>
                                        </Grid>
                                        <Grid item sx={{marginTop:'2%', marginBottom: '2%'}}>
                                            <Grid container justifyContent={"center"} direction="row">
                                                <Grid item xs={1}>
                                                    <ShotSpot shotChart={this.props.shotChart} dataType={this.props.dataType} spotName="left_3pt_wing" onShotChange={this.props.onChangeShotChart}/>
                                                </Grid>
                                                <Grid container item xs={3} justifyContent="right">
                                                    <ShotSpot shotChart={this.props.shotChart} dataType={this.props.dataType} spotName="left_elbow" onShotChange={this.props.onChangeShotChart}/>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <ShotSpot shotChart={this.props.shotChart} dataType={this.props.dataType} spotName="free_throw" onShotChange={this.props.onChangeShotChart}/>
                                                </Grid>
                                                <Grid item container xs={3} justifyContent="left">
                                                    <ShotSpot shotChart={this.props.shotChart} dataType={this.props.dataType} spotName="right_elbow" onShotChange={this.props.onChangeShotChart}/>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <ShotSpot shotChart={this.props.shotChart} dataType={this.props.dataType} spotName="right_3pt_wing" onShotChange={this.props.onChangeShotChart}/>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <div style={{minHeight:"100px"}}></div>
                                        </Grid>
                                        <Grid itemScope sx={{marginTop:'2%', marginBottom: '2%'}}>
                                            <ShotSpot shotChart={this.props.shotChart} dataType={this.props.dataType} spotName="center_basket" onShotChange={this.props.onChangeShotChart}/>
                                        </Grid>
                                        <Grid item sx={{marginTop:'2%', marginBottom: '2%'}}>
                                            <Grid container justifyContent={"center"} direction="row">
                                                <Grid item xs={1}>
                                                    <ShotSpot shotChart={this.props.shotChart} dataType={this.props.dataType} spotName="left_3pt_corner" onShotChange={this.props.onChangeShotChart}/>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <ShotSpot shotChart={this.props.shotChart} dataType={this.props.dataType} spotName="left_short_corner" onShotChange={this.props.onChangeShotChart}/>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <ShotSpot shotChart={this.props.shotChart} dataType={this.props.dataType} spotName="left_basket" onShotChange={this.props.onChangeShotChart}/>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <ShotSpot shotChart={this.props.shotChart} dataType={this.props.dataType} spotName="right_basket" onShotChange={this.props.onChangeShotChart}/>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <ShotSpot shotChart={this.props.shotChart} dataType={this.props.dataType} spotName="right_short_corner" onShotChange={this.props.onChangeShotChart}/>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <ShotSpot shotChart={this.props.shotChart} dataType={this.props.dataType} spotName="right_3pt_corner" onShotChange={this.props.onChangeShotChart}/>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <div style={{minHeight:"50px"}}></div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                </Card>
            </div>  
        );
    }
}export default ShotDisplay;

/*<CardMedia
                        square
                        title="Half Court"   
                    >
                        <img src={require("../../imgs/BasketballHalfCourt.png")} className="shot-display-img" alt='BasePhoto'>
                        </img>
                    </CardMedia>*/