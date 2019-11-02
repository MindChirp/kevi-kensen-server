function changeUsername() {
    // 1. Lag en boks der vi kan skrive inn det nye brukernavnet
    // 2. Lag en knapp som sier "Lagre"
    // 3. En popup boks som alerter deg om å bekrefte valget



    var form = document.createElement("form");
    form.setAttribute("action", "byttBrukerNavn");
    form.setAttribute("method", "post");
    form.setAttribute("id", "form");

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", "username");
    input.setAttribute("id", "username-input");
    input.setAttribute("placeholder", "Ønsket brukernavn");
    
    //placeholder="teksten"

    var button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.innerHTML = "Bytt brukernavn";
    button.setAttribute("id", "submit-button");

    form.appendChild(input);
    form.appendChild(button);




    var container = document.getElementById("settings-container");
    container.innerHTML = "";
    container.appendChild(form);


}




function changePassword() {
    // 1. Lag en boks der vi kan skrive inn det nye brukernavnet
    // 2. Lag en knapp som sier "Lagre"
    // 3. En popup boks som alerter deg om å bekrefte valget



    var form = document.createElement("form");
    form.setAttribute("action", "byttPassord");
    form.setAttribute("method", "post");
    form.setAttribute("id", "form");

    var input = document.createElement("input");
    input.setAttribute("type", "password");
    input.setAttribute("name", "password");
    input.setAttribute("id", "username-input");
    input.setAttribute("placeholder", "Ønsket passord");
    input.setAttribute("autocomplete", "new-password");

    var input2 = document.createElement("input");
    input2.setAttribute("type", "password");    
    input2.setAttribute("name", "passwordRepeat");
    input2.setAttribute("id", "username-input2");
    input2.setAttribute("placeholder", "Gjenta passord");
    input2.setAttribute("autocomplete", "new-password");
    
    //placeholder="teksten"

    var button = document.createElement("button");
    button.setAttribute("type", "submit");
    button.innerHTML = "Bytt passord";
    button.setAttribute("id", "submit-button");

    form.appendChild(input);
    form.appendChild(input2);
    form.appendChild(button);




    var container = document.getElementById("settings-container");
    container.innerHTML = "";
    container.appendChild(form);


}

