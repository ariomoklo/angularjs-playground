const App = angular.module("App", ["ngRoute", "appControllers"]);

App.config([
  "$routeProvider",
  ($routeProvider) => {
    $routeProvider.when("/", {
      templateUrl: "src/partials/validator.html",
      controller: "ValidatorController",
    });
  },
]);

const AppControllers = angular.module("appControllers", []);
