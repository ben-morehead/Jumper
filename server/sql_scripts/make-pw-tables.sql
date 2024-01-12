#Removing the tables if they already exist
DROP TABLE IF EXISTS set_table;
DROP TABLE IF EXISTS exercise_table;

#Creating the exercise_table
CREATE TABLE exercise_table(
	exercise_id INT AUTO_INCREMENT,
    exercise_name VARCHAR(255) NOT NULL,
    exercise_date DATE NOT NULL,
    workout_name VARCHAR(255) DEFAULT NULL,
    set_count INT DEFAULT 1,
    notes VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY(exercise_id)
);

#Creatin the set_table
CREATE TABLE set_table(
	set_id INT AUTO_INCREMENT,
    exercise_id INT,
    set_num INT DEFAULT 1,
    unit_type VARCHAR(255) DEFAULT "LBS",
    unit_amount DECIMAL(10, 2),
    rep_type VARCHAR(255) DEFAULT "REP",
    rep_amount INT,
    PRIMARY KEY(set_id),
    FOREIGN KEY(exercise_id)
		REFERENCES exercise_table(exercise_id)
);

#Adding exercises into the exercise table from  rep count (starting at earliest) - May 25, 2022
INSERT INTO exercise_table (exercise_name, exercise_date, workout_name, set_count, notes)
VALUES
("Assisted Pull Up", "22-05-25", "Pull", 3, DEFAULT),
    ("Lat Pulldowns", "22-05-25", "Pull", 3, DEFAULT),
    ("Row Machine", "22-05-25", "Pull", 3, DEFAULT),
    ("Preacher Curl", "22-05-25", "Pull", 3, DEFAULT),
    ("Hammer Curl", "22-05-25", "Pull", 3, DEFAULT),
    ("Incline Cable Curl", "22-05-25", "Pull", 3, DEFAULT)
;

#Adding the sets into the set table - May 25, 2022
INSERT INTO set_table(exercise_id, set_num, unit_type, unit_amount, rep_type, rep_amount)
VALUES
	(1, 1, DEFAULT, 37.5, DEFAULT, 8),
    (1, 2, DEFAULT, 31.25, DEFAULT, 5),
    (1, 3, DEFAULT, 31.25, DEFAULT, 5),
    (2, 1, DEFAULT, 60, DEFAULT, 11),
    (2, 2, DEFAULT, 60, DEFAULT, 11),
    (2, 3, DEFAULT, 60, DEFAULT, 11),
    (3, 1, DEFAULT, 120, DEFAULT, 8),
    (3, 2, DEFAULT, 120, DEFAULT, 8),
    (3, 3, DEFAULT, 120, DEFAULT, 9),
    (4, 1, DEFAULT, 25, DEFAULT, 12),
    (4, 2, DEFAULT, 25, DEFAULT, 12),
    (4, 3, DEFAULT, 25, DEFAULT, 12),
    (5, 1, DEFAULT, 30, DEFAULT, 8),
    (5, 2, DEFAULT, 30, DEFAULT, 8),
    (5, 3, DEFAULT, 30, DEFAULT, 9),
    (6, 1, DEFAULT, 20, DEFAULT, 8),
    (6, 2, DEFAULT, 20, DEFAULT, 8),
    (6, 3, DEFAULT, 20, DEFAULT, 8)
;

#Adding exercises into the exercise table from  rep count (starting at earliest) - May 26, 2022
INSERT INTO exercise_table (exercise_name, exercise_date, workout_name, set_count, notes)
VALUES
	("Dumbell Press", "22-05-26", "Push V.2", 3, DEFAULT),
    ("Incline Dumbell Press", "22-05-26", "Push V.2", 3, DEFAULT),
    ("Decline Cable Press", "22-05-26", "Push V.2", 3, DEFAULT),
    ("Shoulder Dumbbell Press", "22-05-26", "Push V.2", 3, DEFAULT),
    ("Tricep Pushdowns", "22-05-26", "Push V.2", 3, DEFAULT),
    ("Rear Delt Cable Flies", "22-05-26", "Push V.2", 3, DEFAULT)
;

#Adding the sets into the set table - May 26, 2022
INSERT INTO set_table(exercise_id, set_num, unit_type, unit_amount, rep_type, rep_amount)
VALUES
	(7, 1, DEFAULT, 75, DEFAULT, 8),
    (7, 2, DEFAULT, 75, DEFAULT, 7),
    (7, 3, DEFAULT, 75, DEFAULT, 7),
    (8, 1, DEFAULT, 60, DEFAULT, 9),
    (8, 2, DEFAULT, 60, DEFAULT, 9),
    (8, 3, DEFAULT, 60, DEFAULT, 8),
    (9, 1, DEFAULT, 25, DEFAULT, 13),
    (9, 2, DEFAULT, 25, DEFAULT, 12),
    (9, 3, DEFAULT, 25, DEFAULT, 12),
    (10, 1, DEFAULT, 45, DEFAULT, 10),
    (10, 2, DEFAULT, 45, DEFAULT, 10),
    (10, 3, DEFAULT, 45, DEFAULT, 9),
    (11, 1, DEFAULT, 30, DEFAULT, 9),
    (11, 2, DEFAULT, 30, DEFAULT, 8),
    (11, 3, DEFAULT, 30, DEFAULT, 9),
    (12, 1, DEFAULT, 15, DEFAULT, 12),
    (12, 2, DEFAULT, 15, DEFAULT, 12),
    (12, 3, DEFAULT, 15, DEFAULT, 12)
;

#Adding exercises into the exercise table from  rep count (starting at earliest) - May 27, 2022
INSERT INTO exercise_table (exercise_name, exercise_date, workout_name, set_count, notes)
VALUES
	("Squat", "22-05-27", "French Contrast", 3, DEFAULT),
    ("Depth Jumps", "22-05-27", "French Contrast", 3, DEFAULT),
    ("Weighted Seated Jumps", "22-05-27", "French Contrast", 3, DEFAULT),
    ("Assisted Spring Jumps", "22-05-27", "French Contrast", 3, DEFAULT),
    ("Single Leg Box Jumps", "22-05-27", "French Contrast", 3, DEFAULT)
;

#Adding the sets into the set table - May 27, 2022
INSERT INTO set_table(exercise_id, set_num, unit_type, unit_amount, rep_type, rep_amount)
VALUES
	(13, 1, DEFAULT, 270, DEFAULT, 4),
    (13, 2, DEFAULT, 275, DEFAULT, 3),
    (13, 3, DEFAULT, 225, DEFAULT, 5),
    (14, 1, "INCHES", 24, "JUMPS", 4),
    (14, 2, "INCHES", 24, "JUMPS", 4),
    (14, 3, "INCHES", 24, "JUMPS", 4),
    (15, 1, DEFAULT, 50, "JUMPS", 4),
    (15, 2, DEFAULT, 50, "JUMPS", 4),
    (15, 3, DEFAULT, 50, "JUMPS", 4),
    (16, 1, "BAND RESISTANCE", 85, DEFAULT, 5),
    (16, 2, "BAND RESISTANCE", 85, DEFAULT, 5),
    (16, 3, "BAND RESISTANCE", 85, DEFAULT, 5),
    (16, 4, "BAND RESISTANCE", 85, DEFAULT, 5),
    (17, 1, "INCHES", 20, "JUMPS", 5),
    (17, 2, "INCHES", 20, "JUMPS", 5),
    (17, 3, "INCHES", 20, "JUMPS", 5)
;

#Adding exercises into the exercise table from  rep count (starting at earliest) - May 29, 2022
INSERT INTO exercise_table (exercise_name, exercise_date, workout_name, set_count, notes)
VALUES
	("Assisted Pull Up", "22-05-29", "Pull", 3, DEFAULT),
    ("Lat Pulldowns", "22-05-29", "Pull", 3, DEFAULT),
    ("Row Machine", "22-05-29", "Pull", 3, DEFAULT),
    ("Preacher Curl", "22-05-29", "Pull", 3, DEFAULT),
    ("Hammer Curl", "22-05-29", "Pull", 3, DEFAULT),
    ("Incline Cable Curl", "22-05-29", "Pull", 3, DEFAULT)
;

#Adding the sets into the set table - May 27, 2022
INSERT INTO set_table(exercise_id, set_num, unit_type, unit_amount, rep_type, rep_amount)
VALUES
	(18, 1, DEFAULT, 31.25, DEFAULT, 6),
    (18, 2, DEFAULT, 31.25, DEFAULT, 8),
    (18, 3, DEFAULT, 31.25, DEFAULT, 7),
    (19, 1, DEFAULT, 60, DEFAULT, 12),
    (19, 2, DEFAULT, 60, DEFAULT, 12),
    (19, 3, DEFAULT, 65, DEFAULT, 8),
    (20, 1, DEFAULT, 120, DEFAULT, 9),
    (20, 2, DEFAULT, 120, DEFAULT, 9),
    (20, 3, DEFAULT, 120, DEFAULT, 10),
    (21, 1, DEFAULT, 25, DEFAULT, 12),
    (21, 2, DEFAULT, 25, DEFAULT, 13),
    (21, 3, DEFAULT, 25, DEFAULT, 13),
    (22, 1, DEFAULT, 30, DEFAULT, 9),
    (22, 2, DEFAULT, 30, DEFAULT, 9),
    (22, 3, DEFAULT, 30, DEFAULT, 7),
    (23, 1, DEFAULT, 20, DEFAULT, 9),
    (23, 2, DEFAULT, 20, DEFAULT, 9),
    (23, 3, DEFAULT, 20, DEFAULT, 7)
;


#Adding exercises into the exercise table from  rep count (starting at earliest) - May 30, 2022
INSERT INTO exercise_table (exercise_name, exercise_date, workout_name, set_count, notes)
VALUES
	("Dumbell Press", "22-05-30", "Push V.1", 3, DEFAULT),
    ("Incline Dumbell Press", "22-05-30", "Push V.1", 3, DEFAULT),
    ("Dips", "22-05-30", "Push V.1", 3, "Did first, don't do again"),
    ("Lateral Raise Machine", "22-05-30", "Push V.1", 3, DEFAULT),
    ("Cable Tricep Extensions", "22-05-30", "Push V.1", 3, DEFAULT),
    ("Rear Delt Cable Flies", "22-05-30", "Push V.1", 3, DEFAULT)
;

#Adding the sets into the set table - May 30, 2022
INSERT INTO set_table(exercise_id, set_num, unit_type, unit_amount, rep_type, rep_amount)
VALUES
	(24, 1, DEFAULT, 75, DEFAULT, 4),
    (24, 2, DEFAULT, 70, DEFAULT, 7),
    (24, 3, DEFAULT, 70, DEFAULT, 6),
    (25, 1, DEFAULT, 55, DEFAULT, 7),
    (25, 2, DEFAULT, 55, DEFAULT, 10),
    (25, 3, DEFAULT, 55, DEFAULT, 10),
    (26, 1, DEFAULT, 0, DEFAULT, 8),
    (26, 2, DEFAULT, 0, DEFAULT, 8),
    (26, 3, DEFAULT, 0, DEFAULT, 9),
    (27, 1, DEFAULT, 70, DEFAULT, 10),
    (27, 2, DEFAULT, 70, DEFAULT, 10),
    (27, 3, DEFAULT, 70, DEFAULT, 9),
    (28, 1, DEFAULT, 15, DEFAULT, 14),
    (28, 2, DEFAULT, 15, DEFAULT, 13),
    (28, 3, DEFAULT, 15, DEFAULT, 12),
    (29, 1, DEFAULT, 15, DEFAULT, 13),
    (29, 2, DEFAULT, 15, DEFAULT, 13),
    (29, 3, DEFAULT, 15, DEFAULT, 13)
;

#-------------------------JUNE----------------------------------

