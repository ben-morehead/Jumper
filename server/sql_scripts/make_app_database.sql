#Removing the tables if they already exist
DROP TABLE IF EXISTS shot_data;
DROP TABLE IF EXISTS user_info;



#Creating the exercise_table
CREATE TABLE user_info(
	user_id INT AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) DEFAULT NULL,
    last_name VARCHAR(255) DEFAULT NULL,
    auth_code VARCHAR(255) NOT NULL,
    PRIMARY KEY(user_id)
);

#Adding myself to the system and a default entrant
INSERT INTO user_info (username, user_password, first_name, last_name, auth_code)
VALUES
("ben_morehead", "6a927c9e08b93b3ab38530c3666f35837a840697eb63b0fb72830b8868d4b7b3", "Ben", "Morehead", "USER0"),
("first_last", "619e6f9621d59636c916c6579f44344a313d860d5c9af6a55abca530affd28a4", "Firstname", "Lastname", "LORDSPR0T0");


CREATE TABLE shot_data(
	session_id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    session_date DATE NOT NULL,
    data_variation VARCHAR(255) DEFAULT "SHOTS",
    center_3pt DECIMAL(18,3) DEFAULT 0,
    left_3pt_wing DECIMAL(18,3) DEFAULT 0,
    left_elbow DECIMAL(18,3) DEFAULT 0,
    free_throw DECIMAL(18,3) DEFAULT 0,
    right_elbow DECIMAL(18,3) DEFAULT 0,
    right_3pt_wing DECIMAL(18,3) DEFAULT 0,
    center_basket DECIMAL(18,3) DEFAULT 0,
    left_3pt_corner DECIMAL(18,3) DEFAULT 0,
    left_short_corner DECIMAL(18,3) DEFAULT 0,
    left_basket DECIMAL(18,3) DEFAULT 0,
    right_basket DECIMAL(18,3) DEFAULT 0,
    right_short_corner DECIMAL(18,3) DEFAULT 0,
    right_3pt_corner DECIMAL(18,3) DEFAULT 0,
    tags VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY(session_id),
    FOREIGN KEY(user_id)
		REFERENCES user_info(user_id)
);