import { QueryInterface } from 'sequelize';
import bcrypt from 'bcryptjs';

const SALTS = process.env.SALT_ROUNDS;

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('admins', [{
      id: 1,
      email: 'jv681033@gmail.com',
      password: bcrypt.hashSync(
        'Jv98227449@',
        Number(SALTS),
      ),
    }]);
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('admins', {});
  },
};
