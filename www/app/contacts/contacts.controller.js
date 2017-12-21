(function(){
    'use strict';
    angular
        .module('app.contacts')
        .controller('ContactsCtrl', ContactsCtrl);

        function ContactsCtrl($scope, alegraService,loadings,ionicAlert,$ionicPopup,$ionicHistory){
            /**Parametros que se cargan cada vez que se entra a la vista */
            $scope.$on('$ionicView.enter', function(){
                $ionicHistory.clearHistory();
                $scope.start = 0;
                $scope.cantRegistServ = 0;
                $scope.infiniteScrollComplete = true;
                $scope.contacts=[];
                load();
            });
            /**Funcion que carga los primeros contactos de la lista */
            function load(){
                loadings.show();
                alegraService.getContacts($scope.start)
                .success(function(result){
                    /**For para obtener la primera letra de cada nombre y mostrar la imagen con dicha letra en la vista*/
                    for(var i=0; i<result.data.length; i++){
                        $scope.text = result.data[i].name;
                        $scope.initialletter = $scope.text.charAt(0);
                        result.data[i].letter=$scope.initialletter;
                    }
                    $scope.contacts=result.data;
                    $scope.cantRegistServ=result.metadata.total;//Guarda el numero de contactos en total que tiene el server
                    $scope.start=$scope.contacts.length;//Guarda el numero desde el cual debe iniciar la carga
                    loadings.hide();
                })
                .error(function(error){
                    ionicAlert.showError("Error","Error al traer datos del servidor code: ",error.message);
                    loadings.hide();
                });
            }
            /**Funcion para cargar datos desde el pull to refresh */
            $scope.doRefresh = function(){
                $scope.contacts=[];
                $scope.start=0;
                alegraService.getContacts($scope.start)
                .success(function(result){
                    /**For para obtener la primera letra de cada nombre */
                    for(var i=0; i<result.data.length; i++){
                        $scope.text = result.data[i].name;
                        $scope.initialletter = $scope.text.charAt(0);
                        result.data[i].letter=$scope.initialletter;
                    }
                    $scope.contacts=result.data;
                    $scope.cantRegistServ=result.metadata.total;//Guarda el numero de contactos en total que tiene el server
                    $scope.start=$scope.contacts.length;//Guarda el numero desde el cual debe iniciar la carga
                    $scope.$broadcast('scroll.refreshComplete');
                })
                .error(function(error){
                    ionicAlert.showError("Error","Error al traer datos del servidor code: ",error.message);
                    $scope.$broadcast('scroll.refreshComplete');
                });
            }
            /**Funcion para cargar mas datos con el Scroll Infinito */
            $scope.loadMore = function(){
                alegraService.getContacts($scope.start)
                    .success(function(result){
                        /**For para obtener la primera letra de cada nombre */
                        for(var i=0; i<result.data.length; i++){
                            $scope.text = result.data[i].name;
                            $scope.initialletter = $scope.text.charAt(0);
                            result.data[i].letter=$scope.initialletter;
                        }
                        $scope.cantRegistServ=result.metadata.total;//Guarda el numero de contactos en total que tiene el server
                        $scope.start=$scope.start+result.data.length;//Guarda el numero desde el cual debe iniciar la carga 
                        /**SI la cantidad de datos cargados es menor a la cantidad de datos en el server: faltan datos por cargar */
                        if($scope.start < $scope.cantRegistServ){
                            for(var i=0; i<result.data.length; i++){
                                $scope.contacts.push(result.data[i]);
                            }
                            $scope.infiniteScrollComplete = true;//Se setea en true para que siga cargando mas datos 
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        }else if($scope.start == $scope.cantRegistServ){/**SI la cantidad de datos cargados es igual a la cantidad de datos en el server: NO quedan datos por cargar */
                            for(var i=0; i<result.data.length; i++){
                                $scope.contacts.push(result.data[i]);
                            }
                            $scope.infiniteScrollComplete = false;//Se setea en false para que NO cargue mas datos 
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        }else{
                            $scope.infiniteScrollComplete = false;//Se setea en true para que siga cargando mas datos 
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        }
                    })
                    .error(function(error){
                        ionicAlert.showError("Error","Error al traer datos del servidor code: ",error.message);
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    });
            }
            /**Funcion para saber si hay mas datos por cargar*/
            $scope.moreDataCanBeLoad = function(){
                if($scope.infiniteScrollComplete == true){
                    return true;
                }else{
                    return false;
                }
            }
            /**Funcion para borrar un contacto */
            $scope.actionDelete = function(idContact,indice){
                $ionicPopup.confirm({
                    title: 'Información',
                    template: '<h3 style="text-align:center;">¿Realmente desea eliminar este contacto?</h3>'
                }).then(function(confirm){
                    if(confirm){
                        loadings.show();
                        alegraService.deleteContact(idContact)
                            .success(function(){
                                $scope.contacts.splice(indice, 1);
                                loadings.hide();
                            })
                            .error(function(error){
                                ionicAlert.showError("Error","Error al traer datos del servidor code: ",error.message);
                                loadings.hide();
                            });
                    }
                });
            }
        }
})();