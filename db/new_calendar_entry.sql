insert into meals(user_id, meal_day, recipe, recipe_id) 
values($1, $2, $3, $4)
returning meal_day, recipe, id, recipe_id