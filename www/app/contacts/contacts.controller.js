(function(){
    'use strict';
    angular
        .module('app.contacts')
        .controller('ContactsCtrl', ContactsCtrl);

        function ContactsCtrl($scope, alegraService,loadings){
            
            //$scope.contacts = alegraService.getContacts();   
            loadings.show();
            alegraService.getContacts()//$rootScope.empresaId
            .success(function(result){
                $scope.contacts=result;
              console.log($scope.contacts);   
              loadings.hide();
            })
            .error(function(error){
              console.log("Error al traer datos, Respuesta del servidor:"+error);
              loadings.hide();
            });

            $scope.GoToAddContact= function GoToAddContact(){
                console.log("carga controller");
            }

        }
})();