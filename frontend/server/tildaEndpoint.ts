import * as express from 'express';

const ROOT = process.env.NO_DOCKER_DEV
  ? '../../../backend/data/volume/tilda'
  : '/data/tilda';

const router = express.Router();

interface ConfigItem {
  alias: string;
  filename: string;
}

type Config = ConfigItem[];

const config = require(ROOT + '/config.json') as Config;

config.forEach(configItem => {
  router.get('/' + configItem.alias, (_, res) => {
    res.sendFile(ROOT + '/' + configItem.filename);
    console.log(
      'Tilda route ' + configItem.alias + ' -> ' + configItem.filename
    );
  });
});

export default router;
