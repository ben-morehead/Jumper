import React from 'react';
import {Box, Grid, Fab, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
//import './css/CounterInput.css';

class CounterInput extends React.Component{
    
    constructor(props){
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            value: this.props.shotChart[this.props.dataType][this.props.dataSpot]
        };
    }

    handleInputChange(event){
        this.setState({
            value: Number(event.target.value)
        });
    }

    handleValueChange(val){
        this.setState({
            value: val
        });
    }

    componentWillUnmount(){
        this.props.changeValue(this.props.dataType, this.props.dataSpot, this.state.value);
        var percentage = 0;
        if(this.props.shotChart.shots[this.props.dataSpot] !== 0){
            percentage = this.props.shotChart.makes[this.props.dataSpot] / this.props.shotChart.shots[this.props.dataSpot];
        }
        this.props.changeValue("percentage", this.props.dataSpot, percentage);
    }

    render(){
        const fabCSS = {
            justifyContent: "center",
            fontSize: '20px',
        };

        //Input Name
        var input_name = this.props.dataType.charAt(0).toUpperCase() + this.props.dataType.slice(1)
        return(
            <div>
                <Box textAlign={"center"} margin="auto" sx={{width:"100%"}}>
                    <h4>{input_name}</h4>
                    <Grid container spacing={0}>
                        <Grid item display={"flex"} justifyContent={"start"} xs={2}>
                            <Fab color="secondary" aria-label="add" size="large" sx={fabCSS} onClick={()=>{this.handleValueChange(this.state.value - 1)}}>
                                <RemoveIcon />
                            </Fab>
                        </Grid>
                        <Grid item xs={8} sx={{
                                margin: 0
                            }}>
                            <TextField fullWidth value={this.state.value} onChange={(e) => {this.handleInputChange(e)}} inputProps={{min: 0, style: { textAlign: 'center' }}}/>
                        </Grid>
                        <Grid item display={"flex"} justifyContent={"end"} xs={2}>
                            <Fab color="secondary" aria-label="add" size="large" sx={fabCSS} onClick={()=>{this.handleValueChange(this.state.value + 1)}}>
                                <AddIcon />
                            </Fab>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        )
    }

}export default CounterInput;