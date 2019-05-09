select u.username, r.title, i.is_in_pantry, m.recipe, m.id from meals m
join users u on m.user_id = u.id
join recipes r on u.id = r.user_id
join ingredients i on i.recipe_id = r.id
where r.title = $1 and i.is_in_pantry = true;