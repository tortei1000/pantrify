UPDATE recipes 
SET ing_count = (select count(i.name) from recipes re
join ingredients i on re.id = i.recipe_id
and re.id = $1)
where id = $1
returning *