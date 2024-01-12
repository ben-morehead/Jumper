DROP TABLE IF EXISTS shot_data;

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

