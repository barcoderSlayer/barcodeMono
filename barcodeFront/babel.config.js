//로컬환경 env
module.exports = {
    "presets": ['babel-preset-expo'],
    "plugins":[
      // react native-dotenv
      [
        'module:react-native-dotenv',
        {
          "envName": "APP_ENV",
          "moduleName": "@env",
          "path": ".env",
          "blocklist": null,
          "allowlist": null,
          "blacklist": null, 
          "whitelist": null, 
          "safe": true,
          "allowUndefined": true,
          "verbose": false
        },
      ]
    ]
  };

