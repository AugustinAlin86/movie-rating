const bcrypt = require('bcryptjs');

const password = 'admin';

bcrypt.hash(password, 12, (err, hashedPassword) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Hashed password:', hashedPassword);
  }
});
