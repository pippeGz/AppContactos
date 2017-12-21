(function(){
    'use strict';
    angular
        .module('app.contact')
        .controller('ContactCtrl', ContactCtrl);

        function ContactCtrl($scope, $stateParams,alegraService,loadings,ionicAlert,$ionicPopup){
            $scope.contactIdSelected=$stateParams.Id;//Recibe el parametro que se envía por url
            $scope.contactDelete=false;//variable para saber si se ha borrado el contacto
            /**Funcion para cargar el contacto */
            loadings.show();
            alegraService.getContact($scope.contactIdSelected)
                .success(function(result){
                    $scope.contact=result;
                    loadings.hide();
                })
                .error(function(error){
                    ionicAlert.showError("Error","Error al traer datos del servidor code: ",error.message);
                    loadings.hide();
                });                    
            /**Funcion para borrar un contacto desde la vista de detalle */
            $scope.actionDelete = function(idContact){
                $ionicPopup.confirm({
                    title: 'Información',
                    template: '<h3 style="text-align:center;">¿Realmente desea eliminar este contacto?</h3>'
                }).then(function(confirm){
                    if(confirm){
                        loadings.show();
                        alegraService.deleteContact(idContact)
                            .success(function(){
                                $scope.contactDelete=true;
                                loadings.hide();
                            })
                            .error(function(error){
                                ionicAlert.showError("Error","Error al eliminar el contacto code: ",error.message);
                                loadings.hide();
                            });
                    }
                });
            }
        }
})();