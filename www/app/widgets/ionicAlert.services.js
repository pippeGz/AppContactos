(function(){
    'use strict';
    angular
        .module('app')
        .factory('ionicAlert',  ionicAlert);

    function ionicAlert($ionicPopup){
        return {
            show: function alertIonic(tit,msg,err) {
                var alertPopup = $ionicPopup.alert({
                  title: tit,
                  template: msg+err
                });
                return alertPopup;
            }
        }
    }
})();