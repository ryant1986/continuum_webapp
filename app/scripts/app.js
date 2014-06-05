'use strict';

angular
  .module('ContinuumWebapp', [
    'ngResource'
  ])
  .factory('JobInfo', function($resource) {
    return $resource('http://172.27.0.246:8080/jobinfo/:id');
  })
  .controller('ContinuumController', function ($scope, JobInfo) {
    var updateJobInfos = function() {
        JobInfo.query(function(data) {
          $scope.jobinfos = data;
        });
      };

    $scope.submitJob = function() {
        JobInfo.save($scope.newjob, function() {
          updateJobInfos();
          $scope.newjob = null;
        });
      };

    $scope.markNotRegerssion = function(job) {
      job.isRegression = false;
      JobInfo.save(job, function() {
        updateJobInfos();
      });
    };

    updateJobInfos();
  });
