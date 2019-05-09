insert into meals(user_id, meal_day, recipe) 
values($1, $2, $3)
returning meal_day, recipe, id