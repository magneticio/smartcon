import config from "../config";

export default {
  data: data => {
    return {
      version: {
        app: config.version
      },
      data: data
    };
  },
  model: (data, version) => {
    return {
      version: {
        app: config.version,
        model: version
      },
      data: data
    };
  }
};
