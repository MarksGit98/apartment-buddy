const fetchAddressData = async ({ number, street, borough, state }) => {
  console.log(borough);
  let url = `https://data.cityofnewyork.us/resource/wvxf-dwi5.json?&housenumber=${number}&streetname=${street}&boro=${borough}`;
  let response = await fetch(url);
  let json = await response.json();

  if (json.length === 0) {
    console.log(json);
    //Try again without borough in parameters if API returns empty
    url = `https://data.cityofnewyork.us/resource/wvxf-dwi5.json?&housenumber=${number}&streetname=${street}`;
  }
  response = await fetch(url);
  json = await response.json();
  return json;
};

const getOpenViolations = (data) => {
  const openViolationsOnly = data.filter(
    (listing) => listing.violationstatus === "Open"
  );
  const numberOfViolations = openViolationsOnly.length;
  return { total: numberOfViolations, listings: openViolationsOnly };
};
