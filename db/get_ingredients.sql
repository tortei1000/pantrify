select name, quantity, unit from ingredients
where recipe_id = $1
