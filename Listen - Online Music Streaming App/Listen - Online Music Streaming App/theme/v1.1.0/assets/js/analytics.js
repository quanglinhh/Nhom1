"use strict";

//=> Class Definition
var Analytics = Analytics || {};

$(function () {
    Analytics = {
        //=> Initialize function to call all functions of the class
        init: function () {
            Analytics.user();
            Analytics.song();
            Analytics.purchase();
            Analytics.statistics();
        },

        //=> User chart
        user: function () {
            if ($('#user').length === 0) {
                return false;
            }

            var userEl = document.getElementById('user').getContext('2d');
            var data = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Songs',
                    data: [65, 59, 42, 73, 56, 55, 40],
                    backgroundColor: '#f11717',
                    borderColor: '#f11717',
                    borderWidth: 3,
                    pointBorderWidth: 0,
                    pointRadius: 0
                }]
            };
            var options = {
                responsive: true,
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        display: false,
                        ticks: {
                            min: 0,
                            max: 85
                        }
                    }],
                    xAxes: [{
                        display: false
                    }]
                },
                layout: {
                    padding: 0,
                    margin: 0
                }
            };
            var myLineChart = new Chart(userEl, {
                type: 'line',
                data: data,
                options: options
            });
        },

        //=> Song chart
        song: function () {
            if ($('#songChart').length === 0) {
                return false;
            }

            var songEl = document.getElementById('songChart').getContext('2d');
            var data = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Songs',
                    data: [65, 59, 42, 73, 56, 55, 40],
                    backgroundColor: '#00c746',
                    borderColor: '#00c746',
                    borderWidth: 3,
                    pointBorderWidth: 0,
                    pointRadius: 0
                }]
            };
            var options = {
                responsive: true,
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        display: false,
                        ticks: {
                            min: 0,
                            max: 85
                        }
                    }],
                    xAxes: [{
                        display: false,
                        barPercentage: 0.5
                    }]
                },
                layout: {
                    padding: 0,
                    margin: 0
                }
            };
            var myLineChart = new Chart(songEl, {
                type: 'bar',
                data: data,
                options: options
            });
        },

        //=> Purchase chart
        purchase: function () {
            if ($('#purchase').length === 0) {
                return false;
            }

            var userEl = document.getElementById('purchase').getContext('2d');
            var data = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Songs',
                    data: [65, 59, 42, 73, 56, 55, 40],
                    backgroundColor: 'transparent',
                    borderColor: '#222629',
                    borderWidth: 3,
                    pointBorderWidth: 0,
                    pointRadius: 0
                }]
            };
            var options = {
                responsive: true,
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        display: false,
                        ticks: {
                            min: 0,
                            max: 85
                        }
                    }],
                    xAxes: [{
                        display: false,
                        barPercentage: 0.5
                    }]
                },
                layout: {
                    padding: 0,
                    margin: 0
                }
            };
            var myLineChart = new Chart(userEl, {
                type: 'line',
                data: data,
                options: options
            });
        },

        //=> Statistics chart
        statistics: function () {
            if ($('#userStatistics').length === 0) {
                return false;
            }

            var statisticsEl = document.getElementById('userStatistics').getContext('2d');
            var data = {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'User',
                    data: [65, 59, 42, 73, 56, 55, 40],
                    backgroundColor: '#ad20d4',
                    borderColor: 'transparent',
                    borderWidth: 3,
                    pointBorderWidth: 0,
                    pointRadius: 0
                }]
            };
            var options = {
                responsive: true,
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: 80
                        }
                    }],
                    xAxes: [{
                        barPercentage: 0.3
                    }]
                },
                layout: {
                    padding: 0,
                    margin: 0
                }
            };
            var myLineChart = new Chart(statisticsEl, {
                type: 'bar',
                data: data,
                options: options
            });
        }
    };

    //=> Call class at document ready
    $(document).ready(Analytics.init);
});