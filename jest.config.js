module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  // Esta línea para quitar el error probocado por la importacion directa de axios
  transformIgnorePatterns: ["/node_modules/(?!axios)"], 
}
