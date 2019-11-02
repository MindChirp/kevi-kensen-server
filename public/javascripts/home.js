function activateMenuElement(e) {
    e.setAttribute("style", `
        border-style: solid;
        border-width: 0 0 1px;
        height: 18px;
        border-color: black;
    `);
}

setTimeout(function() {
    if(detectmob()) {
        var warning = document.createElement("h1");
        warning.setAttribute("style", `

            width: 100%;
            text-align: center;
            padding: 0 1vh 0 1vh;
        `)

        var cont = document.getElementById("generic-content");
        warning.innerHTML = "Du ser nå en mobilversjon av nettsiden som ikke er ferdig <br> Send gjerne inn tilbakemeldinger nedenfor :)"
        cont.appendChild(warning);

        var form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", "feedback");
        cont.appendChild(form);

        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("name", "feedback");
        input.setAttribute("style", `
            width: 50%;
            height: 60px;
            margin-left: 50%;
            z-index: 3;
            transform: translateX(-50%);
            font-size: 4vh;
        `)


        form.appendChild(input);

        var submit = document.createElement("input");
        submit.setAttribute("type", "submit");
        form.appendChild(submit);
        submit.setAttribute("class", "button stdStyle");
        submit.setAttribute("style", `
            margin-left: 50%;
            transform: translateX(-50%);
            margin-top: 3vh;
        `)

    }
}, 100)

function deactivateMenuElement(e) {
    e.setAttribute("style", `
        height: 19px;
    border-style: none;
    `);
}


function detectmob() { 
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
       return true;
     }
    else {
       return false;
     }
   }
var minWidth = 800;
//The main refresh interval. Lower value requires
//processing resources
var refreshInterval = 200;
var looper = setInterval(function() {
    if(document.getElementById("mobile-menu-button") && parseInt(document.body.scrollTop) > 0 && document.getElementById("mobile-side-menu").style.transform == "translateX(-101%)") {
        console.log(document.body.scrollTop);
        document.getElementById("mobile-menu-button").setAttribute("style", `
            background-color: white;
            border-style: solid;
            border-width: 0.5vh;
        `);
    } else if(document.getElementById("mobile-menu-button") && parseInt(document.body.scrollTop) == 0) {
        document.getElementById("mobile-menu-button").setAttribute("style", `
        background-color: transparent;
        border-style: solid;
        border-width: 0;
    `);
    }

    var header = document.getElementById("header");
    var style = getComputedStyle(header);
    var width = parseInt(style.width.split("px")[0]);
    if(width < minWidth || detectmob()) {

        //If the width is less than 
        //the min width, do something
                hideRemovables(true)
    } else {
        hideRemovables(false);
    }
}, refreshInterval);



function hideRemovables(bool) {
    //What to do if the website is scaled up
    var els = document.getElementsByClassName("removable");
    if(bool == true && els[0].getAttribute("style") != `height: 0; overflow: hidden;`) {
        for(let i = 0; i < els.length; i++) {
            els[i].setAttribute("style", `height: 0; overflow: hidden;`);
        }

        //Enable mobile view

        mobileView(true);

    } else if(bool == false && els[0].getAttribute("style") != `height: fit-content; overflow: visible;`) {
        for(let i = 0; i < els.length; i++) {
            els[i].setAttribute("style", `height: fit-content; overflow: visible;`);
        }
        mobileView(false);

    }
}

function loginMenu() {
    if(!document.getElementById("sign-in-popup")) {
        var cont = document.createElement("div");
        cont.setAttribute("id", "sign-in-popup");
        document.body.appendChild(cont);
        cont.addEventListener("mouseleave", function() {
            cont.parentNode.removeChild(cont);
        })

        if(document.body.getAttribute("name") == "false") {        
                //Append the correct html template if the user is not logged in
            var el = document.getElementById("partial-1").cloneNode("true");
            el.setAttribute("style", `
                height: 100%;
                width: 100%;
            `);
            cont.appendChild(el);




        } else {
                //Append the desired html template if the user is logged in
var el = document.getElementById("partial-2").cloneNode("true");
            el.setAttribute("style", `
                height: 100%;
                width: 100%;
            `);
            cont.appendChild(el);
        }
    }
}


//A function for easily creating divider lines

function dividerLine(parent) {
    var d = document.createElement("div");
    d.setAttribute("style", `
        width: 100%;
        height: 0.1vh;
        background-color: rgb(200,200,200);
    `);

    parent.appendChild(d);
    return d;
}


function modalWindow(header, text) {
    var cont = document.createElement("div");
    cont.setAttribute("id", "modal-foreground-window");

    var title = document.createElement("h2");
    title.setAttribute("id", "title");
    title.style.textTransform = "";
    var p = document.createElement("id", "text");

    title.innerHTML = header;
    title.style.margin = "0 0 0.7vh 0";
    p.innerHTML = text;
    cont.appendChild(title);
    var line = dividerLine(cont);
    line.style.marginBottom = "1vh";
    cont.appendChild(p);

    var bkg = document.createElement("div");
    bkg.setAttribute("id", "modal-background");

    bkg.addEventListener("click", function() {
        bkg.parentNode.removeChild(bkg);
        cont.parentNode.removeChild(cont);
    })
    document.body.appendChild(bkg);
    document.body.appendChild(cont);
    
}


function reload() {
    location.reload();
}


function mobileView(bool) {
    if(bool) {
        //Create the side-menu and burger-menu button
        var btn = document.createElement("div");
        btn.setAttribute("name", "closed");
        btn.setAttribute("id", "mobile-menu-button");
        document.getElementById("header").appendChild(btn);

        for(let i = 0; i < 3; i++) {
            var l = document.createElement("div");
            l.setAttribute("id", "line-" + i);
            l.setAttribute("class", "menu-line");
            btn.appendChild(l);
        }
            var line = document.getElementsByClassName("menu-line");

            var sideMenu = document.createElement("div");
            sideMenu.setAttribute("id", "mobile-side-menu");
            document.body.appendChild(sideMenu);
            
            var blackBar = document.createElement("div");
            blackBar.setAttribute("style", `
                height: 10%;
                width: 100%;
                position: absolute;
                background-color: black;
                top: 0;
                left: -1px;
                border-style: solid;
                border-color: black;
                border-width: 0 1px 0 1px;
            `)

            sideMenu.appendChild(blackBar);
            //Apply the side menu content

var cont = document.createElement("div");
cont.setAttribute("id", "mobile-menu-content");

var btns = ["Dame", "Herre", "Barn", "Salg"];

for(let n = 0; n < btns.length; n++) {
    var menuContentBtn = document.createElement("button");
    menuContentBtn.setAttribute("class", "mobile-menu-content-button");
    menuContentBtn.innerHTML = btns[n];
    sideMenu.appendChild(menuContentBtn);
}
if(document.body.getAttribute("name") == "false") {
    
    var loggInn = document.createElement("button");
    loggInn.setAttribute("id", "login-mobile");
    loggInn.setAttribute("class", "mobile-menu-content-button");
    loggInn.innerHTML = "Logg inn";
    sideMenu.appendChild(loggInn);

    loggInn.setAttribute("onclick", "loginMobile()");

    var register = document.createElement("button");
    register.setAttribute("id", "register-mobile");
    register.setAttribute("class", "mobile-menu-content-button");
    register.innerHTML = "Registrer ny bruker";
    sideMenu.appendChild(register);

    register.setAttribute("onclick", "registerMobile()");

} else {
    var myPage = document.createElement("button");
    myPage.setAttribute("id", "mypage-mobile");
    myPage.setAttribute("class", "mobile-menu-content-button");
    myPage.innerHTML = "Min konto";
    sideMenu.appendChild(myPage);

    myPage.setAttribute("onclick", "window.location.href = '/minside'");


    var logOut = document.createElement("button");
    logOut.setAttribute("id", "mypage-mobile");
    logOut.setAttribute("class", "mobile-menu-content-button");
    logOut.innerHTML = "Logg ut";
    sideMenu.appendChild(logOut);

    logOut.setAttribute("onclick", "logout()");



}

            btn.addEventListener("click", function() {
                if(btn.getAttribute("name") == "closed") {
                    var menuBtn = document.getElementById("mobile-menu-button");
                    menuBtn.setAttribute("style", `
                        background-color: transparent;
                        border-width: 0;
                        border-style: solid;
                    `);
                    line[0].style.transform = "translateY(11.5px) rotate(45deg)";
                    line[1].style.opacity = "0";
                    line[2].style.transform = "translateY(-11.5px) rotate(-45deg)";
                    btn.setAttribute("name", "opened");


                    //Slide out the sidebar menu

                sideMenu.style.transform = "translateX(0)";

                var tint = document.createElement("div");
                tint.setAttribute("id", "mobile-menu-tint");
                tint.addEventListener("click", function() {
                    line[0].style.transform = "translateY(0px) rotate(0deg)";
                    line[1].style.opacity = "1";
                    line[2].style.transform = "translateY(0px) rotate(0deg)";
                    btn.setAttribute("name", "closed");
                sideMenu.style.transform = "translateX(-101%)";
                    var tint = document.getElementById("mobile-menu-tint");
                tint.parentNode.removeChild(tint);
                })
                document.body.appendChild(tint);

                } else {
                    var menuBtn = document.getElementById("mobile-menu-button");
                    menuBtn.setAttribute("style", `
                        background-color: transparent;
                        border-width: 0;
                        border-style: solid;
                    `);
                     line[0].style.transform = "translateY(0px) rotate(0deg)";
                    line[1].style.opacity = "1";
                    line[2].style.transform = "translateY(0px) rotate(0deg)";
                    btn.setAttribute("name", "closed");
                sideMenu.style.transform = "translateX(-101%)";

                var tint = document.getElementById("mobile-menu-tint");
                tint.parentNode.removeChild(tint);
                }



            })

    } else {
        var menuBtn = document.getElementById("mobile-menu-button");
            if(menuBtn) {
        menuBtn.parentNode.removeChild(menuBtn);
            }
    }
}


function activateTools(bool) {
    if(bool) {
        var cont = document.createElement("div");
        cont.setAttribute("id", "admin-tools-menu-button-container");
        document.body.appendChild(cont);

        var buttons = document.createElement("div");
        buttons.setAttribute("id", "admin-buttons-container");
        cont.appendChild(buttons);


        var btnCont = document.createElement("button");
    btnCont.setAttribute("id", "admin-tools-menu-button");
    cont.appendChild(btnCont);

    var ico = document.createElement("i");
    ico.setAttribute("class", "material-icons");
    ico.innerHTML = "edit";
    btnCont.appendChild(ico);

    cont.addEventListener("mouseenter", openAdminTools);
    cont.addEventListener("mouseleave", openAdminTools);









    } else {
        if(document.getElementById("admin-tools-menu-button")) {
var btn = document.getElementById("admin-tools-menu-button");
        btn.parentNode.removeChild(btn);
        }
    }

    
}

function openAdminTools() {
    if(!document.getElementById("admin-buttons-container").childNodes.length > 0) {

        var buttons = document.getElementById("admin-buttons-container")

    //Create new article button
    var create = document.createElement("button");
    create.setAttribute("class", "admin-menu-button");
    create.setAttribute("onclick", "window.location.href = '/skaper'");

    var ico = document.createElement("i");
    ico.setAttribute("class", "material-icons");
    ico.innerHTML = "add";

    create.appendChild(ico);
    buttons.appendChild(create); 
    
    //Edit existing article button
    var edit = document.createElement("button");
    edit.setAttribute("class", "admin-menu-button");
    edit.setAttribute("onclick", "window.location.href = '#'");
    var ico = document.createElement("i");
    ico.setAttribute("class", "material-icons");
    ico.innerHTML = "edit";

    edit.appendChild(ico);
    buttons.appendChild(edit); 

} else {
    var el = document.getElementById("admin-buttons-container");
    el.innerHTML = ""; 
}
   


}


function redirect() {
    //window.location.href = "";
    window.open('http://www.pornhub.com', '_blank');
}