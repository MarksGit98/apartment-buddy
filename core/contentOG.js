//for testing purposes will remove
console.log("Zillow extension working");
counter = 1

//functions
const getAddress = (elem) => {
    let addressDiv = elem.getElementsByClassName();
}

const parseAddressToObj = (address) => {

}


const addViolationElem = () => {
    const priceDiv = document.getElementsByClassName('list-card-info');

    for (x of priceDiv) {
        const elem = x.getElementsByClassName('list-card-footer')[0]
        const existChild = elem.querySelector(`div`) !== null;
        if (!existChild) {
            elem.innerHTML = '';
            let my_div = document.createElement("div");
            my_div.setAttribute("id", "dropdown");
            my_div.style.cssText = 'position: absolute; display: block; z-index:10;';
            my_div.innerHTML = `<a>Zarbail Agasi ${counter} ▶<a/>`;
            let my_drop = document.createElement("div");
            my_drop.innerHTML = "Taco Bell 4th meal with Doritos Locos tacos and a knife rip on the side. French inhale topical CBD lotion and binge watch Cheech and Chong. Rolling down the street smoking endo, laid back. California kush roll it up into a fat blunt for medicinal purposes to elevate your consciousness. Littering and butter stuff more cerebral high couch lock Abba Zabba you my only friend."
            my_drop.style.cssText = 'display: none; position: absolute; background-color: white; min-width: 325px; box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.2); padding: 4px 12px;';
            my_div.append(my_drop);
            my_div.addEventListener("click", () => {
                if (my_drop.style.display === 'none') {
                    my_drop.style.display = 'block';
                    console.log('testing:', elem, elem.style['min-height'])
                    elem.style['min-height'] = '270px';
                }
                else {
                    my_drop.style.display = 'none';
                    elem.style['min-height'] = '30px';
                }
            })
            elem.append(my_div);
            counter++;
            console.log(elem)
        }
    }

}

//timer to check and go through dynamically added elements
window.onload = function () {
    //setInterval(addViolationElem, 1000)
}


addViolationElem()
