import React from 'react';

class Player extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        /*
        const PaperCSS = {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        }
        */
       
        return(
            <div className="template-item">
                <li>
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