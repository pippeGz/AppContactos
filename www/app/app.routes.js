(function(){
    'use strict';
    angular
        .module('app')
        .config( routeConfig );

    function routeConfig($stateProvider, $urlRouterProvider, $ionicConfigProvider){

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/contacts');

        $stateProvider
        
            .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'app/menu/menu.html',
            controller: 'MenuCtrl'
          })
        
          .state('app.info', {
            url: '/info',
            views: {
              'menuContent': {
                templateUrl: 'app/info/info.html',
                controller: 'InfoCtrl'
              }
            }
          })
        
          .state('app.add-contact', {
              url: '/add-contact',
              views: {
                'menuContent': {
                  templateUrl: 'app/add-contact/add-contact.html',
                  controller: 'AddContactCtrl'
                }
              }
            })
            .state('app.contacts', {
              url: '/contacts',
              views: {
                'menuContent': {
                  templateUrl: 'app/contacts/contacts.html',
                  controller: 'ContactsCtrl'
                }
              }
            })
        
          .state('app.contact', {
            url: '/contact/:playlistId',
            views: {
              'menuContent': {
                templateUrl: 'app/contact/contact.html',
                controller: 'ContactCtrl'
              }
            }
          });
    }
})();