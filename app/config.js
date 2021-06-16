module.exports = {
  mongodb: {
    host: "127.0.0.1",
    database: "dev",
    port: 27017,
    username: "",
    password: "",
  },
  mongoose: {
    options: {
      toJSON: {
        virtuals: true,
        versionKey: false,
        transform(doc, ret) {
          delete ret._id;
          return ret;
        },
      },
    },
  },
};
