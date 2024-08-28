module.exports = `
    CREATE TABLE IF NOT EXISTS course (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        lesson_count INT NOT NULL,
        img VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        status TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;