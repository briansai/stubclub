// NextJS doesn't always detect file changes and doesn't update in docker container.
// Pull all different files once every 300 ms.
module.exports = {
  webpackDevMiddleware: config => {
    config.watchOptions.poll = 300;
    return config;
  }
};
