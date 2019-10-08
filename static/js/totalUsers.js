'use strict';

// Immediately invoked function expression
(() => {

    // Init data
    let data = [];

    // Load data
    d3.csv('/static/data/predefined_users.csv', d => {

        // Parse data
        d.age = +d.age;
        d.experience_yr = +d.experience_yr;
        d.hw1_hrs = +d.hw1_hrs;

        return d;
    }).then(d => {

        // Redefine data
        data = d;

        // Launch D3
        launchD3();

    }).catch(err => console.error(err));

    /*
     launchD3 returns void
     */
    function launchD3() {

        // Append Total Users
        appendTotalUsers();
    }

    /*
     appendTotalUsers returns void
     */
    function appendTotalUsers() {

        // Init totalUsers
        const totalUsers = data.length;

        // Append totalUsers to h3#total_users_text
        const totalUsersText = d3.select('#total_users_text')
            .append('span')
            .text(`${totalUsers}`)
            .style('color', 'red');

    }



})();