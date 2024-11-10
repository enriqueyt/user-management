import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserDocument } from './user-document';
import { IFilterUser } from 'core/user-layout/model';

@Injectable()
export class UserDBService {
  constructor(
    @InjectModel(UserDocument.name) private eventModel: Model<UserDocument>,
  ) {}

  async createUser(user: UserDocument): Promise<void> {
    try {
      await this.eventModel.create(user);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new Error(error.message);
      }
      throw error;
    }
  }

  async deleteUser(id: string): Promise<UserDocument> {
    const user = await this.eventModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async fetchUsers(filter?: Partial<IFilterUser>): Promise<UserDocument[]> {
    return this.eventModel.find(filter).exec();
  }

  async getUserById(id: string): Promise<UserDocument> {
    const user = await this.eventModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
