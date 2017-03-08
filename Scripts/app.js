/* javascript lives here */
"use strict"; 

console.log("App Started");

// IIFE
(function() {

    let mainNav = document.getElementById("mainNav");
    let navbarHTML;
    // step 1 = need a XHR elements
    let navXHR = new XMLHttpRequest();
    // step 2 - open a file
    navXHR.open("GET", "../navbar.html", true);
    //step 3 - send the XMLHttpRequest
    navXHR.send();
    //step 4 - list for readyState of 4 and server status of 200 onreadystatechange
    navXHR.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            // read the data
            navbarHTML = this.responseText;
        }
    }
    // step 5 - wait until the nav bar file finished loading
    navXHR.addEventListener("load", function() {
        mainNav.innerHTML = navbarHTML;
        switch (document.title) {
            case "Home":
                let homelink = document.getElementById("homelink");
                homelink.setAttribute("class", "active");
                break;
            case "Project":
                let projectslink = document.getElementById("projectslink");
                projectslink.setAttribute("class", "active");
                break;
            case "Contact":
                let contactslink = document.getElementById("contactslink");
                contactslink.setAttribute("class", "active");
                break;
            default:
                break;
        }
    });


    /* INTERPOLATION */
    // console.info(`Page title: ${document.title}`); 
    /* --------------------------------------------- */
    if(document.title == "Home") {

        let data = {};
        // step 1 - instatiate an XHR object
        let XHR = new XMLHttpRequest();
        // step 2 - open the json file
        XHR.open("GET", "../games.json", true);
        // step 3 - send out a call to the XHR object
        XHR.send(null);
        // step 4 - listen for ready state to be 4
        XHR.onreadystatechange = function() {
            if((this.readyState === 4) && (this.status === 200)) {
                data = JSON.parse(this.responseText);
            }
        };

        // step 5 - wait until the data is finished loading before injecting the data
        XHR.addEventListener("load", function () {
            let gameListBody = document.getElementById("gameListBody");
            //
            data.games.forEach(function(game) {
                // inject "template row" inside the dataRows div tag
                let newRow = document.createElement("tr");
                newRow.innerHTML = `
                    <tr>
                        <td>${game.name}</td>
                        <td class="text-center">${game.cost}</td>
                        <td class="text-center">${game.rating}</td>
                    </tr>
                `;
                gameListBody.appendChild(newRow);
            }, this);
        });
         
    } // end if Home
    else if (document.title == "Project") {
       
        // step 1 - setup references to the elements you need to hook into
        let hideButton = document.getElementById("hideButton");
        let halfSizeButton = document.getElementById("halfSizeButton");
        let treeQuarterSizeButton = document.getElementById("treeQuarterSizeButton");
        let showButton = document.getElementById("showButton");
        let firstProjectImg = document.getElementById("firstProjectImg");

         // OPTION 1 //
        // step 2 - setup event listeners (register event listeners) for each elements
        // hideButton.addEventListener("click", function() {
        //     firstProjectImg.style.display = 'none'; 
        //     console.log(`width: `);
        // });

        // halfSizeButton.addEventListener("click", function() {
        //     firstProjectImg.style.maxWidth = '50%'; 
        // });

        // treeQuarterSizeButton.addEventListener("click", function() {
        //     firstProjectImg.style.maxWidth = '75%'; 
        //     console.log(firstProjectImg.style.width);
        // });

        // showButton.addEventListener("click", function() {
        //     firstProjectImg.style.display = 'block'; 
        // });

        // OPTION 2 //
        // step 2 - create one event listener
        let buttonArray = [hideButton, halfSizeButton, treeQuarterSizeButton, showButton];
        buttonArray.forEach(function(button) {
            button.addEventListener("click", function(event) {
                // store which button has been clicked in currentButton;
                // let currentButton = button.getAttribute("id"); <-- one way to get the reference to the button
                let currentButton = button;
                switch (currentButton.getAttribute("id")) {
                    case "hideButton":
                        firstProjectImg.style.display = "none";
                    break;
                    case "halfSizeButton":
                        firstProjectImg.style.display = "block";
                        firstProjectImg.style.maxWidth = "50%";
                    break;
                    case "treeQuarterSizeButton":
                        firstProjectImg.style.display = "block";
                        firstProjectImg.style.maxWidth = "75%";
                    break;
                    case "showButton":
                        firstProjectImg.style.display = "block";
                        firstProjectImg.style.maxWidth = "100%";
                    break;
                }
            });
        }, this);

    }
    else if (document.title == "Contact") {

    }

})();


