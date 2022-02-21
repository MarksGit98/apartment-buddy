console.log("Chrome Extension Start");

const updateListings = async () => {
  if (window.location.href.includes("homedetails")) {
    let infoBoxArray = document.getElementsByClassName(
      "hpd-infobox-homedetails"
    );
    if (infoBoxArray.length === 0) {
      let homeDetails = document.getElementsByClassName(
        "ds-home-details-chip"
      )[0];
      const address = document.getElementById(
        "ds-chip-property-address"
      ).textContent;
      let data = await getListingData(address, "open violations");
      const infoBox = generateInfoBox(data, "homedetails");
      homeDetails.appendChild(infoBox);
    }
  }
  let cards = document.getElementsByClassName("list-card-info");
  for (let card of cards) {
    const footer = card.getElementsByClassName("list-card-footer")[0];
    const existChild = footer.querySelector(`div`) !== null;
    //let infoBoxArray = card.getElementsByClassName("hpd-infobox");
    if (!existChild) {
      if (card.getElementsByTagName("a")[0] !== undefined) {
        footer.innerHTML = '';
        let my_div = document.createElement("div");
        my_div.setAttribute("id", "dropdown");
        my_div.style.cssText = 'position: absolute; display: block; z-index:10;';
        const address = card.getElementsByTagName("a")[0].textContent;
        let data = await getListingData(address, "open violations");
        //infoBox = generateInfoBox(data, "listing");
        //footer.style["height"] = "60px";
        //footer.appendChild(infoBox);
        let description = data
          ? `Total Number of Open Violations: ${data.total}`
          : "No Registration Data Available";
        my_div.innerHTML = `<a>${description} ▶<a/>`;
        let my_drop = document.createElement("div");
        my_drop.innerHTML = "Taco Bell 4th meal with Doritos Locos tacos and a knife rip on the side. French inhale topical CBD lotion and binge watch Cheech and Chong. Rolling down the street smoking endo, laid back. California kush roll it up into a fat blunt for medicinal purposes to elevate your consciousness. Littering and butter stuff more cerebral high couch lock Abba Zabba you my only friend."
        my_drop.style.cssText = 'display: none; position: absolute; background-color: white; min-width: 325px; box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.2); padding: 4px 12px;';
        my_div.append(my_drop);
        my_div.addEventListener("click", () => {
          if (my_drop.style.display === 'none') {
            my_drop.style.display = 'block';
            console.log('testing:', footer, footer.style['min-height'])
            footer.style['min-height'] = '270px';
          }
          else {
            my_drop.style.display = 'none';
            footer.style['min-height'] = '30px';
          }
        })
        footer.append(my_div);
      }
    }
  }
};

const getListingData = async (address, type) => {
  //remove building name
  if (address.includes("|")) {
    address = address.substring(address.indexOf("|") + 2);
  }

  const addressBreakdown = address.split(",");
  let [number, ...street] = addressBreakdown[0].split(" ");

  street = street.join(" ");
  street = cleanStreet(street);
  let borough = cleanBorough(addressBreakdown[1]);
  let stateAndZip = addressBreakdown[2].trim().toUpperCase().split(" ");
  let state = stateAndZip[0].toUpperCase();
  //if (state !== 'NY') return 'You must be in NYC'
  if (type === "open violations") {
    data = await fetchViolationData({ number, street, borough, state });
    const units = await fetchUnitData({ number, street, borough, state });
    if (data.length > 0) {
      return getOpenViolations(data, units);
    } else {
      const altStreet = await getFormattedStreet(number + " " + street);
      data = await fetchViolationData({ number, altStreet, borough, state });
      if (data.length > 0) {
        return getOpenViolations(data, units);
      } else return undefined;
    }
  }
};

const photoCards = document.getElementsByClassName("photo-cards")[0];
const observer = new MutationObserver((mutations) => {
  mutations.forEach((record) => {
    if (record.type === "") {
    }
  });
});
observer.observe(photoCards, {
  attributes: true,
  chidList: true,
  subtree: true,
});

updateListings(); //comment this out later
setInterval(updateListings, 2000); //uncomment this out after testing
