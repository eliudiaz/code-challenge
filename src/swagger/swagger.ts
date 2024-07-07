import swaggerUi from 'swagger-ui-express';
import {Express} from 'express';
import * as swaggerDocument from '../swagger.json';

export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
