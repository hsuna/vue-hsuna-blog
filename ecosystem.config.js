module.exports = {
  apps: [
      /**blog-server */
      {
      name: "blog",
      script: "./server/start.js",
      watch: ['server'],
      env_development: {
        NODE_ENV: "development",
        API_HOST: "/api",
        UPLOAD_PATH: "/data/dev/upload/blog",
        PORT: "3000",
        DATABASE: "mongodb://192.168.200.100:27017/dev"
      },
      env_production: {
        NODE_ENV: "production",
        API_HOST: "/",
        UPLOAD_PATH: "/data/prod/upload/blog",
        PORT: "3015",
        DATABASE: "mongodb://192.168.200.100:27017/prod"
      }
    }
  ]
}
