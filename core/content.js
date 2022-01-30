console.log("Chrome Extension Start");

const updateListings = () => {
    let cards = document.getElementsByClassName("list-card-info");
    for (card of cards) {
        //console.log(card);
        if (card.getElementsByTagName("a")[0] !== undefined) {
            const address = card.getElementsByTagName("a")[0].textContent;
            //console.log(address)
            getListingData(address);
            card.getElementsByClassName("list-card-footer")[0].innerHTML = "Zarbail";
        }
    }
};

//format all streets to be the same
const cleanStreet = (street) => {
    street = street.toUpperCase();
    cleanUpTerms = ["APT", "#", "FLOOR", "PENTHOUSE", "TOWNHOUSE"];
    for (term of cleanUpTerms) {
        if (street.includes(term)) {
            street = street.substring(0, street.indexOf(term))
        }
    }
    return street
}

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

    street = street.join(" ").replace(" ", "%20");
    street = cleanStreet(street)

    console.log("street:", street)
    let borough = addressBreakdown[1].trim();
    console.log("borough:", borough)
    let stateAndZip = addressBreakdown[2].trim();
    console.log('stateZip:', stateAndZip);


    //console.log(street);
};

const getViolationsData = (listings) => { };

updateListings();

//timer = setInterval(updateListings, 250);