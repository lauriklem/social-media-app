DROP SCHEMA if EXISTS social_media_schema;
CREATE SCHEMA social_media_schema;
USE social_media_schema;

-- Create tables
CREATE TABLE app_user(
username VARCHAR(20) PRIMARY KEY,
pwd VARCHAR(20) NOT NULL
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
contentid INT UNSIGNED NOT NULL,
postid BIGINT UNSIGNED NOT NULL,
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

-- Add test data
INSERT INTO app_user(username, pwd) VALUES
('User1', 'password123'),
('MyNickName', 'another1'),
('Mat', 'asdasd'),
('somewhatlongusername', 'notsogood'),
('anotherUser', 'mypassWORD');

INSERT INTO content_type(ctype, cdesc) VALUES
('text', 'Text content'),
('image', 'Image content');

INSERT INTO post(username, created) VALUES
('User1', '2024-01-01 10:11:12'),
('User1', '2024-01-02 15:40:28'),
('somewhatlongusername', '2024-02-07 17:36:06');