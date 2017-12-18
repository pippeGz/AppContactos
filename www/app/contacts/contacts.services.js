(function(){
    'use strict';
    
    angular
        .module('app')
        .factory('alegraService',  alegraService);

    //alegraService.$inject = ['Credentials','$http'];

    function alegraService(Credentials,$http){

      var services = {
        getContacts: getContacts
      };
        
      return services;
      ///////////////////////////////////////////////

      function getContacts() {
        return $http.get(Credentials.dirApi,{});
        console.log(Credentials);
      };
        
    }
})();