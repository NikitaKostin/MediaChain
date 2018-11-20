'use strict';
let fakeNewsControllers = angular.module('fakeNewsControllers', []);

fakeNewsControllers.controller('pageController', ['$scope', 'fakeNewsService', '$filter', function (scope, fakeNewsService, filter) {
    const clearNewNews = () => {
        scope.openNewNewsDialog = false;
        scope.selectedAuthor = [];
        scope.authors = [];
        scope.newNews = {
            "title": "",
            "text": "",
            "originId": "",
            "authorId": "",
            "authorName": ""
        };
    };

    const getNews = () => {
        fakeNewsService.getNews().then((c) => {
            console.log('c', c.data);
            if (c.data) {
                scope.news = c.data.map(news => {
                    news.author = decodeURI(news.author.substr(34));
                    return news;
                });
            }
        });
    };
    getNews();

    scope.clickOpenNewNewsDialog = () => {
        fakeNewsService.getAuthors().then((c) => {
            console.log('authors', c.data);
            if (c.data) {
                scope.authors = c.data;
            }
        });
        scope.openNewNewsDialog = true;
    };

    scope.clickCloseNewNewsDialog = () => {
        clearNewNews();
    };

    scope.loadAuthors = ($query) => scope.authors.filter((author) => author.Name.toLowerCase().indexOf($query.toLowerCase()) !== -1);

    scope.addNewNews = () => {
        console.log('new', scope.newNews);
        console.log();
        fakeNewsService.sendNewNews({
            "$class": "org.example.basic.News",
            "newsId": new Date().getTime().toString() + Math.floor(Math.random() * 100).toString(),
            "title": scope.newNews.title,
            "text": scope.newNews.title,
            "flag": true,
            "timestamp": filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ss.sssZ'),
            "author": scope.selectedAuthor[0].Name
        }).then((c) => {
            getNews();
            clearNewNews();
        }).catch(err => {
            console.log('err', err);
        })
        /*
        {
      "$class": "org.example.basic.News",
      "newsId": "4643643",
      "title": "Новость Новая",
      "text": "Текст для новой новости",
      "flag": true,
      "timestamp": filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ss.sssZ'),
      "author": "Roman Khafizov"
    }
        */
    }

}]);