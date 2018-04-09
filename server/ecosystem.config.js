module.exports = {
  "apps": [{
    "name": "blog",
    "script": "./start.js",
    "watch": true,
    "env": {
      "NODE_ENV": "development"
    },
    "env_production": {
      "NODE_ENV": "production"
    }
  }]
}
