-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE database loginSignup;
USE loginSignup;

-- -----------------------------------------------------
-- Table user
-- -----------------------------------------------------
CREATE TABLE customer (
  id INT NOT NULL IDENTITY,
  name VARCHAR(155) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
)


