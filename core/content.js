console.log("Chrome Extension Start");

const updateListings = () => {
    let cards = document.getElementsByClassName("list-card-info");
    for (card of cards) {
        //console.log(card);
        if (card.getElementsByTagName("a")[0] !== undefined) {
            const address = card.getElementsByTagName("a")[0].textContent;
            //console.log(address)
            let testAddy = getListingData(address);
            card.getElementsByClassName("list-card-footer")[0].innerHTML = testAddy;
            card.getElementsByClassName("list-card-footer")[0].style['background-color'] = '#FF00FF';
        }
    }
};

const getListingData = (address) => {
    //remove building name
    if (address.includes("|")) {
        address = address.substring(address.indexOf('|') + 2);
    }
    //console.log(address)

    const addressBreakdown = address.split(",");
    console.log('addressBreakdown', addressBreakdown);
    let [number, ...street] = addressBreakdown[0].split(" ");
    console.log("number:", number)

    street = street.join(" ")
    street = cleanStreet(street)
    //street = street.replace(" ", "%20");

    console.log("street:", street)
    let borough = addressBreakdown[1].trim();
    console.log("borough:", borough)
    let stateAndZip = addressBreakdown[2].trim();
    console.log('stateZip:', stateAndZip);

    return `${number} ${street} ${borough}`;
    //console.log(street);
};

const getViolationsData = (listings) => { };

updateListings(); //comment this out later

//timer = setInterval(updateListings, 250); //uncomment this out