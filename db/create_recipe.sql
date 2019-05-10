insert into recipes(user_id, title, instructions, images) 
values($1, $2, $3, $4)
returning id;