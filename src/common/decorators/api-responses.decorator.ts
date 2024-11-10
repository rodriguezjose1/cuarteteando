import { applyDecorators, Type } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export const SwaggerGetOneResponse = <T extends Type<any>>(summary: string, entity: T) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({ status: 200, type: entity }),
    ApiResponse({ status: 404, description: 'Not found' })
  );
};

export const SwaggerGetAllResponse = <T extends Type<any>>(summary: string, entity: T) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({ status: 200, type: entity, isArray: true })
  );
};

export const SwaggerCreateResponse = <T extends Type<any>>(summary: string, entity: T) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: entity }),
    ApiResponse({ status: 201, type: entity }),
    ApiResponse({ status: 400, description: 'Bad request' })
  );
};

export const SwaggerUpdateResponse = <T extends Type<any>>(summary: string, entity: T) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiParam({ name: 'id', type: 'number' }),
    ApiBody({ type: entity }),
    ApiResponse({ status: 200, type: entity }),
    ApiResponse({ status: 404, description: 'Not found' })
  );
};

export const SwaggerDeleteResponse = <T extends Type<any>>(summary: string, entity: T) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiParam({ name: 'id', type: 'number' }),
    ApiResponse({ status: 204, type: entity }),
    ApiResponse({ status: 404, description: 'Not found' })
  );
}