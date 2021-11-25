/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAssignDto } from './dto/create-assign.dto';
import { Model } from 'mongoose';
import { UpdateAssignDto } from './dto/update-assign.dto';
import { Assign, AssignDocument } from './schemas/assign.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AssignService {
  constructor(
    @InjectModel(Assign.name) private AssignModel: Model<AssignDocument>,
  ) {}
  async create(createAssignDto: CreateAssignDto): Promise<Assign> {
    const newAssign = new this.AssignModel(createAssignDto);
    newAssign.assignId = uuidv4();
    await newAssign.populate(['productId', 'storeId']);
    return await newAssign.save();
  }

  async findAll() {
    return await this.AssignModel.find().populate(['productId', 'storeId']);
  }

  async findOne(assignId: string) {
    const findAssign = await this.AssignModel.findOne({ assignId }).populate([
      'productId',
      'storeId',
    ]);

    if (!findAssign) throw new NotFoundException(`Not found`);

    return findAssign;
  }

  async update(assignId: string, updateAssignDto: UpdateAssignDto) {
    const updateA = await this.findOne(assignId);

    if (updateAssignDto.quantite) updateA.quantite = updateAssignDto.quantite;
    if (updateAssignDto.storeId) updateA.storeId = updateAssignDto.storeId;
    if (updateAssignDto.productId)
      updateA.productId = updateAssignDto.productId;

    return updateA.save();
  }

  async remove(assignId: string) {
    const removeA = await this.findOne(assignId);

    return removeA.deleteOne();
  }
}
