DROP SCHEMA if EXISTS social_media_schema;
CREATE SCHEMA social_media_schema;
USE social_media_schema;

-- Create tables
CREATE TABLE app_user(
username VARCHAR(20) PRIMARY KEY,
pwd TEXT NOT NULL
);

CREATE TABLE post(
postid BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(20) NOT NULL,
created DATETIME,
CONSTRAINT post_fk1 FOREIGN KEY (username)
REFERENCES app_user(username)
ON UPDATE CASCADE
ON DELETE CASCADE
);

CREATE TABLE content_type(
ctype VARCHAR(10) PRIMARY KEY,
cdesc VARCHAR(50)
);

CREATE TABLE content_of_post(
postid BIGINT UNSIGNED NOT NULL,
contentid INT UNSIGNED NOT NULL,
ctype VARCHAR(10) NOT NULL,
content TEXT NOT NULL,
CONSTRAINT PRIMARY KEY (contentid, postid),
CONSTRAINT content_of_post_fk1 FOREIGN KEY (postid)
REFERENCES post(postid)
ON UPDATE CASCADE
ON DELETE CASCADE,
CONSTRAINT content_of_post_fk2 FOREIGN KEY (ctype)
REFERENCES content_type(ctype)
ON UPDATE CASCADE
);

CREATE TABLE comment_of_post(
commentid INT UNSIGNED NOT NULL,
postid BIGINT UNSIGNED NOT NULL,
ctype VARCHAR(10) NOT NULL,
content TEXT NOT NULL,
created DATETIME,
CONSTRAINT PRIMARY KEY (commentid, postid),
CONSTRAINT comment_of_post_fk1 FOREIGN KEY (postid)
REFERENCES post(postid)
ON UPDATE CASCADE
ON DELETE CASCADE,
CONSTRAINT comment_of_post_fk2 FOREIGN KEY (ctype)
REFERENCES content_type(ctype)
ON UPDATE CASCADE
);

-- Add data
INSERT INTO content_type(ctype, cdesc) VALUES
('text', 'Text content'),
('image', 'Image content');

/*
-- Add test data
INSERT INTO app_user(username, pwd) VALUES
('User1', 'password123'),
('MyNickName', 'another1'),
('Mat', 'asdasd'),
('somewhatlongusername', 'notsogood'),
('anotherUser', 'mypassWORD');

INSERT INTO post(username, created) VALUES
('User1', '2024-01-01 10:11:12'),
('User1', '2024-01-02 15:40:28'),
('somewhatlongusername', '2024-02-07 17:36:06'),
('MyNickName', '2023-11-20 16:30:12'),
('Mat', '2023-12-23 11:20:36');

INSERT INTO content_of_post(contentid, postid, ctype, content) VALUES
(1, 1, 'text', 'Here is the first content of the post made by User1. Blah blah blah some random text...'),
(2, 1, 'text', 'Here is the SECOND content of the post made by User1. Is it useful to have several contents per post? We\'ll see later'),
(1, 2, 'image', 'Here is the image of the post made by User1. Propably it will be the image file path...'),
(1, 3, 'text', 'Content of the post made by somewhatlongusername. Text text text...'),
(1, 4, 'text', 'User MyNickName posted this. Blah blah blah some random text...'),
(1, 5, 'text', 'Mat created this post. Blah blah blah some random text...');

INSERT INTO comment_of_post(commentid, postid, ctype, content, created) VALUES
(1, 1, 'text', 'First comment of the post made by User1.', '2024-01-01 13:05:50'),
(2, 1, 'text', 'Second comment of the post made by User1. Some text here', '2024-01-01 16:40:11'),
(3, 1, 'text', 'Third comment of this post', '2024-01-02 12:00:00'),
(1, 3, 'text', 'First comment to somewhatlongusername.', '2024-02-08 13:05:50'),
(2, 3, 'text', 'Second comment of the post made by somewhatlongusername.', '2024-02-08 16:40:11'),
(3, 3, 'text', 'Third comment of this post. Some text here.', '2024-02-10 13:00:00');

SELECT * FROM app_user;
SELECT * FROM content_type;
SELECT * FROM post;
SELECT * FROM content_of_post;
SELECT * FROM comment_of_post;
*/