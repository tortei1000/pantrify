select r.id, r.title, r.instructions from users u
join recipes r on u.id = r.user_id
where u.id = $1
