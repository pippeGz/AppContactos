(function(){
    'use strict';
    
    angular
        .module('app')
        .factory('loadings',  loadings);

    function loadings($ionicLoading){
        return {
            show: function(){
                $ionicLoading.show({
                template: 'Cargando...<br><ion-spinner class="spinner-light" icon="crescent"></ion-spinner>'
                });
            },
            hide: function(){
                $ionicLoading.hide();
            }
        }
    }
})();