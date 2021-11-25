import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Clients, ClientsDocument } from './schemas/clients.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Clients.name) private ClientsModel: Model<ClientsDocument>,
  ) {}
  public async newClients(createClientDto: CreateClientDto): Promise<Clients> {
    const newClients = new this.ClientsModel();

    newClients.clientId = uuidv4();
    newClients.name = createClientDto.name;
    newClients.prenom = createClientDto.prenom;
    newClients.age = createClientDto.age;
    newClients.sexe = createClientDto.sexe;
    newClients.phone = createClientDto.phone;
    newClients.email = createClientDto.email;
    newClients.musique = createClientDto.musique;

    return newClients.save();
  }

  public async findAllClient() {
    return this.ClientsModel.find().exec();
  }

  public async findOneClient(clientId: string) {
    const findClient = await this.ClientsModel.findOne({ clientId });

    //if the products doesn't exit return error message else return the products
    if (!findClient)
      throw new NotFoundException(
        `Client with the id ${clientId} was not found`,
      );

    return findClient;
  }

  public async updateClient(
    clientId: string,
    updateClientDto: UpdateClientDto,
  ) {
    const updateClient = await this.findOneClient(clientId);

    if (updateClient.name) updateClient.name = updateClientDto.name;
    if (updateClient.prenom) updateClient.prenom = updateClientDto.prenom;
    if (updateClient.age) updateClient.age = updateClientDto.age;
    if (updateClient.sexe) updateClient.sexe = updateClientDto.sexe;
    if (updateClient.phone) updateClient.phone = updateClientDto.phone;
    if (updateClient.email) updateClient.email = updateClientDto.email;
    if (updateClient.musique) updateClient.musique = updateClientDto.musique;

    return updateClient.save();
  }

  public async removeClient(clientId: string) {
    const deleteClient = await this.findOneClient(clientId);

    return deleteClient.deleteOne();
  }
}
