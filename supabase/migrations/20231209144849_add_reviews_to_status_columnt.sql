CREATE TABLE review_status (
    id SERIAL PRIMARY KEY,
    status_name VARCHAR(255) NOT NULL
);

ALTER TABLE reviews
ADD COLUMN status INTEGER NOT NULL REFERENCES review_status(id);
