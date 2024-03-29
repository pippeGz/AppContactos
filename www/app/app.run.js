(function(){
    'use strict';
    angular
        .module('app')
        .value('Credentials',{
            'dirApi': 'https://app.alegra.com/api/v1/contacts',
            'email': 'TuCorreo@mail.com',
            'token': 'TuToken',
            'Content-Type': 'application/json'
        })
        .run( runApp );        

    function runApp($ionicPlatform){
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    }

})();