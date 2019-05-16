select count(i.name) from recipes r
join ingredients i on r.id = i.recipe_id
where i.is_in_pantry = true and r.id = $1