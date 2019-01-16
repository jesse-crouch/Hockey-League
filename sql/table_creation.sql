-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2019-01-13 15:31:20.649

-- tables
-- Table: admin
CREATE TABLE admin (
    id serial NOT NULL PRIMARY KEY,
    position varchar(50) NOT NULL,
    password varchar(64) NOT NULL,
    salt varchar(64) NOT NULL,
    level int NOT NULL
);

-- Table: season
CREATE TABLE season (
    id serial NOT NULL PRIMARY KEY,
    start_date varchar(10) NOT NULL,
    end_date varchar(10) NOT NULL
);

-- Table: division
CREATE TABLE division (
    id serial NOT NULL PRIMARY KEY,
    season_id int NOT NULL REFERENCES season (id),
    name varchar(50) NOT NULL,
    age_range varchar(5) NOT NULL
);

-- Table: team
CREATE TABLE team (
    id serial NOT NULL PRIMARY KEY,
    division_id int NOT NULL REFERENCES division (id),
    name varchar(50) NOT NULL,
    games_played int NOT NULL,
    wins int NOT NULL,
    losses int NOT NULL,
    ties int NOT NULL,
    goals_scored int NOT NULL,
    goals_against int NOT NULL,
    differential int NOT NULL,
    score int NOT NULL
);

-- Table: assistant_coach
CREATE TABLE assistant_coach (
    id serial NOT NULL PRIMARY KEY,
    team_id int NOT NULL REFERENCES team (id),
    first_name varchar(50) NOT NULL,
    surname varchar(50) NOT NULL,
    gender varchar(6) NOT NULL,
    email varchar(150) NOT NULL,
    phone varchar(12) NOT NULL,
    address varchar(200) NOT NULL,
    city varchar(50) NOT NULL,
    province char(2) NOT NULL,
    country varchar(40) NOT NULL,
    postal_code varchar(7) NOT NULL,
    rating int NULL,
    birth_date varchar(10) NOT NULL,
    email_confirmed bool NOT NULL,
    phone_confirmed bool NOT NULL,
    date_registered varchar(10) NOT NULL,
    is_registered bool NOT NULL,
    previous_experience varchar(200) NULL,
    password varchar(64) NOT NULL,
    salt varchar(64) NOT NULL,
    level int NOT NULL
);

-- Table: coach
CREATE TABLE coach (
    id serial NOT NULL PRIMARY KEY,
    team_id int NOT NULL REFERENCES team (id),
    first_name varchar(50) NOT NULL,
    surname varchar(50) NOT NULL,
    gender varchar(6) NOT NULL,
    email varchar(150) NOT NULL,
    phone varchar(12) NOT NULL,
    address varchar(200) NOT NULL,
    city varchar(50) NOT NULL,
    province char(2) NOT NULL,
    country varchar(40) NOT NULL,
    postal_code varchar(7) NOT NULL,
    rating int NULL,
    birth_date varchar(10) NOT NULL,
    email_confirmed bool NOT NULL,
    phone_confirmed bool NOT NULL,
    date_registered varchar(10) NOT NULL,
    is_registered bool NOT NULL,
    previous_experience varchar(200) NULL,
    password varchar(64) NOT NULL,
    salt varchar(64) NOT NULL,
    level int NOT NULL
);

-- Table: player
CREATE TABLE player (
    id serial NOT NULL PRIMARY KEY,
    team_id int NULL REFERENCES team (id),
    coach_request_id int NULL REFERENCES coach (id),
    assistant_coach_request_id int NULL REFERENCES assistant_coach (id),
    special_request varchar(500) NULL,
    first_name varchar(50) NOT NULL,
    surname varchar(50) NOT NULL,
    gender varchar(6) NOT NULL,
    birth_date varchar(10) NOT NULL,
    email varchar(100) NULL,
    address varchar(200) NOT NULL,
    city varchar(50) NOT NULL,
    province char(2) NOT NULL,
    country varchar(40) NOT NULL,
    postal_code varchar(7) NOT NULL,
    rating int NULL,
    email_confirmed bool NOT NULL,
    phone_confirmed bool NOT NULL,
    is_registered bool NOT NULL,
    date_registered varchar(10) NOT NULL,
    number int NULL,
    position varchar(16) NULL,
    referral varchar(100) NULL,
    previous_position varchar(16) NULL,
    password varchar(64) NOT NULL,
    salt varchar(64) NOT NULL,
    level int NOT NULL
);

-- Table: defensive_line
CREATE TABLE defensive_line (
    id serial NOT NULL PRIMARY KEY,
    team_id int NOT NULL REFERENCES team (id),
    number int NOT NULL,
    left_defenseman_id int NOT NULL REFERENCES player (id),
    right_defenseman_id int NOT NULL REFERENCES player (id)
);

-- Table: forward_line
CREATE TABLE forward_line (
    id serial NOT NULL PRIMARY KEY,
    team_id int NOT NULL REFERENCES team (id),
    number int NOT NULL,
    centre_id int NOT NULL REFERENCES player (id),
    left_wing_id int NOT NULL REFERENCES player (id),
    right_wing_id int NOT NULL REFERENCES player (id)
);

-- Table: ice
CREATE TABLE ice (
    id serial NOT NULL PRIMARY KEY,
    pad varchar(10) NOT NULL,
    owner varchar(50) NOT NULL,
    address varchar(200) NOT NULL,
    city varchar(50) NOT NULL,
    province varchar(2) NOT NULL,
    country varchar(40) NOT NULL
);

-- Table: roster
CREATE TABLE roster (
    id serial NOT NULL PRIMARY KEY,
    team_id int NOT NULL REFERENCES team (id),
    goalie_id int NOT NULL REFERENCES player (id),
    backup_goalie_id int NULL REFERENCES player (id),
    forward_lines int[] NOT NULL,
    defensive_lines int[] NOT NULL
);

-- Table: game
CREATE TABLE game (
    id serial NOT NULL PRIMARY KEY,
    division_id int NOT NULL REFERENCES division (id),
    date varchar(10) NOT NULL,
    home_roster_id int NOT NULL REFERENCES roster (id),
    away_roster_id int NOT NULL REFERENCES roster (id),
    ice_id int NOT NULL REFERENCES ice (id)
);

-- Table: goal
CREATE TABLE goal (
    id serial NOT NULL PRIMARY KEY,
    game_id int NOT NULL REFERENCES game (id),
    period int NOT NULL,
    time varchar(5) NOT NULL,
    scorer_id int NOT NULL REFERENCES player (id),
    first_assist_id int NULL REFERENCES player (id),
    second_assist_id int NULL REFERENCES player (id)
);

-- Table: penalty
CREATE TABLE penalty (
    id serial NOT NULL PRIMARY KEY,
    game_id int NOT NULL REFERENCES game (id),
    player_id int NOT NULL REFERENCES player (id),
    infraction varchar(70) NOT NULL,
    period int NOT NULL,
    length varchar(5) NOT NULL,
    time_in varchar(8) NOT NULL,
    time_out varchar(8) NOT NULL
);

-- Table: primary_parent
CREATE TABLE primary_parent (
    id serial NOT NULL PRIMARY KEY,
    player_id int NOT NULL REFERENCES player (id),
    first_name varchar(50) NOT NULL,
    surname varchar(50) NOT NULL,
    gender varchar(6) NOT NULL,
    email varchar(150) NOT NULL,
    phone varchar(12) NOT NULL,
    address varchar(200) NOT NULL,
    city varchar(50) NOT NULL,
    province char(2) NOT NULL,
    country varchar(40) NOT NULL,
    postal_code varchar(7) NOT NULL,
    rating int NULL,
    birth_date varchar(10) NOT NULL,
    email_confirmed bool NOT NULL,
    phone_confirmed bool NOT NULL,
    date_registered varchar(10) NOT NULL,
    password varchar(64) NOT NULL,
    salt varchar(64) NOT NULL,
    level int NOT NULL
);

-- Table: referee
CREATE TABLE referee (
    id serial NOT NULL PRIMARY KEY,
    division_id int NOT NULL REFERENCES division (id),
    first_name varchar(50) NOT NULL,
    surname varchar(50) NOT NULL,
    gender varchar(6) NOT NULL,
    email varchar(150) NOT NULL,
    phone varchar(12) NOT NULL,
    address varchar(200) NOT NULL,
    city varchar(50) NOT NULL,
    province char(2) NOT NULL,
    country varchar(40) NOT NULL,
    postal_code varchar(7) NOT NULL,
    rating int NULL,
    birth_date varchar(10) NOT NULL,
    email_confirmed bool NOT NULL,
    phone_confirmed bool NOT NULL,
    date_registered varchar(10) NOT NULL,
    is_registered bool NOT NULL,
    previous_experience varchar(200) NULL,
    password varchar(64) NOT NULL,
    salt varchar(64) NOT NULL,
    level int NOT NULL
);

-- Table: secondary_parent
CREATE TABLE secondary_parent (
    id serial NOT NULL PRIMARY KEY,
    player_id int NOT NULL REFERENCES player (id),
    first_name varchar(50) NOT NULL,
    surname varchar(50) NOT NULL,
    gender varchar(6) NOT NULL,
    email varchar(150) NOT NULL,
    phone varchar(12) NOT NULL,
    address varchar(200) NOT NULL,
    city varchar(50) NOT NULL,
    province char(2) NOT NULL,
    country varchar(40) NOT NULL,
    postal_code varchar(7) NOT NULL,
    rating int NULL,
    birth_date varchar(10) NOT NULL,
    email_confirmed bool NOT NULL,
    phone_confirmed bool NOT NULL,
    date_registered varchar(10) NOT NULL,
    password varchar(64) NOT NULL,
    salt varchar(64) NOT NULL,
    level int NOT NULL
);

-- Table: timekeeper
CREATE TABLE timekeeper (
    id serial NOT NULL PRIMARY KEY,
    division_id int NOT NULL REFERENCES division (id),
    first_name varchar(50) NOT NULL,
    surname varchar(50) NOT NULL,
    gender varchar(6) NOT NULL,
    email varchar(150) NOT NULL,
    phone varchar(12) NOT NULL,
    address varchar(200) NOT NULL,
    city varchar(50) NOT NULL,
    province char(2) NOT NULL,
    country varchar(40) NOT NULL,
    postal_code varchar(7) NOT NULL,
    rating int NULL,
    birth_date varchar(10) NOT NULL,
    email_confirmed bool NOT NULL,
    phone_confirmed bool NOT NULL,
    date_registered varchar(10) NOT NULL,
    is_registered bool NOT NULL,
    previous_experience varchar(200) NULL,
    password varchar(64) NOT NULL,
    salt varchar(64) NOT NULL,
    level int NOT NULL
);

-- End of file.

