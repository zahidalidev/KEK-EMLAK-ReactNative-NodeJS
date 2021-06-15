-- -----------------------------------------------------
-- Schema kekEmlak
-- -----------------------------------------------------
CREATE database kekEmlak;
USE kekEmlak;

-- -----------------------------------------------------
-- Table user
-- -----------------------------------------------------
CREATE TABLE users (
  id INT NOT NULL IDENTITY,
  name VARCHAR(155) NOT NULL,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(55) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
)


-- -----------------------------------------------------
-- Table products
-- -----------------------------------------------------
CREATE TABLE products (
  id INT NOT NULL IDENTITY,
  name VARCHAR(155) NOT NULL,
  details VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  price VARCHAR(155) NOT NULL,
  area VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  userId INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES users(id)
)

