import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewsLetter } from 'src/types/newsletter';
import { v4 as uuidv4 } from 'uuid';
import { newsletterDTO } from './dto/newsletter.dto';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectModel('NewsLetter') private newsletterModel: Model<NewsLetter>,
  ) {}

  async souscrire(newsletterDto: newsletterDTO) {
    const souscrire = new this.newsletterModel();

    souscrire.newsletterId = uuidv4();
    souscrire.email = newsletterDto.email;

    return souscrire.save();
  }
}
