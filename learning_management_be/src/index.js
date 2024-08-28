const app = require('./app');
const config = require('./configs/app');
const logger = require('./utils/logger');

app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port}`);
});