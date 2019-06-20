const {rewireWorkboxGenerate, defaultGenerateConfig} = require('react-app-rewire-workbox');

module.exports = function override(config, env) {
  if (env === "production") {
    console.log("Production build - Adding Workbox for PWAs");
    const workboxConfig = {
      ...defaultGenerateConfig,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/api\.wordpress\.org\/.+/,
          handler: 'networkFirst',
          options: {
            cacheName: 'wp-org-api',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24
            }
          }
        },
        {
          urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.+/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'jsdelivr',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24
            }
          }
        }
      ],
    };
    config = rewireWorkboxGenerate(workboxConfig)(config, env);
  }

  return config;
};
