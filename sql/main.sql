CREATE DATABASE game_football

CREATE TABLE tournaments (
    tournament_id SERIAL PRIMARY KEY,
    tournament_name VARCHAR(100) NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    status VARCHAR(100) NOT NULL DEFAULT 'upcoming'
)

INSERT INTO tournaments (tournament_name, start_date, end_date) VALUES 
('UEFA Champions League', '2021-06-01', '2021-06-30')
('UEFA Europa League', '2021-06-01', '2021-06-30')


CREATE TABLE tournament_groups (
    group_id SERIAL PRIMARY KEY,
    group_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tournament_id INT NOT NULL,
    FOREIGN KEY (tournament_id) REFERENCES tournaments(tournament_id)
)

INSERT INTO tournament_groups (group_name, tournament_id) VALUES 
('Group A', 1)
('Group B', 1)
('Group A', 2)
('Group B', 2)

CREATE TABLE teams (
    team_id SERIAL PRIMARY KEY,
    team_name VARCHAR(100) NOT NULL,
    team_name VARCHAR(100) NOT NULL,
    group_id INT NOT NULL,
    FOREIGN KEY (group_id) REFERENCES tournament_groups(group_id)
    FOREIGN KEY (team_name) REFERENCES football_clubs(club_name)
)

INSERT INTO teams (team_name, group_id) VALUES 
('Real Madrid', 1),
('Barcelona', 1),
('Manchester United', 2),
('Chelsea', 2),
('Arsenal', 1),
('Liverpool', 2),
('Bayern Munich', 1),
('Paris Saint-Germain', 2),
('Juventus', 1),
('AC Milan', 1);

CREATE TABLE football_clubs (
    club_id SERIAL PRIMARY KEY,
    club_name VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    founder_year INT NOT NULL
    FOREIGN KEY (club_id) REFERENCES teams(club_id)
)
INSERT INTO football_clubs (club_name, country, city, founder_year) VALUES 
('Real Madrid', 'Spain', 'Madrid', 1902),
('Barcelona', 'Spain', 'Barcelona', 1899),
('Manchester United', 'England', 'Manchester', 1878),
('Chelsea', 'England', 'London', 1905),
('Arsenal', 'England', 'London', 1886),
('Liverpool', 'England', 'Liverpool', 1892),
('Bayern Munich', 'Germany', 'Munich', 1900),
('Paris Saint-Germain', 'France', 'Paris', 1970),
('Juventus', 'Italy', 'Turin', 1897),
('AC Milan', 'Italy', 'Milan', 1899);

CREATE TABLE match_fixtures (
    match_id SERIAL PRIMARY KEY,
    match_date TIMESTAMP NOT NULL,
    venue VARCHAR(100) NOT NULL,
    home_team_id INT NOT NULL,
    away_team_id INT NOT NULL DEFAULT 0,
    home_score INT NOT NULL DEFAULT 0,
    away_score INT NOT NULL,
    tournament_id INT NOT NULL,
    match_status VARCHAR(100) NOT NULL DEFAULT 'scheduled',
    FOREIGN KEY (home_team_id) REFERENCES teams(team_id),
    FOREIGN KEY (away_team_id) REFERENCES teams(team_id),
    FOREIGN KEY (tournament_id) REFERENCES tournaments(tournament_id)
    FOREIGN KEY (match_date) REFERENCES match_fixtures(match_id)
)

INSERT INTO match_fixtures (match_date, venue, home_team_id, away_team_id, tournament_id) VALUES 
('2021-06-01 20:00:00', 'Santiago Bernabeu', 1, 2, 1),
('2021-06-01 20:00:00', 'Camp Nou', 3, 4, 1),
('2021-06-01 20:00:00', 'Old Trafford', 5, 6, 1),
('2021-06-01 20:00:00', 'Stamford Bridge', 7, 8, 1),
('2021-06-01 20:00:00', 'Emirates Stadium', 9, 10, 1),
('2021-06-01 20:00:00', 'Anfield', 11, 12, 1),
('2021-06-01 20:00:00', 'Allianz Arena', 13, 14, 1),
('2021-06-01 20:00:00', 'Parc des Princes', 15, 16, 1),
('2021-06-01 20:00:00', 'Allianz Stadium', 17, 18, 1),
('2021-06-01 20:00:00', 'San Siro', 19, 20, 1);

CREATE TABLE players (
    player_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth date NOT NULL,
    position VARCHAR(100) NOT NULL,
    team_id INT NOT NULL,
    jersey_number INT NOT NULL,
    FOREIGN KEY (team_id) REFERENCES teams(team_id)
)

INSERT INTO players (first_name, last_name, date_of_birth, position, team_id, jersey_number) VALUES 
('Cristiano', 'Ronaldo', '1985-02-05', 'Forward', 1, 7),
('Lionel', 'Messi', '1987-06-24', 'Forward', 2, 10),
('Bruno', 'Fernandes', '1994-09-08', 'Midfielder', 3, 18),
('Mason', 'Mount', '1999-01-10', 'Midfielder', 4, 19),
('Pierre-Emerick', 'Aubameyang', '1989-06-18', 'Forward', 5, 14),
('Mohamed', 'Salah', '1992-06-15', 'Forward', 6, 11),
('Robert', 'Lewandowski', '1988-08-21', 'Forward', 7, 9),
('Neymar', 'Jr', '1992-02-05', 'Forward', 8, 10),
('Cristiano', 'Ronaldo', '1985-02-05', 'Forward', 9, 7),
('Zlatan', 'Ibrahimovic', '1981-10-03', 'Forward', 10, 11);


SELECT * FROM tournaments;
SELECT * FROM tournament_groups;
SELECT * FROM teams;
SELECT * FROM football_clubs;
SELECT * FROM match_fixtures;
SELECT * FROM players;