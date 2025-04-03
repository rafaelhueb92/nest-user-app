USE nest_app;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(63),
    email VARCHAR(127),
    password VARCHAR(127),
    role INT DEFAULT 1,
    birthAt  TIMESTAMP,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Super User with role 3
INSERT INTO `users`(`name`, `email`, `password`, `role`, `birthAt`) 
VALUES ('User1','user123@gmail.com','Abc12345@!','3','1983-03-11')