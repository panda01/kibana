define(function (require) {
  var angular = require('angular');
  var _ = require('lodash');
  var sinon = require('test_utils/auto_release_sinon');

  // Load the kibana app dependencies.
  require('services/private');
  require('plugins/discover/components/field_chooser/discover_field');

  var $parentScope, $scope, indexPattern;

  var init = function ($elem, props) {
    inject(function ($rootScope, $compile) {
      $parentScope = $rootScope;
      _.assign($parentScope, props);
      $compile($elem)($parentScope);
      $elem.scope().$digest();
      $scope = $elem.scope();
    });
  };

  var destroy = function () {
    $scope.$destroy();
    $parentScope.$destroy();
  };

  describe('discoverField', function () {
    var $elem;

    beforeEach(module('kibana'));
    beforeEach(function () {
      $elem = angular.element('<discover-field></discover-field>');
      inject(function (Private) {
        indexPattern = Private(require('fixtures/stubbed_logstash_index_pattern'));
      });
      init($elem, {
        field: indexPattern.fields.byName.extension,
        increaseFieldCounter: sinon.spy(),
        toggle: function (field) {
          indexPattern.fields.byName[field].display = !!!indexPattern.fields.byName[field].display;
        }
      });
    });

    afterEach(function () {
      destroy();
    });

    describe('toggleDisplay', function () {
      it('should exist', function (done) {
        expect($scope.toggleDisplay).to.be.a(Function);
        done();
      });

      it('should toggle the display of the field', function (done) {
        $scope.toggleDisplay($scope.field);
        expect($scope.field.display).to.be(true);
        done();
      });

      it('should increase the field popularity', function (done) {
        $scope.toggleDisplay($scope.field);
        expect($scope.increaseFieldCounter.called).to.be(true);
        done();
      });
    });
  });
});
