(function(){
    'use strict';
    angular
        .module('app')
        .factory('alegraService',  alegraService);

    function alegraService(Credentials,$http){
///////////////////////////////////////////////////// Utility Functions /////////////////////////////////////////////////////
        function getCitys() {
          var citys=[
            {'id':0,'value':'','text':'Seleccione'},
            {'id':1,'value':'Arauca','text':'Arauca'},
            {'id':2,'value':'Armenia','text':'Armenia'},
            {'id':3,'value':'Barranquilla','text':'Barranquilla'},
            {'id':4,'value':'Bogotá','text':'Bogotá'},
            {'id':5,'value':'Bucaramanga','text':'Bucaramanga'},
            {'id':6,'value':'Cali','text':'Cali'},
            {'id':7,'value':'Cartagena','text':'Cartagena'},
            {'id':8,'value':'Cúcuta','text':'Cúcuta'},
            {'id':9,'value':'Florencia','text':'Florencia'},
            {'id':10,'value':'Ibagué','text':'Ibagué'},
            {'id':11,'value':'Leticia','text':'Leticia'},
            {'id':12,'value':'Manizales','text':'Manizales'},
            {'id':13,'value':'Medellín','text':'Medellín'},
            {'id':14,'value':'Mitú','text':'Mitú'},
            {'id':15,'value':'Mocoa','text':'Mocoa'},
            {'id':16,'value':'Montería','text':'Montería'},
            {'id':17,'value':'Neiva','text':'Neiva'},
            {'id':18,'value':'Pasto','text':'Pasto'},
            {'id':19,'value':'Pereira','text':'Pereira'},
            {'id':20,'value':'Popayán','text':'Popayán'},
            {'id':21,'value':'Puerto Carreño','text':'Puerto Carreño'},
            {'id':22,'value':'Puerto Inírida','text':'Puerto Inírida'},
            {'id':23,'value':'Quibdó','text':'Quibdó'},
            {'id':24,'value':'Riohacha','text':'Riohacha'},
            {'id':25,'value':'San Andres','text':'San Andres'},
            {'id':26,'value':'San José del Guaviare','text':'San José del Guaviare'},
            {'id':27,'value':'Santa Marta','text':'Santa Marta'},
            {'id':28,'value':'Sincelejo','text':'Sincelejo'},
            {'id':29,'value':'Tunja','text':'Tunja'},
            {'id':30,'value':'Valledupar','text':'Valledupar'},
            {'id':31,'value':'Villavicencio','text':'Villavicencio'},
            {'id':32,'value':'Yopal','text':'Yopal'}                    
          ]
          return citys;
        };

        function codificar(str) {
          return window.btoa(unescape(encodeURIComponent(str)));
        }
///////////////////////////////////////////////////// Utility Functions /////////////////////////////////////////////////////
///////////////////////////////////////////////////// Services Functions /////////////////////////////////////////////////////
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
        return $http.delete(Credentials.dirApi+'/'+contactId,{
          headers:{
            'Authorization': ' Basic ' + base64encodeData
          },
          json:true
        });
      };

      function createContact(dataContact) {
        return $http.post(Credentials.dirApi,dataContact,{
          headers:{
            'Authorization': ' Basic ' + base64encodeData
          },
          json:true
        });
      };
///////////////////////////////////////////////////// Services Functions /////////////////////////////////////////////////////
      var services = {
        getContacts: getContacts,
        deleteContact: deleteContact,
        createContact: createContact,
        getCitys: getCitys
      };
        
      return services;
      
    }
})();