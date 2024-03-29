-- Create the Composers Table 
CREATE TABLE composers (
    composer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255) NOT NULL,
    birth_year INTEGER,
    death_year INTEGER,
    nationality VARCHAR(100)
);

-- Create the Books Table 
CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    book_title VARCHAR(255) NOT NULL,
    publisher VARCHAR(100),
    volume_info VARCHAR(255),
    isbn VARCHAR(20),
    book_description TEXT,
    book_composer_id INTEGER, 
    FOREIGN KEY (book_composer_id) REFERENCES composers(composer_id) ON DELETE SET NULL
);

-- Create the Pieces Table
CREATE TABLE pieces (
    piece_id SERIAL PRIMARY KEY,
    piece_title VARCHAR(255) NOT NULL,
    piece_composer_id INTEGER,
    piece_key VARCHAR(50),
    piece_opus_number VARCHAR(50),
    piece_description TEXT,
    FOREIGN KEY (piece_composer_id) REFERENCES composers(composer_id) ON DELETE SET NULL
);

-- Create the BookContents Table
CREATE TABLE book_contents (
    content_id SERIAL PRIMARY KEY,
    content_book_id INTEGER NOT NULL,
    content_piece_id INTEGER NOT NULL,
    page_range VARCHAR(50),
    FOREIGN KEY (content_book_id) REFERENCES books(book_id) ON DELETE CASCADE,
    FOREIGN KEY (content_piece_id) REFERENCES pieces(piece_id) ON DELETE CASCADE
);

