console.log("Chrome Extension Start");

//////////////////////////////////////////////////////////////////////////////////////////////////
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
      let data = await getListingData(address, "open");
      const infoBox = generateInfoBox(data, "homedetails", null);
      homeDetails.appendChild(infoBox);
    }
  }
  let cards = document.getElementsByClassName("list-card-info");
  for (let card of cards) {
    const footer = card.getElementsByClassName("list-card-footer")[0];
    let infoBoxArray = card.getElementsByClassName("hpd-infobox");
    if (infoBoxArray.length === 0) {
      if (card.getElementsByTagName("a")[0] !== undefined) {
        const address = card.getElementsByTagName("a")[0].textContent;
        let data = await getListingData(address, "open");
        footer.classList.add("hpd-infobox-container");
        infoBox = generateInfoBox(data, "listing", footer);
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
  console.log(number, street);
  const altStreet = await getFormattedStreet(number + " " + street);
  let borough = cleanBorough(addressBreakdown[1]);
  let stateAndZip = addressBreakdown[2].trim().toUpperCase().split(" ");
  let state = stateAndZip[0].toUpperCase();
  //if (state !== 'NY') return 'You must be in NYC'
  if (type === "open") {
    let [violationsData, unitsDataArray, complaintsData] = await Promise.all([
      fetchViolationData({
        number,
        street,
        borough,
        state,
      }),
      fetchUnitData({ number, street, borough, state }),
      fetchComplaintData({
        number,
        street,
        borough,
        state,
      }),
    ]);
    //get violation data from API (try using alt street API for street name if original doesn't work)
    if (violationsData.length === 0) {
      violationsData = await fetchViolationData({
        number,
        altStreet,
        borough,
        state,
      });
    }
    //get unit data from API (try using alt street API for street name if original doesn't work)
    if (unitsDataArray.length === 0) {
      unitsDataArray = await fetchUnitData({
        number,
        altStreet,
        borough,
        state,
      });
    }
    //get complaint data from API (try using alt street API for street name if original doesn't work)
    if (complaintsData.length === 0) {
      complaintsData = await fetchComplaintData({
        number,
        altStreet,
        borough,
        state,
      });
    }

    let filteredViolationData;
    let filteredComplaintData;
    let unitsData;

    if (violationsData.length > 0) {
      filteredViolationData = filterOpenViolations(violationsData, unitsData);
      console.log(filteredViolationData);
    }
    if (complaintsData.length > 0) {
      filteredComplaintData = filterOpenComplaints(complaintsData, unitsData);
      console.log(filteredComplaintData);
    }

    if (unitsDataArray.length > 0) {
      unitsData = unitsDataArray[0];
    }

    return {
      violations: filteredViolationData,
      complaints: filteredComplaintData,
      units: unitsData,
    };
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
