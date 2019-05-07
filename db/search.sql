select * from recipes r
where r.title ilike $2 
and user_id = $1