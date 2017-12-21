(function(){
    'use strict';
    angular
        .module('app')
        .factory('ionicAlert',  ionicAlert);

    function ionicAlert($ionicPopup){
        return {
            //Muestra un alert con mensaje para errores
            showError: function alertIonic(tit,msg,err) {
                var alertPopup = $ionicPopup.alert({
                  title: tit,
                  template: msg+err
                });
                return alertPopup;
            },
            //Muestra un alert
            showAlert: function alertIonic(tit,msg) {
                var alertPopup = $ionicPopup.alert({
                  title: tit,
                  template: msg
                });
                return alertPopup;
            }
        }
    }
})();