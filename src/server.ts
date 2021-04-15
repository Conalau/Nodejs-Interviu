/**
 *  Required External Modules
 */

import * as dotenv from 'dotenv';
import express from 'express'
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

/**
 *  App Variables
 */

const port = process.env.port || process.env.PORT || 9999;

const app = express();


/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */
 app.listen(port, () => {
    console.log('Server listen on' + '' + port);
})