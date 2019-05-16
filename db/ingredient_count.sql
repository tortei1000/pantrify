select count(is_in_pantry ) from ingredients i
join recipes r on r.id = i.recipe_id 
where r.id = $1 and i.is_in_pantry = true