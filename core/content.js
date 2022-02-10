console.log("Chrome Extension Start");

const updateListings = async () => {
  let cards = document.getElementsByClassName("list-card-info");
  for (let card of cards) {
    const footer = card.getElementsByClassName("list-card-footer")[0].innerHTML;
    if (
      !(footer.includes("Violations") || footer.includes("Registration Data"))
    ) {
      if (card.getElementsByTagName("a")[0] !== undefined) {
        const address = card.getElementsByTagName("a")[0].textContent;

        let data = await getListingData(address, "open violations");
        console.log(address, data);
        let description = data
          ? `Total Number of Open Violations: ${data.total}`
          : "No Registration Data Available";
        card.getElementsByClassName("list-card-footer")[0].innerHTML =
          description;
        card.getElementsByClassName("list-card-footer")[0].style[
          "background-color"
        ] = "#FF00FF";
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
    data = await fetchAddressData({ number, street, borough, state });
    if (data.length > 0) {
      return getOpenViolations(data);
    } else return undefined;
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
