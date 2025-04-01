create table tournaments(
    tournament_id serial primary key,
    tournament_name varchar(50),
    start_date date,
    end_date date check (end_date > start_date),
    status varchar(50)
);

create table tournament_groups(
    group_id serial primary key,
    group_name varchar(50),
    tournament_id int,
    created_at timestamp default current_timestamp,
    foreign key (tournament_id) references tournaments(tournament_id)
    on delete cascade
    on update cascade
);

create table football_clubs(
    club_id serial primary key,
    club_name varchar(50),
    city varchar(50),
    country varchar(50),
    founded_year smallint
)

create table teams(
    team_id serial primary key,
    team_name varchar(50),
    club_id int,
    group_id int,
    coach_name varchar(50),
    foreign key (club_id) references football_clubs(club_id)
    on delete cascade
    on update cascade,
    foreign key (group_id) references tournament_groups(group_id)
    on delete cascade
    on update cascade
);

create table players(
    player_id serial primary key,
    full_name varchar(50),
    date_of_birth date,
    position varchar(50),
    team_id int,
    jersey_number smallint,
    foreign key (team_id) references teams(team_id)
    on delete cascade
    on update cascade
);

create table match_fixtures(
    match_id serial primary key,
    match_date timestamp default current_timestamp,
    venue varchar(50),
    home_team_id int,
    away_team_id int,
    home_score smallint,
    away_score smallint,
    tournament_id int,
    match_status varchar(30),
    foreign key (home_team_id) references teams(team_id)
    on delete cascade
    on update cascade,
    foreign key (away_team_id) references teams(team_id)
    on delete cascade
    on update cascade,
    foreign key (tournament_id) references tournaments(tournament_id)
    on delete cascade
    on update cascade
);