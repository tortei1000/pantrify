select count(i.name) from recipes r
join ingredients i on r.id = i.recipe_id
and r.id = $1