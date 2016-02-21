var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

function simplifyPlugins(jsonInstalledPackagesDescriptorFile) {
  return fs.readFileAsync(jsonInstalledPackagesDescriptorFile).then(function(fileContent) {
    return JSON.parse(fileContent);
  }).then(function(plugins) {
    var simplifiedPackages = {};

    Object.keys(plugins).map(function(rootKey) {
      simplifiedPackages[rootKey] = plugins[rootKey].map(function(plugin) {
        var simplifiedPlugin = {};
        Object.keys(plugin).map(function(pluginKey) {
          if (["name", "description", "version"].indexOf(pluginKey) >= 0) {
            simplifiedPlugin[pluginKey] = plugin[pluginKey];
          }
        });
        return simplifiedPlugin;
      });
    });

    return simplifiedPackages;
  });
}

simplifyPlugins("./atom-packages.json").then(function(simplifiedPlugins) {
  console.dir(simplifiedPlugins);
});
