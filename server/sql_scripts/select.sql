SELECT 
    *
FROM
    user_info
INNER JOIN shot_data
    ON user_info.user_id = shot_data.user_id
WHERE username="ben_morehead"
;

INSERT INTO shot_data(user_id, session_date, data_variation, center_3pt,
		left_3pt_wing,
		left_elbow,
		free_throw,
		right_elbow,
		right_3pt_wing,
		center_basket,
		left_3pt_corner,
		left_short_corner,
		left_basket,
		right_basket,
		right_short_corner,
		right_3pt_corner)
VALUES
	((SELECT(user_id) FROM user_info where username="ben_morehead"), "2023-02-20", "MAKES", 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0) /*WILL BE VARIABLES*/;

	
	