select r.title, r.instructions, i.name, i.quantity, i.unit from users u
join recipes r on u.id = r.user_id
join ingredients i on r.id = i.recipe_id
where u.id = $1