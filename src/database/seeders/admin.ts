import { QueryInterface } from 'sequelize';
import bcrypt from 'bcryptjs';

const SALTS = process.env.SALT_ROUNDS;

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('admins', [{
      email: 'example@gmail.com',
      password: bcrypt.hashSync(
        'Ab12345678@',
        Number(SALTS),
      ),
    }]);
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('admins', {});
  },
};
