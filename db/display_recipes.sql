select r.id, r.title, r.instructions, r.images from users u
join recipes r on u.id = r.user_id
where u.id = $1
