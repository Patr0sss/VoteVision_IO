CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role VARCHAR(10) DEFAULT 'user' CHECK (role IN ('admin', 'user')) NOT NULL
);


CREATE TABLE polls (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    scale VARCHAR(50) NOT NULL,
    opens_at TIMESTAMP NOT NULL,
    expires_at TIMESTAMP NOT NULL
);

CREATE TABLE votes (
    id SERIAL PRIMARY KEY,
    poll_id INT NOT NULL,
    username VARCHAR(50) NOT NULL,
    vote_value INT NOT NULL,
    voted_at TIMESTAMP NOT NULL,
    FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE,
);

CREATE TABLE results (
    poll_id INT PRIMARY KEY,
    average_vote FLOAT NOT NULL,
    votes_count INT NOT NULL,
    FOREIGN KEY (poll_id) REFERENCES polls(id) ON DELETE CASCADE
);

/*
-- ----------------Przykładowe dane------------------
INSERT INTO users (username, password, email, role) VALUES
('admin_user', 'admin_password', 'admin@example.com', 'admin'),
('regular_user1', 'user_password1', 'user1@example.com', 'user'),
('regular_user2', 'user_password2', 'user2@example.com', 'user');

INSERT INTO polls (title, description, scale, opens_at, expires_at) VALUES
('Favorite Color Poll', 'Vote for your favorite color.', '1-5', '2024-10-01 09:00:00', '2024-10-15 17:00:00'),
('Best Programming Language', 'Which programming language do you prefer?', '1-5', '2024-10-10 09:00:00', '2024-10-20 17:00:00');

INSERT INTO votes (poll_id, user_id, vote_value, voted_at) VALUES
(1, 1, 4, '2024-10-01 10:00:00'),
(1, 2, 5, '2024-10-01 11:00:00'),
(2, 1, 3, '2024-10-10 10:00:00');

INSERT INTO results (poll_id, average_vote, votes_count) VALUES
(1, 4.5, 2),
(2, 3.0, 1);

*/