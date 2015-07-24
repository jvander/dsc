/**
 * Created by JOSEVALDERLEI on 22/07/2015.
 */

(function(){

angular
    .module('app')
    .controller('dscReportController',dscReportController);

function dscReportController() {

    var self = this;
    self.idproblem = 'ajflajfljalfjaljf';
    self.buidReport = buidReport;

    function buidReport(element) {
        var html = document.getElementById('projectResport');
        var pdf = new jsPDF('l','px');
        pdf.addHTML(
            html, 0, 0, {
                pagesplit: true
            },
            function(dispose){
                pdf.save('test.pdf');
            }
        )
    }
}

})();