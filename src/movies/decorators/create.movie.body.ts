import { applyDecorators } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

export function CreateMovieBody() {
  return applyDecorators(
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          year: { type: 'number' },
          duration: { type: 'string' },
          rating: { type: 'string' },
          cast: {
            type: 'array',
            items: {
              properties: {
                name: { type: 'string' },
              },
            },
          },
          trailers: {
            type: 'array',
            items: {
              properties: {
                url: { type: 'string' },
              },
            },
          },
          poster: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  );
}
