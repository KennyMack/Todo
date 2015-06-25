/**
 * Created by Jonathan on 23/06/2015.
 */
var appTodo = angular.module('appTodo', []);


appTodo.controller('controller_todo',[
    '$scope',
    '$filter',
    function($scope,$filter){
        // gets index of list update
        var index = -1;

        // list of todos
        $scope.data = [];

        // model
        $scope.model_todo = {
            description: '',
            done: false
        };

        // save in list
        $scope.update = function () {
            // new register
            if (index == -1)
                $scope.data.push({'description': $scope.model_todo.description, 'done': $scope.model_todo.done});
            else {
                // update register
                $scope.data[index].description = $scope.model_todo.description;
                $scope.data[index].done = $scope.model_todo.done;
                index = -1;
            }
            // clear model
            $scope.model_todo.description = '';
            $scope.model_todo.done = false;

        };

        // submit form
        $scope.submitForm = function () {
            // validate field
            if(!($scope.model_todo.description == '')){
                    $scope.update();
            }

        };

        // count total todos saved
        $scope.getTotalTodos = function () {
            return $filter('filter')($scope.data, {'done': false}).length;
        };

        // delete register
        $scope.delete_item = function(i) {
            $scope.data.splice(i, 1);
        };

        // edit register
        $scope.edit_item = function(i) {
            $scope.model_todo = angular.copy($scope.data[i]);
            // keep index of register
            index = i;
        };

        // clear todos
        $scope.delete_todos = function(i) {
            // only done todos
            if (i){
                $scope.data = $filter('filter')($scope.data, {'done': false});
            }
            // clear all todos
            else{
                $scope.data = [];
            }
        };
    }
]);
