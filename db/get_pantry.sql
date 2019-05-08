select i.id, i.name, i.quantity, i.unit from ingredients i
join recipes r on i.recipe_id = r.id
join users u on u.id = r.user_id
where i.is_in_pantry = true and u.id = $1;