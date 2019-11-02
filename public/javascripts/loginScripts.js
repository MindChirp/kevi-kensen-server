function loginMobile() {
    var cont = document.createElement("div");
    cont.setAttribute("id", "mobile-login-popup");
    document.body.appendChild(cont);
    

    //Close the side menu
    var sideMenu = document.getElementById("mobile-side-menu");
    var btn = document.getElementById("mobile-menu-button");
    var tint = document.getElementById("mobile-menu-tint")
    var line = document.getElementsByClassName("menu-line")
    btn.setAttribute("name", "closed");
    line[0].style.transform = "translateY(0px) rotate(0deg)";
                    line[1].style.opacity = "1";
                    line[2].style.transform = "translateY(0px) rotate(0deg)";
                    btn.setAttribute("name", "closed");
                sideMenu.style.transform = "translateX(-101%)";



        var close = document.createElement("button");
        close.setAttribute("id", "close-mobile-login-menu-button");
        close.addEventListener("click", function() {
            //Close the mobile login menu
            var time = 300;
            cont.style.animation = "mobile-slide-out " + time + "ms ease-in-out";
            setTimeout(function() {
                cont.parentNode.removeChild(cont);
                var tint = document.getElementById("mobile-menu-tint")
                tint.parentNode.removeChild(tint);
            }, time)
        })

        var i = document.createElement("i");
        i.setAttribute("class", "material-icons");
        i.innerHTML = "close";
        close.appendChild(i);

        cont.appendChild(close);






       /*

                CREATE LOGIN WINDOW

            */

        var loginCont = document.getElementById("mobile-login-popup");

        var content = document.createElement("div");
        content.setAttribute("id", "content");
        loginCont.appendChild(content);


        


        var info = document.createElement("p");
        info.setAttribute("style", `
            display: inline-block;
            width: 30%;
            color: rgb(100,100,100);
            margin-left: 9%;
            vertical-align: top;
        `)



        loginCont.appendChild(info);

        var title = document.createElement("h2");
        title.innerHTML = "Logg inn";

        content.appendChild(title);

        var form = document.createElement("form");
        form.setAttribute("action", "auth");
        form.setAttribute("method", "post");

        content.appendChild(form);



        var usrName = document.createElement("input");
        usrName.setAttribute("type", "text");
        usrName.setAttribute("name", "username");
        usrName.setAttribute("placeholder", "Brukernavn eller epost-adresse");
        usrName.setAttribute("required", "");
        usrName.setAttribute("style", `
            display: block;
            margin-bottom: 3vh;
            border-style: solid;
            border-width: 0 0 0.1vh;
            border-color: rgb(200,200,200);
            height: 30px;
            width: 100%;
            font-size: 25px;
        `);
        form.appendChild(usrName);



        var pass = document.createElement("input");
        pass.setAttribute("type", "password");
        pass.setAttribute("autocomplete", "current-password");
        pass.setAttribute("name", "password");
        pass.setAttribute("placeholder", "Passord");
        pass.setAttribute("required", "");
        pass.setAttribute("style", `
            display: block;
            border-style: solid;
            border-width: 0 0 0.1vh;
            border-color: rgb(200,200,200);
            height: 30px;
            font-size: 25px;
            width: 100%;
            margin-bottom: 2vh;
        `);
        pass.setAttribute("required", "");
        form.appendChild(pass);

        var submit = document.createElement("input");
        submit.setAttribute("type", "submit");
        submit.setAttribute("id", "login-submit");
        submit.setAttribute("style", `
            color: white;
            height: 40px;
            font-size: 15px;
            font-weight: 600;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            width: 50%;
            border-style: none;
        `)

        form.appendChild(submit);

        



        document.body.appendChild(loginCont);


}


function registerMobile() {


    var registerCont = document.createElement("div");
    registerCont.setAttribute("id", "mobile-register-popup");

    document.body.appendChild(registerCont);


 //Close the side menu
 var sideMenu = document.getElementById("mobile-side-menu");
 var btn = document.getElementById("mobile-menu-button");
 var tint = document.getElementById("mobile-menu-tint")
 var line = document.getElementsByClassName("menu-line")
 btn.setAttribute("name", "closed");
 line[0].style.transform = "translateY(0px) rotate(0deg)";
                 line[1].style.opacity = "1";
                 line[2].style.transform = "translateY(0px) rotate(0deg)";
                 btn.setAttribute("name", "closed");
             sideMenu.style.transform = "translateX(-101%)";



     var close = document.createElement("button");
     close.setAttribute("id", "close-mobile-register-menu-button");
     close.addEventListener("click", function() {
         //Close the mobile login menu
         var time = 300;
         registerCont.style.animation = "mobile-slide-out " + time + "ms ease-in-out";
         setTimeout(function() {
             registerCont.parentNode.removeChild(registerCont);
             var tint = document.getElementById("mobile-menu-tint")
             tint.parentNode.removeChild(tint);
         }, time)
     })

     var i = document.createElement("i");
     i.setAttribute("class", "material-icons");
     i.innerHTML = "close";
     close.appendChild(i);

     registerCont.appendChild(close);


    var content = document.createElement("div");
    content.setAttribute("id", "content");
    
    var title = document.createElement("h2");
    title.innerHTML = "Registrer ny bruker";

    registerCont.appendChild(content);
    content.appendChild(title);



var form = document.createElement("form");
form.setAttribute("action", "register");
form.setAttribute("method", "post");

content.appendChild(form);



var usrName = document.createElement("input");
usrName.setAttribute("type", "text");
usrName.setAttribute("name", "username");
usrName.setAttribute("placeholder", "Ønsket brukernavn");
usrName.setAttribute("required", "");
usrName.setAttribute("style", `
    display: block;
    margin-bottom: 3vh;
    border-style: solid;
    border-width: 0 0 0.1vh;
    border-color: rgb(200,200,200);
    height: 30px;
    width: 100%;
    font-size: 25px;
`);
form.appendChild(usrName);

var mail = document.createElement("input");
mail.setAttribute("type", "email");
mail.setAttribute("name", "email");
mail.setAttribute("placeholder", "Epost-adresse");
mail.setAttribute("required", "");
mail.setAttribute("style", `
    display: block;
    margin-bottom: 3vh;
    border-style: solid;
    border-width: 0 0 0.1vh;
    border-color: rgb(200,200,200);
    height: 30px;
    width: 100%;
    font-size: 25px;
`);
form.appendChild(mail);


var pass = document.createElement("input");
pass.setAttribute("type", "password");
pass.setAttribute("autocomplete", "new-password");
pass.setAttribute("name", "password");
pass.setAttribute("placeholder", "Passord");
pass.setAttribute("required", "");
pass.setAttribute("style", `
    display: block;
    border-style: solid;
    border-width: 0 0 0.1vh;
    border-color: rgb(200,200,200);
    height: 30px;
    font-size: 25px;
    width: 100%;
    margin-bottom: 2vh;
`);
pass.setAttribute("required", "");
form.appendChild(pass);



var submit = document.createElement("input");
submit.setAttribute("type", "submit");
submit.setAttribute("id", "login-submit");
submit.setAttribute("style", `
    color: white;
    height: 5vh;
    font-size: 1.7vh;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    width: 50%;
    border-style: none;
`)

form.appendChild(submit);

}
