const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'secound user User',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'jane User',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'joe User',
    email: 'joe@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

module.exports = users;
