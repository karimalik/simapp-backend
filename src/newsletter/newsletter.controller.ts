import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { NewsletterService } from './newsletter.service';
import { newsletterDTO } from './dto/newsletter.dto';
import { SendGridService } from '@anchan828/nest-sendgrid';

@ApiTags('NewsLetter')
@Controller('newsletter')
export class NewsletterController {
  constructor(
    private readonly newsLetterService: NewsletterService,
    private readonly sendGrid: SendGridService,
  ) {}

  @Post()
  @ApiCreatedResponse({ description: 'Suscribe' })
  create(@Body() newsletterDTO: newsletterDTO) {
    return this.newsLetterService.souscrire(newsletterDTO);
  }
}
