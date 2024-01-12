//Needs this for some reason
//The backend for the server will change as problems arise. Starting with a basic Node
const express = require("express");
const crypto = require("crypto");

//Used for formatting tag strings
const shotSpotMap = {
    0: "total",
    1: "center_3pt",
    2: "left_3pt_wing",
    3: "left_elbow",
    4: "free_throw",
    5: "right_elbow",
    6: "right_3pt_wing",
    7: "center_basket",
    8: "left_3pt_corner",
    9: "left_short_corner",
    10: "left_basket",
    11: "right_basket",
    12: "right_short_corner",
    13: "right_3pt_corner"
}

const sample_graph_options = {
    animationEnabled:true,
    backgroundColor: "#454545",
    theme: "dark1",
    title: {
        text: "Shooting Data"
    },
    axisY: {
        title: "Count",
        titleFontColor: "#6D78AD",
        lineColor: "#6D78AD",
        labelFontColor: "#6D78AD",
        tickColor: "#6D78AD"
    },
    axisY2: {
        title: "Percentage",
        titleFontColor: "#51CDA0",
        lineColor: "#51CDA0",
        labelFontColor: "#51CDA0",
        tickColor: "#51CDA0"
    },
    toolTip: {
        share:true
    },
    data: [{
        type: "line",
        name: "Shots",
        showInLegend: true,
        dataPoints: [
            { y: 155, label: "Jan" },
            { y: 150, label: "Feb" },
            { y: 152, label: "Mar" },
            { y: 148, label: "Apr" },
            { y: 142, label: "May" },
            { y: 150, label: "Jun" },
            { y: 146, label: "Jul" },
            { y: 149, label: "Aug" },
            { y: 153, label: "Sept" },
            { y: 158, label: "Oct" },
            { y: 154, label: "Nov" },
            { y: 150, label: "Dec" }
        ]
    }, 
    {
        type: "line",
        name: "Makes",
        showInLegend: true,
        dataPoints: [
            { y: 172, label: "Jan" },
            { y: 173, label: "Feb" },
            { y: 175, label: "Mar" },
            { y: 172, label: "Apr" },
            { y: 162, label: "May" },
            { y: 165, label: "Jun" },
            { y: 172, label: "Jul" },
            { y: 168, label: "Aug" },
            { y: 175, label: "Sept" },
            { y: 170, label: "Oct" },
            { y: 165, label: "Nov" },
            { y: 169, label: "Dec" }
        ]
    },
    {
        type: "line",
        axisYType: "secondary",
        name: "Percentage",
        showInLegend: true,
        yValueFormatString: "##%",
        dataPoints: [
            { y: 0.70, label: "Jan" },
            { y: 0.69, label: "Feb" },
            { y: 0.49, label: "Mar" },
            { y: 0.55, label: "Apr" },
            { y: 0.58, label: "May" },
            { y: 0.61, label: "Jun" },
            { y: 0.59, label: "Jul" },
            { y: 0.65, label: "Aug" },
            { y: 0.64, label: "Sept" },
            { y: 0.56, label: "Oct" },
            { y: 0.48, label: "Nov" },
            { y: 0.39, label: "Dec" }
        ]
    }]
}



const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql');
const util = require('util');
const app_url = "http://localhost:3000/"

app.use(require("body-parser").json())

var currentUser = null;

/* NEED TO CHANGE THE CONNECTION TO NOT BE ON THE AMAZON SQL */

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'iW3@VJN5czXs%LJvRzQE&ej',
    database: 'shooting_tracker'
})

// node native promisify
const query = util.promisify(connection.query).bind(connection);

/*
const connection = mysql.createConnection({
	host     : 'database-init.cziavocp9waq.us-east-1.rds.amazonaws.com',
	user     : 'admin',
	password : 'Rr293ep!',
	database : 'assistant_app'
});

*/

/* ----------------- Graphing Functions ------------------*/

const getShotGraphY = async(username, type, date, spot) => {
    var doSummation = spot === 0;
    
    //MySQL Call
    var params_get_shotdata = params_get_shotdata = [username, date, type.toUpperCase()];//[username, date, type.toUpperCase()];
    var query_get_shotdata = 'SELECT * FROM user_info INNER JOIN shot_data ON user_info.user_id = shot_data.user_id WHERE username = ? AND session_date = ? AND data_variation = ?';
    var query_results = await query(query_get_shotdata, params_get_shotdata);

    //Calculating Totals
    var final_value = 0;
    if (query_results.length > 0){
        //Theres an issue if query_results.length > 1
        if(query_results.length > 1){
            console.log("Something Fishy with Get Graph Options")
        }
        
        //Otherwise calculate the total value for the input arguments
        query_results.forEach((entry, index) => {
            if (doSummation){
                let added_count = 0;
                for(let i = 1; i < Object.entries(shotSpotMap).length; i++){
                    final_value += entry[shotSpotMap[i]];
                    if(entry[shotSpotMap[i]] > 0){
                        added_count += 1;
                    }
                }
                if(type==="Percentage"){
                    final_value = final_value / added_count;
                }
            }
            else{
                final_value += entry[shotSpotMap[spot]]
            }
        });
        return final_value;
    }   
    else{
        console.log("ERROR: No matching entries")
        return 0;
    }
    
}

const generate_graph_options = async (input_info) => {
    //input info has username, date, dateSpan, spot, and dataType
    if (input_info.dataType !== undefined){
        var data_array = []
        var date_init = getDateObj(input_info.date);

        for(const data_type of input_info.dataType){
            //Return object for the data array
            var ret_object = {
                name: data_type[0].toUpperCase() + data_type.slice(1),
                type: "line",
                showInLegend: true,
                dataPoints: []
            }

            if(data_type === "percentage"){
                ret_object.yValueFormatString = "##%";
                ret_object.axisYType = "secondary";
            }
            
            for(let sub_date = 0; sub_date < input_info.dateSpan; sub_date++){
                //Date setup
                let temp_date = new Date(date_init.getTime()); //Needs to be based on input date, not just todays date. Can start with just todays date though
                temp_date.setDate(temp_date.getDate() - sub_date);
                let date_string = String(temp_date.getFullYear() + "-" + String("0" + (temp_date.getMonth() + 1)).slice(-2) + "-" + String("0" + temp_date.getDate()).slice(-2)); //For some reason the month is 0 indexed
                
                //Y_Val acquisition from MySQL
                let y_val = await getShotGraphY(input_info.username, ret_object.name, date_string, input_info.spot);
                
                if(y_val > 0){
                    let point_object = {
                        y: y_val,
                        label: date_string
                    };
    
                    ret_object.dataPoints.push(point_object);
                }
            }
            ret_object.dataPoints.reverse()
            data_array.push(ret_object);
        }

        return data_array;
    }
    else{
        return []
    }
}

/* -------------- Helper Functions --------------------------*/
const getDateObj = (date_string) => {
    //Returns the date object of the formatted date string (year-month-date)
    let date_array = date_string.split("-");
    let date_obj = new Date();
    
    date_obj.setFullYear(Number(date_array[0]), Number(date_array[1] - 1), Number(date_array[2]));
    return date_obj
}

const copyObject = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}

const adjustInterpolatedValues = (data_array) => {
    for (const old_ret_obj of data_array){
        let prev_index = 0;
        let prev_value = 0;
        for (let i = 0; i < old_ret_obj.dataPoints.length; i++){
            if (i === 0){
                prev_value = old_ret_obj.dataPoints[i].y;
            }
            else{
                if(old_ret_obj.dataPoints[i].y === 0){
                    old_ret_obj.dataPoints[i].y = prev_value;
                }
                else{
                    // Calculate diffs
                    let index_diff = i - prev_index;
                    let value_diff = old_ret_obj.dataPoints[i].y - prev_value;
                    let per_index = value_diff / index_diff;
                    // Go through prev vals and update to reflect
                    for (let old_index = i-1; old_index > prev_index; old_index--){
                        old_ret_obj.dataPoints[old_index].y = prev_value + ((old_index - prev_value) * per_index);
                    }
                    // update the previous indexes
                    prev_index = i;
                    prev_value = old_ret_obj.dataPoints[i].y;
                }
            }
        }
    }
}

const generatePWHash = (pw_string) => {
    let pw_salt = "9g2H1jh!2@la0582Hnlmc";
    const passhash = crypto.createHash("sha256")
        .update(pw_string)
        .update(crypto.createHash("sha256").update(pw_salt, "utf8").digest("hex"))
        .digest("hex");
    return passhash;
}
/* ----------------------------------------------------------*/

app.listen(PORT, () => {
    console.log('Server listening on ' + PORT);
})

app.get("/current-user", (req, res) => {
    console.log("GET REQ: /current-user");
    //Getting the user info for the current user
    if(currentUser !== null){
        connection.query("SELECT * FROM user_info WHERE username=?", [currentUser], (error, results, fields) => {
            if(error) throw error;
            if(results.length > 0){
                console.log(results)
                res.json({
                    userInfo: {
                        status: true,
                        first_name: results[0].first_name,
                        last_name: results[0].last_name,
                        auth_code: results[0].auth_code
                    },
                    lastUser: currentUser
                });
                res.end();
            } else {
                res.json({
                    userInfo: {
                        status: false
                    },
                    lastUser: currentUser
                });
                res.end()
            }
        })
    } else {
        res.json({
            userInfo: {
                status: false
            },
            lastUser: currentUser
        });
        res.end();
    }
});

app.get("/signout", (req, res) => {
    console.log("GET REQ: /signout");
    currentUser = null;
    res.json({
        lastUser: currentUser
    });
    res.end();
});

app.post("/get-graph-options", async (request, res) => {
    console.log("POST REQ: /get-graph-options --- BODY:")
    console.log(request.body)

    //Process the request here and send back the updated graph options
    var new_graph_options = copyObject(sample_graph_options);
    new_graph_options.data = await generate_graph_options(request.body);
    //new_graph_options = await generate_graph_options(request.body);

    console.log("New Graph Options: " + new_graph_options);
    res.json({
        graphOptions: new_graph_options
    });
    res.end();
});

app.post("/get-shotdata", (request, res) => {
    console.log("POST REQ: /get-shotdata")
    //Grab relevant information from the Query, where 

    var res_shot_data = {};
    let username = request.body.user_input;
    let date = request.body.date_input;
    console.log("Recieving GET Request: Getting Shot Data for "+ username + " on " + date);
    
    let params_get_shotdata = [username, date];
    let query_get_shotdata = 'SELECT * FROM user_info INNER JOIN shot_data ON user_info.user_id = shot_data.user_id WHERE username = ? AND session_date = ?';
    connection.query(query_get_shotdata, params_get_shotdata, (error, results, fields) => {
        if(error) throw error;
        if (results.length > 0){
            results.forEach((entry, index) => {
                console.log(entry.data_variation);
                res_shot_data[entry.data_variation.toLowerCase()] = {}
                res_shot_data[entry.data_variation.toLowerCase()]["center_3pt"] = entry.center_3pt;
                res_shot_data[entry.data_variation.toLowerCase()]["left_3pt_wing"] = entry.left_3pt_wing;
                res_shot_data[entry.data_variation.toLowerCase()]["left_elbow"] = entry.left_elbow;
                res_shot_data[entry.data_variation.toLowerCase()]["free_throw"] = entry.free_throw;
                res_shot_data[entry.data_variation.toLowerCase()]["right_elbow"] = entry.right_elbow;
                res_shot_data[entry.data_variation.toLowerCase()]["right_3pt_wing"] = entry.right_3pt_wing;
                res_shot_data[entry.data_variation.toLowerCase()]["center_basket"] = entry.center_basket;
                res_shot_data[entry.data_variation.toLowerCase()]["left_3pt_corner"] = entry.left_3pt_corner;
                res_shot_data[entry.data_variation.toLowerCase()]["left_short_corner"] = entry.left_short_corner;
                res_shot_data[entry.data_variation.toLowerCase()]["left_basket"] = entry.left_basket;
                res_shot_data[entry.data_variation.toLowerCase()]["right_basket"] = entry.right_basket;
                res_shot_data[entry.data_variation.toLowerCase()]["right_short_corner"] = entry.right_short_corner;
                res_shot_data[entry.data_variation.toLowerCase()]["right_3pt_corner"] = entry.right_3pt_corner;
            });
            res.json({
                success: true,
                message: "Successful Query",
                shot_data: res_shot_data
            })
        }   
        else{
            res.json({
                success: false,
                message: "ERROR: No matching entries",
                shot_data: {}
            });
        }
        res.end()
    });
    //Do the proper select statement to receive the row data [for shots makes and percentages]
    //Convert the results from the query into a javascript object
    //Send back as res.json()
});

app.post('/add-user', (request, response) => {
    console.log("POST REQ: /add-user")
    let param_list = request.body;
    param_list.password = generatePWHash(param_list.password)
    if(param_list){
        connection.query('INSERT INTO user_info (username, user_password, first_name, last_name, auth_code) VALUES (?, ?, ?, ?, ?)', Object.values(param_list),(error, results, fields)=>{
            if (error) throw error;
            response.json({
                status_code: 1
            });
            response.end();
        })
    }
})

app.post('/username-check', (request, response) => {
    console.log("POST REQ: /username-check")
    let username = request.body.username;
    if (username){
        connection.query('SELECT * from user_info WHERE username = ?', [username], (error, results, fields) => {
            if (error) throw error;
            if (results.length > 0){
                response.json({
                    status_code: 1,
                    user_status: 1
                });
            }
            else{
                response.json({
                    status_code: 1,
                    user_status: 0
                });
            }
            response.end();
        })
    }
    else{
        response.json({
            status_code: 0,
            error_msg: "Invalid Username Input"
        })
        response.end();
    }
})

app.post('/change-password', async function(request, response) {
    console.log("POST REQ: /change-password")
    console.log("\nChange Password Username: " + request.body.username);
    console.log("Change Password Old: " + request.body.old_password);
    console.log("Change Password New: " + request.body.new_password);
    console.log("Change Password Confirm: " + request.body.confirm_password);

    //First check is that the new passwords and their hashes match
    let new_pass_hash = generatePWHash(request.body.new_password);
    let conf_pass_hash = generatePWHash(request.body.confirm_password);

    if(new_pass_hash !== conf_pass_hash){
        console.log("Hashes: " + new_pass_hash + " | " + conf_pass_hash)
        response.json({
            response_code: 2,
            error_msg: "The New Password and Confirmation Don't Match"
        })
        response.end();
    }
    else{
        //Defining the old password hash
        let old_pass_hash = generatePWHash(request.body.old_password);
        console.log("Old Password Hash: " + old_pass_hash);
        //MySQL Password Match Query
        var params_get_password_match = [request.body.username, old_pass_hash];//[username, date, type.toUpperCase()];
        var query_get_password_match = 'SELECT * FROM user_info WHERE username = ? AND user_password = ?';
        var query_results = await query(query_get_password_match, params_get_password_match);

        if(query_results.length > 0){
            //Change the password and send back a response code
            //Need to look into changing information within the SQL database

            //MySQL Update UserPassword Query
            var params_update_userpassword = [conf_pass_hash, request.body.username];//[username, date, type.toUpperCase()];
            var query_update_userpassword = 'UPDATE user_info SET user_password = ? WHERE username = ?';
            var query_results = await query(query_update_userpassword, params_update_userpassword);
            console.log("Password Hash: " + conf_pass_hash);

            response.json({
                response_code: 0,
                error_msg: "Success"
            })
            response.end();
        }
        else{
            response.json({
                response_code: 1,
                error_msg: "Incorrect Previous Password"
            })
            response.end();
        }
    }
})

app.post('/auth', function(request, response) {
    // Capture the input fields 
    console.log("POST REQ: /auth")
    let username = request.body.username;
    let password = request.body.password;

    //Hashing the password
    const hPassword = generatePWHash(password);

    // Ensure the input fields exists and are not empty
    if (username && hPassword) {
        
        // Execute SQL query that'll select the account from the database based on the specified username and password
        connection.query('SELECT * FROM user_info WHERE username = ? AND user_password = ?', [username, hPassword], function(error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
                // Authenticate the user
                response.json({
                    login_user: true,
                    login_status: 1,
                    userInfo: {
                        first_name: results[0].first_name,
                        last_name: results[0].last_name,
                        auth_code: results[0].auth_code
                    },
                });
                currentUser = username;
                response.end();
            } else {
                response.json({
                    login_user: false,
                    login_status: 0
                })
                response.end();
            }			
        });
    } else {
        response.json({
            login_user: false,
            login_status: -1
        })
        response.end();
    }
});

app.post('/set-shotdata', function(request, response) {
    // Capture the input fields 
    console.log("POST REQ: /set-shotdata")
    let shotDetails = request.body;
    // Ensure the input fields exists and are not empty
    

    //NESTED QUERIES BELOW

    if (shotDetails) {
        const shotDetailKeys = Object.keys(shotDetails.shot_data);
        shotDetailKeys.forEach((key, index) => {

            const shotData = shotDetails.shot_data[key];

            var params_get_existance = [shotDetails.user, shotDetails.date, String(key).toUpperCase()];
            const query_get_existance = 'SELECT * FROM user_info INNER JOIN shot_data  ON user_info.user_id = shot_data.user_id WHERE username = ? AND session_date = ? AND data_variation = ?'

            connection.query(query_get_existance, params_get_existance, function(error, results, fields) {
                if (error) throw error;
                if (results.length > 0){
                    
                    var params_update_data = [shotData.center_3pt, shotData.left_3pt_wing, shotData.left_elbow, shotData.free_throw, shotData.right_elbow, shotData.right_3pt_wing, shotData.center_basket, shotData.left_3pt_corner, shotData.left_short_corner, shotData.left_basket, shotData.right_basket, shotData.right_short_corner, shotData.right_3pt_corner, results[0].session_id];
                    const query_update_data = 'UPDATE shot_data SET center_3pt = ?, left_3pt_wing = ?, left_elbow = ?, free_throw = ?, right_elbow = ?, right_3pt_wing = ?, center_basket = ?, left_3pt_corner = ?, left_short_corner = ?, left_basket = ?, right_basket = ?, right_short_corner = ?, right_3pt_corner = ? WHERE session_id = ?';
                    connection.query(query_update_data, params_update_data, function(error, results, fields) {
                        if (error) throw error;
                        if(results.length > 0){
                        }
                    });
                }
                else {
                    var params_insert_data = [shotDetails.user, shotDetails.date, String(key).toUpperCase(), shotData.center_3pt, shotData.left_3pt_wing, shotData.left_elbow, shotData.free_throw, shotData.right_elbow, shotData.right_3pt_wing, shotData.center_basket, shotData.left_3pt_corner, shotData.left_short_corner, shotData.left_basket, shotData.right_basket, shotData.right_short_corner, shotData.right_3pt_corner];
                    const query_insert_data = 'INSERT INTO shot_data(user_id, session_date, data_variation, center_3pt, left_3pt_wing, left_elbow, free_throw, right_elbow, right_3pt_wing, center_basket, left_3pt_corner, left_short_corner, left_basket, right_basket, right_short_corner, right_3pt_corner) VALUES ((SELECT(user_id) FROM user_info where username=?), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                    connection.query(query_insert_data, params_insert_data, function(error, results, fields) {
                        if (error) throw error;
                    });
                }
            });
        });
        response.json({
            message: "Database Update Succesful"
        });
        response.end();  
    }
});


app.get("/api", (req, res) => {
    console.log("POST REQ: /api");
    res.json({
        message: "Holiday Challenge Leaderboard",
        athlete_data: [
            {
                id: 0,
                name: "Alessandro Gallucci",
                score: 0
            },
            {
                id: 1,
                name: "Arton Masoumi",
                score: 0
            },
            {
                id: 2,
                name: "Felix Reed",
                score: 0
            },
            {
                id: 3,
                name: "Grayson Shillingford",
                score: 0
            },
            {
                id: 4,
                name: "Isaiah Coleman",
                score: 0
            },
            {
                id: 5,
                name: "Luca Candiz Giral",
                score: 0
            },
            {
                id: 6,
                name: "Lucas Maglantay",
                score: 0
            },
            {
                id: 7,
                name: "Nathan Young",
                score: 240
            },
            {
                id: 8,
                name: "Nikhil Dhalla",
                score: 0
            },
            {
                id: 9,
                name: "Sam Mathurin",
                score: 0
            },
            {
                id: 10,
                name: "Ted McGregor",
                score: 0
            },
            {
                id: 11,
                name: "Mubarak Isiaka",
                score: 0
            }
        ]
    });
});


