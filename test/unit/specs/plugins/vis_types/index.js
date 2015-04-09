define(function (require) {
  describe('Vis Type', function () {
    [
      require('specs/plugins/vis_types/_renderbot'),
      require('specs/plugins/vis_types/vislib/_index')
    ].forEach(function (s) {
      describe(s[0], s[1]);
    });
  });
});
