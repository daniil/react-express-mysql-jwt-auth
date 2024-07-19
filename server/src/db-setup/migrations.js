const command = process.argv[2];

if (!command) {
  process.exit(0);
}

import db from '../db/connection.js';

// Migration up
if (command === 'up') {
  try {
    await db.query(`
      CREATE TABLE users (
        id INT NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL ,
        password VARCHAR(255) NOT NULL,
        user_role VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        CONSTRAINT UC_User UNIQUE (email, username)
      );
    `);

    await db.query(`
      CREATE TABLE messages (
        id INT NOT NULL AUTO_INCREMENT,
        text MEDIUMTEXT NOT NULL,
        user_id INT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );  
    `)

    console.log('✅ Migration up was successful');
    process.exit();
  } catch(err) {
    console.log(err);
    process.exit(1);
  }
}

// Migration down
if (command === 'down') {
  try {
    await db.query(`DROP TABLE messages;`);
    await db.query(`DROP TABLE users;`)
  } catch(err) {
    console.log(err);
    process.exit(1);
  }

  console.log('✅ Migration down was successful');
  process.exit();
}