import React from 'react';
import {Card, Box, Grid, Fab, Modal, Fade, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CounterInput from "./CounterInput"
//import './css/ShotDisplay.css';

class ShotSpot extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            modalOpen: false
        }
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
    }
    
    handleModalOpen(){
        this.setState({
            modalOpen: true
        })
    }

    handleModalClose(){
        this.setState({
            modalOpen: false
        })
    }

    render(){
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

        const spotFabCSS = {
            justifyContent: "center",
            fontSize: '35px',
            minHeight: '80px',
            width: '80px',
        };

        //Constructing Title for the Modal
        var spotNameArray = this.props.spotName.split("_");
        var spotNameTitle = "";
        for(let word = 0; word < spotNameArray.length; word++){
            let addedElem = " ";
            if(word === spotNameArray.length - 1){
                addedElem = "";
            }
            spotNameTitle = spotNameTitle + (spotNameArray[word].charAt(0).toUpperCase() + spotNameArray[word].slice(1)) + addedElem;
        }

        var spotData = this.props.shotChart[this.props.dataType][this.props.spotName]
        if (this.props.dataType === "percentage"){
            spotData = (((spotData.toFixed(2))*100).toFixed(0) + "%")
        }

        return(
            <div className="shot-spot">
                <Fab color="primary" aria-label="add" size="large" sx={spotFabCSS} onClick={this.handleModalOpen}>
                    {spotData}
                </Fab>
                <Modal
                    aria-labelledby="transition-modal-title"
                    open={this.state.modalOpen}
                    onClose={this.handleModalClose}
                    closeAfterTransition
                >
                    <Fade in={this.state.modalOpen}>
                        <Box sx={modal_style} color="primary">
                            <Typography id="transition-modal-title" variant="h6" component="h2" textAlign={"center"}>
                                {spotNameTitle}
                            </Typography>
                            
                            {/* Counter Input for the Shots */}
                            <CounterInput shotChart={this.props.shotChart} changeValue={this.props.onShotChange} dataType="shots" dataSpot={this.props.spotName}/>

                            {/* Counter Input for the Makes */}
                            <CounterInput shotChart={this.props.shotChart} changeValue={this.props.onShotChange} dataType="makes" dataSpot={this.props.spotName}/>

                            {/* Going to make a component called NumberControl, itll have the ability to edit the number in the box, add one to it, or subtract one to it and will look
                                kind of like the date component
                                
                                There will be 2 in each modal, one for the shots and one for the makes. Along with a tag system and a checkmark at the bottom to save and update
                                Closing the modal will also update the upper level shot_chart (somehow)
                            */}
                        </Box>
                    </Fade>
                </Modal>
            </div>
        );
    }
}export default ShotSpot;