const config = {
  local: {
    NODE_ENV: "localhost",
    API_HOST: "/api",
    UPLOAD_PATH: "D:/updateFile",
    PORT: "3000",
    DATABASE: "mongodb://127.0.0.1:27017/test"
  }
};
console.log(`process.env.NODE_ENV::${process.env.NODE_ENV}`)

export default process.env.NODE_ENV ? process.env : config.local;
