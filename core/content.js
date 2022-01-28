console.log("Chrome Extension Start");

const updateListings = () => {
  let cards = document.getElementsByClassName("list-card-info");
  for (card of cards) {
    console.log(card);
    const address = card.getElementsByTagName("a")[0].textContent;
    getListingData(address);
    card.getElementsByClassName("list-card-footer")[0].innerHTML = "Zarbail";
  }
};
const getListingData = (address) => {
  const addressBreakdown = address.split(",");
  let [number, ...street] = addressBreakdown[0].split(" ");
  let borough = addressBreakdown[1].trim();
  let stateAndZip = addressBreakdown[2].trim();

  street = street.join(" ").replace(" ", "%20");
  console.log(street);
  const url = `https://whoownswhat.justfix.nyc/en/address/${borough}/${number}/${street}/summary`;
  console.log(url);
};

const getViolationsData = (listings) => {};

updateListings();
