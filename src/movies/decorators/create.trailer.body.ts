import { applyDecorators } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

export function CreateTrailerBody() {
  return applyDecorators(
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
          },
          preview: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
  );
}
