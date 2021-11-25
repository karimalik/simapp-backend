import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSupermarketDto } from './dto/create-supermarket.dto';
import { UpdateSupermarketDto } from './dto/update-supermarket.dto';
import {
  SupermarketDocument,
  Supermarkets,
} from './schemas/supermarket.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SupermarketsService {
  constructor(
    @InjectModel(Supermarkets.name)
    private SupermarketsModel: Model<SupermarketDocument>,
  ) {}
  public async addSupermarket(
    createSupermarketDto: CreateSupermarketDto,
  ): Promise<Supermarkets> {
    const addSupermarket = new this.SupermarketsModel();

    addSupermarket.supermarketId = uuidv4();
    addSupermarket.name = createSupermarketDto.name;
    addSupermarket.address = createSupermarketDto.address;
    addSupermarket.email = createSupermarketDto.email;
    addSupermarket.phone = createSupermarketDto.phone;
    addSupermarket.responsable = createSupermarketDto.responsable;
    addSupermarket.accreditation = createSupermarketDto.accreditation;

    return addSupermarket.save();
  }

  getAllSupermarket() {
    return this.SupermarketsModel.find().exec();
  }

  public async getOneSupermarket(supermarketId: string) {
    const findSupermarket = await this.SupermarketsModel.findOne({
      supermarketId,
    });

    if (!findSupermarket) {
      throw new NotFoundException(
        `Supermarket with the id ${supermarketId} was not found`,
      );
    }

    return findSupermarket;
  }

  public async updateSupermarket(
    supermarketId: string,
    updateSupermarketDto: UpdateSupermarketDto,
  ) {
    const updateSupermarket = await this.getOneSupermarket(supermarketId);

    if (updateSupermarketDto.name)
      updateSupermarket.name = updateSupermarketDto.name;
    if (updateSupermarketDto.address)
      updateSupermarket.address = updateSupermarketDto.address;
    if (updateSupermarketDto.email)
      updateSupermarket.email = updateSupermarketDto.email;
    if (updateSupermarketDto.phone)
      updateSupermarket.phone = updateSupermarketDto.phone;
    if (updateSupermarketDto.responsable)
      updateSupermarket.responsable = updateSupermarketDto.responsable;
    if (updateSupermarketDto.accreditation)
      updateSupermarket.accreditation = updateSupermarketDto.accreditation;

    return updateSupermarket.save();
  }

  public async removeSupermarket(supermarketId: string) {
    const deleteSupermarket = await this.getOneSupermarket(supermarketId);

    return deleteSupermarket.deleteOne();
  }
}
