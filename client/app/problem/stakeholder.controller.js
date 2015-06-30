/**
 * Created by JOSEVALDERLEI on 29/06/2015.
 */

(function() {

    'use strict';
    angular.module('app')
        .controller('sController', sController);

    function sController() {
        var vm = this;
        vm.stakeholderList = [
            {
                id: '',
                name: '',
                description: '',
                openEdit: true,
                position_x: 10,
                position_y: 20
            }

        ];
        vm.stakeholder =
        {
            id: '',
            name: '',
            description: '',
            openEdit: true,
            position_x: 10,
            position_y: 20
        };

        vm.insertStakeholder = function (newStakeholder) {
            vm.stakeholder = newStakeholder;
            vm.stakeholderList.push(newStakeholder);
        };

        vm.isOpenEditStakeholder = function (id) {
            if (id == 0) {
                vm.stakeholder.openEditStakeholder = true;
            } else {
                angular.forEach(function (stakeholder) {
                    if (stakeholder.id !== id) stakeholder.openEditStakeholder = false;
                });
            }
        };

        vm.removeStakeholder = function (id) {
            var oldList = vm.stakeholderList,
                newList = [];

            angular.forEach(oldList, function (stakeholder) {
                if (stakeholder.id !== id) newList.push(stakeholder);
            });
            vm.stakeholderList = newList;
        }
    }

})();