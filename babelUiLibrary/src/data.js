const users = [
   { name: 'maro', premium: true },
   { name: 'karo', premium: false },
   { name: 'jaro', premium: true },
];

const getPremUsers = (users) => {
   return users.filter((user) => user.premium);
};

export { getPremUsers, users as default };
