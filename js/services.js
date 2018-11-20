'use strict';

let fakeNewsServices = angular.module('fakeNewsServices', []);
const url = "http://81.5.113.54:8081/api";

fakeNewsServices.service("fakeNewsService", function ($http, growl) {
    return {
        sendNewNews: (data) =>
            $http({
                url: url + "/News",
                method: "POST",
                data: data,
                headers: {'Content-Type': 'application/json'},
                withCredentials: true,
                crossDomain: true
            })
                .success((c, d, e, f) => {
                    console.log("success", c);
                    growl.success("Новость успешно добавлена!");
                })
                .error((c, s) => {
                    console.log('error c', c);
                    growl.error("Ошибка при добавлении новости!");
                }),
        getNews: () => $http.get(url + "/News")
            .success((callback) => callback)
            .error(() => {
                growl.error("Ошибка при получении списка новостей!");
            }),
        getAuthors: () => $http.get(url + "/Author")
            .success((callback) => callback)
            .error(() => {
                growl.error("Ошибка при получении списка авторов!");
            }),
    }
});
