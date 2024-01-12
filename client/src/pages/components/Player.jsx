import React from 'react';
import { Paper, Grid } from '@mui/material';
import './css/Player.css';

class Player extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        const PaperCSS = {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        }

        const GridItemCSS = {
            margin: "0px",
            padding: "5px 0px"
        }

        return(
            <div className="player-item">
                <li key={this.props.athlete.id}>
                    <Paper elevation={8} sx={PaperCSS}>
                        <Grid container>
                            <Grid item xs={1} l={1} sx={GridItemCSS}>
                                {this.props.athlete.id + 1}
                            </Grid>
                            <Grid item xs={7} l={7} sx={GridItemCSS}>
                                {this.props.athlete.name}
                            </Grid>
                            <Grid item xs={2} l={2} sx={GridItemCSS}>
                                {0}    
                            </Grid> 
                            <Grid item xs={2} l={2} sx={GridItemCSS}>
                                {this.props.athlete.score}    
                            </Grid> 
                        </Grid>
                    </Paper>
                </li>
            </div>    
            );
    }
}export default Player;