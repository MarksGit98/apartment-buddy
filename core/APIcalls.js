const fetchAddressData = async ({ number, street, borough, state }) => {
  let response = await fetch(
    `https://data.cityofnewyork.us/resource/wvxf-dwi5.json?&housenumber=${number}&streetname=${street}&boro=${borough}`
  );
  let json = await response.json();
  return json;
};

const getOpenViolations = (data) => {
  const openViolationsOnly = data.filter(
    (listing) => listing.violationstatus === "Open"
  );
  const numberOfViolations = openViolationsOnly.length;
  return { total: numberOfViolations, listings: openViolationsOnly };
};
