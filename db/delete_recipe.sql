delete from ingredients
where recipe_id = $1;

delete from recipes
where id = $1;

select r.id, r.title, r.instructions, r.images from users u
join recipes r on u.id = r.user_id
where u.id = $2;