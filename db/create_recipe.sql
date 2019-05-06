insert into recipes(user_id, title, instructions) 
values($1, $2, $3)
returning id;