(function(){
    'use strict';
    angular
        .module('app.add-contact')
        .controller('AddContactCtrl', AddContactCtrl);

        function AddContactCtrl($scope,alegraService,loadings,ionicAlert,$state){
            /**Parametros que se cargan cuando se entra a esta vista */
            $scope.$on('$ionicView.enter', function(){
                $scope.citys=alegraService.getCitys();
                $scope.contactModel={};
            });
            /**Funcion para crear un nuevo contacto */
            $scope.newContact=function (){
                loadings.show();
                alegraService.createContact($scope.contactModel)
                .success(function(result){
                    loadings.hide();
                    ionicAlert.showAlert("Info","El contacto se creó correctamente");
                    $scope.contactModel={};
                })
                .error(function(error){
                    ionicAlert.showError("Error","Error al traer datos del servidor code: ",error.message);
                    loadings.hide();
                });
            }
        }
})();