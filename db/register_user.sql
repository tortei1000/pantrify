insert into users(username, password)
values (
    ${username},
    ${hash}
) returning username, password, id;

