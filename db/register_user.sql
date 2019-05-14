insert into users(username, password, phone)
values ($1,$2, $3)
returning username, password, id, phone;

