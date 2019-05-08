create table meals (
id serial PRIMARY key,
user_id int references users(id),
meal_day date,
recipe varchar(100)
);