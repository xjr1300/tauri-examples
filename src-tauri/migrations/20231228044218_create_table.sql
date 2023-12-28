-- Add migration script here
CREATE TABLE IF NOT EXISTS green_grocer (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    price INTEGER NOT NULL
);

INSERT INTO green_grocer (name, price) VALUES ('にんじん', 100);
INSERT INTO green_grocer (name, price) VALUES ('だいこん', 160);
INSERT INTO green_grocer (name, price) VALUES ('きゅうり', 160);
