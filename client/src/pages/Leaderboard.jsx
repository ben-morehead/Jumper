import React from "react";
import Player from './components/Player';
import {Paper, Grid} from '@mui/material';
import '../App.css';


class Leaderboard extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        message_data: "Loading...",
        athlete_data: []
      }
    }
  
    componentDidMount(){
      console.log("Leaderboard.componentDidMount() Call")
      fetch("/api")
          .then((res) => res.json())
          .then((data) => this.setState({
            message_data: data.message,
            athlete_data: data.athlete_data
          })
          .then(error => {
            console.log(error)
          })
          .catch(console.error));
    }
    
    render() {
      console.log("Leaderboard.render() Call")
  
      const PaperCSS = {
          backgroundColor: '#c9c9c9',
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
      }
  
      return (
        <div className="App App-header">
            <h1>
                {this.state.message_data}
            </h1>
            <ol>
                <Paper sx={PaperCSS}>
                    <Grid container >
                        <Grid item xs={1} l={1}>
                            <b>Rank</b>
                        </Grid>
                        <Grid item xs={7} l={7}>
                            <b>Name</b>
                        </Grid>
                        <Grid item xs={2} l={2}>
                            <b>Weekly Score</b>
                        </Grid>
                        <Grid item xs={2} l={2}>
                            <b>Total Score</b>
                        </Grid>
                    </Grid>
                </Paper>
                {this.state.athlete_data.map((datapoint, index) => {
                    return <Player athlete={datapoint}></Player>
                })}
            </ol>
        </div>
      );
    }
  } 
export default Leaderboard;