import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';

import { usersCustomRepo } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/databases/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private usersCustomRepo: usersCustomRepo,
  ) {}

  async onModuleInit() {
    this.seedUsers();
  }

  async seedUsers() {
    return await this.usersCustomRepo.seedUsersTable();
  }

  async getUserByID(userID: string) {
    return await this.usersCustomRepo.getUser(userID);
  }

  async getUsers(
    page: number,
    limit: number,
    sortBy: string,
    order: 'ASC' | 'DESC',
  ) {
    const [users, total] = await this.usersRepository
      .createQueryBuilder('users')
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy(sortBy, order)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;
    const prevPage = hasPrevPage ? page - 1 : null;
    const nextPage = hasNextPage ? page + 1 : null;

    return {
      users,
      sortedBy: sortBy,
      ordered: order,
      totalElements: total,
      page,
      limit,
      totalPages,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
    };
  }

  async updateUser(userData: UpdateUserDto, userID: string) {
    const foundUser = await this.usersRepository.findOne({
      where: { id: userID },
    });
    if (!foundUser) throw new NotFoundException('user not found or not exist');

    const updatedUser = this.usersRepository.merge(foundUser, userData);
    await this.usersRepository.save(updatedUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...filteredUser } = updatedUser;
    return { message: 'User Update Successfully', filteredUser };
  }
}
