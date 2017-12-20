(function(){
    'use strict';
    angular
        .module('app.contacts')
        .controller('ContactsCtrl', ContactsCtrl);

        function ContactsCtrl($scope, alegraService,loadings,ionicAlert,$ionicPopup,$ionicHistory){

            $scope.$on('$ionicView.enter', function(){
                $ionicHistory.clearHistory();
                $scope.start = 0;
                $scope.cantRegistServ = 0;
                $scope.infiniteScrollComplete = true;
                $scope.contacts=[];//$rootScope
                load();
            });
            
            function load(){
                loadings.show();
                alegraService.getContacts($scope.start)
                .success(function(result){
                    console.log(result);
                    for(var i=0; i<result.data.length; i++){
                        $scope.text = result.data[i].name;
                        $scope.initialletter = $scope.text.charAt(0);
                        result.data[i].letter=$scope.initialletter;
                    }
                    $scope.contacts=result.data;
                    $scope.cantRegistServ=result.metadata.total;
                    $scope.start=$scope.contacts.length;
                    console.log($scope.contacts);
                    console.log($scope.cantRegistServ); 
                    console.log($scope.start); 
                    loadings.hide();
                })
                .error(function(error){
                    ionicAlert.showError("Error","Error al traer datos del servidor code: ",error);
                    loadings.hide();
                });
            }
            
            $scope.doRefresh = function(){
                $scope.contacts=[];
                $scope.start=0;
                console.log($scope.contacts);
                alegraService.getContacts($scope.start)
                .success(function(result){
                    console.log(result);
                    for(var i=0; i<result.data.length; i++){
                        $scope.text = result.data[i].name;
                        $scope.initialletter = $scope.text.charAt(0);
                        result.data[i].letter=$scope.initialletter;
                    }
                    $scope.contacts=result.data;
                    $scope.cantRegistServ=result.metadata.total;
                    $scope.start=$scope.contacts.length;
                    console.log($scope.contacts);
                    console.log($scope.cantRegistServ); 
                    console.log($scope.start); 
                    $scope.$broadcast('scroll.refreshComplete');
                })
                .error(function(error){
                    ionicAlert.showError("Error","Error al traer datos del servidor code: ",error);
                    console.log("Error al traer datos, Respuesta del servidor:"+error);
                    $scope.$broadcast('scroll.refreshComplete');
                });
            }

            $scope.loadMore = function(){
                console.log($scope.start);
                alegraService.getContacts($scope.start)
                    .success(function(result){
                        console.log(result);
                        for(var i=0; i<result.data.length; i++){
                            $scope.text = result.data[i].name;
                            $scope.initialletter = $scope.text.charAt(0);
                            result.data[i].letter=$scope.initialletter;
                        }
                        $scope.cantRegistServ=result.metadata.total;
                        console.log($scope.start);
                        $scope.start=$scope.start+result.data.length;
                        console.log($scope.start); 
                        if($scope.start < $scope.cantRegistServ){
                            for(var i=0; i<result.data.length; i++){
                                $scope.contacts.push(result.data[i]);
                            }
                            console.log('load more success');
                            $scope.infiniteScrollComplete = true;
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        }else if($scope.start == $scope.cantRegistServ){
                            for(var i=0; i<result.data.length; i++){
                                $scope.contacts.push(result.data[i]);
                            }
                            console.log('Variables iguales no hay mas datos para cargar')
                            $scope.infiniteScrollComplete = false;
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        }else{
                            console.log('load more error')
                            $scope.infiniteScrollComplete = false;
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        }
                    })
                    .error(function(error){
                        console.log(error);
                        ionicAlert.showError("Error","Error al traer datos del servidor code: ",error);
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    });
            }

            $scope.moreDataCanBeLoad = function(){
                if($scope.infiniteScrollComplete == true){
                    return true;
                }else{
                    return false;
                }
            }

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
                                console.log(error);
                                ionicAlert.showError("Error","Error al traer datos del servidor code: ",error);
                                loadings.hide();
                            });
                    }
                });
            }
        }
})();