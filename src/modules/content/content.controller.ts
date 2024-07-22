// src/content/content.controller.ts
import { Controller, Get, Query, UseGuards, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ContentService } from './content.service';
import { GetContentDto } from './dto/get-content.dto';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('/content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  async getContent(@Query() filters: GetContentDto) {
    try {
      const result = await this.contentService.getContent(filters);
      return {
        status: 'success',
        data: result,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException('Invalid input data');
      } else {
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }
}
