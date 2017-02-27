'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])


    .controller('View1Ctrl',View1Ctrl );


function View1Ctrl($scope,FormDetailsService,ngNotify,UserDetailsService){

    UserDetailsService.ReloadPage();
      $scope.forms_list=[
      ];


    $scope.query={};
    $scope.query.type="none";
    $scope.query.gosh="";
    $scope.query.helka="";
    $scope.query.megrash="";
    $scope.query.name="";
$scope.RefreshList=function(){
        FormDetailsService.getLast10Forms().then(function (result) {
                if (result != null) {
                    $scope.forms_list = result;
                }
            }, function (err) {
            }
        );
    }



    $scope.goSearchBy=function () {

        if(  ($scope.query.type=="none" ||$scope.query.type=="") && $scope.query.name=="" &&  $scope.query.gosh=="" &&  $scope.query.helka==""&& $scope.query.megrash==""){
            //notification to choose one
            ngNotify.set('הזן נתונים לחיפוש', 'error');
        }else{

             FormDetailsService.getFormByQuery($scope.query).then(function (result) {
                 $scope.forms_list=result;
             }, function (err) {
             }
             );
        }
    }

    $scope.clearSearch=function () {

        $scope.query={};
        $scope.query.name="";
        $scope.query.gosh="";
        $scope.query.helka="";
        $scope.query.megrash="";
        $scope.query.type="none";
    }


    $scope.OpenForm=function(type,_id){
        if(type=='water'){
            var url="#!/view_form?";
        }else{
            var url="#!/view_form2?";
        }
        window.open(url+"id="+_id);
    }
    $scope.deleteFormById=function(_id){


        if (confirm('האם אתה בטוח?')) {
            FormDetailsService.deleteFormById(_id).then(function (result) {
                 /*   swal("נמחק!", "'טופס אישור נמחק", "success");*/
                    ngNotify.set('הטופס נמחק בהצלחה', 'success');
                    $scope.RefreshList();
                }, function (err) {
                }
            );

            // Save it!
        } else {
            // Do nothing!
        }
/*
        swal({
                title: "האם אתה בטוח?",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "כן, תמחק את הטופס",
                cancelButtonText:'ביטול',
                confirmButtonColor: "#DD6B55",

                closeOnConfirm: false
            },
            function(){
                FormDetailsService.deleteFormById(_id).then(function (result) {
                        swal("נמחק!", "'טופס אישור נמחק", "success")
                        $scope.RefreshList();
                    }, function (err) {
                    }
                );

            });*/
// are you sure

    }

    $scope.RefreshList();
};