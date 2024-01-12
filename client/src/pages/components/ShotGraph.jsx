import React, { useState, useEffect, useLayoutEffect } from "react";
import CanvasJSReact from '../../canvasjs.react';
import {Button} from '@mui/material'


var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function ShotGraph(props){
    const [chartRef, updateChartRef] = useState(null);
    return(
        <div style={{marginTop: "20px"}}>
            <CanvasJSChart options = {props.options} onRef={ref => updateChartRef(ref)}/>
        </div>
    );
} export default ShotGraph;