select * from recipes r
join ingredients i on r.id = i.recipe_id
where r.title ilike $2 
and user_id = $1