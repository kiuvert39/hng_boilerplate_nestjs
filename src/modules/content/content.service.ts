// src/content/content.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from './entities/content.entity';
import { GetContentDto } from './dto/get-content.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>
  ) {}

  async getContent(filters: GetContentDto) {
    const { type, author, tags, date_from, date_to, page, limit } = filters;
    const query = this.contentRepository.createQueryBuilder('content');

    if (type) {
      query.andWhere('content.type = :type', { type });
    }

    if (author) {
      query.andWhere('content.author = :author', { author });
    }

    if (tags) {
      query.andWhere('content.tags && ARRAY[:...tags]', { tags });
    }

    if (date_from) {
      query.andWhere('content.created_at >= :date_from', { date_from });
    }

    if (date_to) {
      query.andWhere('content.created_at <= :date_to', { date_to });
    }

    const [result, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      content: result,
      pagination: {
        page,
        limit,
        total,
      },
    };
  }
}
