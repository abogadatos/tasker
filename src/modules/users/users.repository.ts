import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/databases/entities/user.entity';
import { Repository } from 'typeorm';
import * as mockedUser from '../../utils/users-mock.json';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/enums/roles.enum';

@Injectable()
export class usersCustomRepo {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async seedUsersTable() {
    const checkTablePopulation = await this.usersRepository.count();

    if (checkTablePopulation === 0) {
      console.info(`No users found within the database.`);
      for (const user of mockedUser) {
        console.info(`Inserting ${user.fullName} within the database.`);
        await this.usersRepository
          .createQueryBuilder()
          .insert()
          .into(User)
          .values({
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            password: await bcrypt.hash(user.password, 10),
            roles: user.roles as Role,
            country: user.country,
            city: user.city,
            address: user.address,
          })
          .orIgnore()
          .execute();
      }
    }
  }

  async getUser(userID: string) {
    const userFound: User | undefined = await this.usersRepository.findOne({
      where: { id: userID },
      relations: ['tasks'],
    });

    if (!userFound)
      throw new NotFoundException(`User not found or does't exist`);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = userFound;

    return rest;
  }
}
