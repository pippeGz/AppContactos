(function(){
    'use strict';
    angular
        .module('app.add-contact')
        .controller('AddContactCtrl', AddContactCtrl);

        function AddContactCtrl($scope,alegraService,loadings,ionicAlert,$state){

            $scope.$on('$ionicView.enter', function(){
                $scope.citys=alegraService.getCitys();
                $scope.contactModel={};
            });

            $scope.newContact=function (){
                console.log($scope.contactModel);
                loadings.show();
                alegraService.createContact($scope.contactModel)
                .success(function(result){
                    console.log(result);
                    loadings.hide();
                    ionicAlert.showAlert("Info","el contacto se creó correctamente");
                    $scope.contactModel={};
                })
                .error(function(error){
                    ionicAlert.showError("Error","Error al traer datos del servidor code: ",error.message);
                    console.log(error);
                    loadings.hide();
                });
            }
        }
})();