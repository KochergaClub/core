const express = require('express');

const ROOT = '/data/tilda';

const config = require(ROOT + '/config.json');

const router = express.Router();

config.forEach(configItem => {
  router.get('/' + configItem.alias, (req, res) => {
    res.sendFile(ROOT + '/' + configItem.filename);
    console.log(
      'Tilda route ' + configItem.alias + ' -> ' + configItem.filename
    );
  });
});

exports.default = router;
