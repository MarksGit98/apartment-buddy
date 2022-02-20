console.log("Chrome Extension Start");

const updateListings = async () => {
  // console.log("running");
  // console.log(window.location.href);
  // if (window.location.href.includes("homedetails")) {
  //   console.log("check");
  //   let homeDetails = document.getElementsByClassName(
  //     "ds-home-details-chip"
  //   )[0];
  //   const address = homeDetails.getElementByID(
  //     "ds-chip-property-address"
  //   ).textContent;
  //   console.log("address", address);
  //   let data = await getListingData(address, "open violations");
  //   const infoBox = generateInfoBox(data);
  //   homeDetails.appendChild(infoBox);
  // }
  let cards = document.getElementsByClassName("list-card-info");
  for (let card of cards) {
    const footer = card.getElementsByClassName("list-card-footer")[0];
    let infoBoxArray = card.getElementsByClassName("infobox");
    if (infoBoxArray.length === 0) {
      if (card.getElementsByTagName("a")[0] !== undefined) {
        const address = card.getElementsByTagName("a")[0].textContent;
        let data = await getListingData(address, "open violations");
        infoBox = generateInfoBox(data);
        footer.style["height"] = "60px";
        footer.appendChild(infoBox);
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
setInterval(updateListings, 100); //uncomment this out after testing
