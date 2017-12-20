(function(){
    'use strict';
    angular
        .module('app')
        .factory('alegraService',  alegraService);

    function alegraService(Credentials,$http){
      console.log(Credentials.email);
      console.log(Credentials.token);
      var data = Credentials.email+':'+Credentials.token;
      console.log(data);
      var base64encodeData = codificar(data);
      console.log(base64encodeData);

      function getContacts(start) {
        return $http.get(Credentials.dirApi+encodeURI('?metadata=true&start='+start),{
          headers:{
            'Authorization': ' Basic ' + base64encodeData
          },
          json:true
        });
      };

      function deleteContact(contactId) {
        return $http.delete(Credentials.dirApi+contactId,{
          headers:{
            'Authorization': ' Basic ' + base64encodeData
          },
          json:true
        });
      };
      ////utility//////
      function codificar(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
      }
      //////////////////////////////////////////////////////////////////////////////////////////
      var services = {
        getContacts: getContacts,
        deleteContact: deleteContact 
      };
        
      return services;
      
    }
})();