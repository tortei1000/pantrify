select r.id, i.name from recipes r
join users u on u.id = r.user_id
join ingredients i on r.id = i.recipe_id
where i.is_in_pantry = true and u.id = $1