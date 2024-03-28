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
username VARCHAR(20) NOT NULL,
ctype VARCHAR(10) NOT NULL,
content TEXT NOT NULL,
created DATETIME,
CONSTRAINT PRIMARY KEY (commentid, postid),
CONSTRAINT comment_of_post_fk1 FOREIGN KEY (postid)
REFERENCES post(postid)
ON UPDATE CASCADE
ON DELETE CASCADE,
CONSTRAINT comment_of_post_fk2 FOREIGN KEY (username)
REFERENCES app_user(username)
ON UPDATE CASCADE
ON DELETE CASCADE,
CONSTRAINT comment_of_post_fk3 FOREIGN KEY (ctype)
REFERENCES content_type(ctype)
ON UPDATE CASCADE
);

-- Add data
INSERT INTO content_type(ctype, cdesc) VALUES
('text', 'Text content'),
('image', 'Image content');

/*
SELECT * FROM app_user;
SELECT * FROM content_type;
SELECT * FROM post;
SELECT * FROM content_of_post;
SELECT * FROM comment_of_post;
*/