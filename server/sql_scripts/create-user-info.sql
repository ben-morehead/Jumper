#Removing the tables if they already exist
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
("ben_morehead", "drowssap", "Ben", "Morehead", "USER0"),
("first_last", "pass12345", "Firstname", "Lastname", "LORDSPR0T0");
