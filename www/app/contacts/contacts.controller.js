(function(){
    'use strict';
    angular
        .module('app.contacts')
        .controller('ContactsCtrl', ContactsCtrl);

        function ContactsCtrl($scope, alegraService){
            $scope.contacts = alegraService.getContacts();   
        }
})();