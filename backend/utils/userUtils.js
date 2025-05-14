let adminCounter = 1, unitManagerCounter = 1, userCounter = 1;

exports.generateUserId = (role) => {
  switch (role) {
    case 'ADMIN':
      return `A${adminCounter++}`;
    case 'UNIT_MANAGER':
      return `UM${unitManagerCounter++}`;
    case 'USER':
      return `U${userCounter++}`;
    default:
      return `U${Math.floor(Math.random() * 1000)}`;
  }
};
