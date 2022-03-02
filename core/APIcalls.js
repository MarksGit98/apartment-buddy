const fetchViolationData = async ({ number, street, borough, state }) => {
  let url = `https://data.cityofnewyork.us/resource/wvxf-dwi5.json?&housenumber=${number}&streetname=${street}&boro=${borough}`;
  let response = await fetch(url);
  let json = await response.json();

  if (json.length === 0) {
    //Try again without borough in parameters if API returns empty
    url = `https://data.cityofnewyork.us/resource/wvxf-dwi5.json?&housenumber=${number}&streetname=${street}`;
    response = await fetch(url);
    json = await response.json();
  }
  return json;
};

const fetchComplaintData = async ({ number, street, borough, state }) => {
  //get ComplaintID and date via address
  let url = `https://data.cityofnewyork.us/resource/uwyv-629c.json?&housenumber=${number}&streetname=${street}&borough=${borough}`;
  let response = await fetch(url);
  let json = await response.json();

  if (json.length === 0) {
    //Try again without borough in parameters if API returns empty
    url = `https://data.cityofnewyork.us/resource/uwyv-629c.json?&housenumber=${number}&streetname=${street}`;
    response = await fetch(url);
    json = await response.json();
  }

  //const complaintID;
  //const date;
  //const complaintData = fetchComplaintCodeData({complaints: json})
  return json;
};

const fetchComplaintCodeData = async ({ complaints }) => {
  const array = []

  const complaintData = Promise.all(complaints.map(async (complaint) => {
    let url = `https://data.cityofnewyork.us/resource/a2nx-4u46.json?&complaintid=${complaint.complaintid}`;
    let response = await fetch(url);
    let json = await response.json();

    if (json.length !== 1) {  
    //Try again without borough in parameters if API returns empty
      url = `https://data.cityofnewyork.us/resource/a2nx-4u46.json?&complaintid=${complaint.complaintid}&statusdate=${complaint.statusdate}`;
      response = await fetch(url);
      json = await response.json();
    }
    if (json.length > 0) {
      array.push(json[0])
    }
    return array
  }))

  return complaintData;
};

const fetchUnitData = async ({ number, street, borough, state }) => {
  if (borough === "MANHATTAN") {
    borough = "MN";
  } else if (borough === "BROOKLYN") {
    borough = "BK";
  } else if (borough === "BRONX") {
    borough = "BX";
  } else if (borough === "QUEENS") {
    borough = "QN";
  } else if (borough === "STATEN ISLAND") {
    borough = "SI";
  }
  let url = `https://data.cityofnewyork.us/resource/64uk-42ks.json?address=${
    number + "%20" + street
  }&borough=${borough}`;
  let response = await fetch(url);
  let json = await response.json();
  return json;
};

const filterOpenViolations = (data) => {
  const openViolationsOnly = data.filter(
    (listing) => listing.violationstatus === "Open"
  );
  const numberOfViolations = openViolationsOnly.length;
  return {
    total: numberOfViolations,
    listings: openViolationsOnly,
  };
};

const getUnitTotal = (data) => {
    let totalUnits = null;
    if (data.length > 0) {
      totalUnits = data[0].unitstotal;
  }
  return totalUnits;
};

const filterOpenComplaints = (data) => {
    const openComplaintsOnly = data.filter(
    (listing) => listing.status === "OPEN"
  );
  const numberOfComplaints = openComplaintsOnly.length;
  return {
    total: numberOfComplaints,
    listings: openComplaintsOnly,
  };
};

const getFormattedStreet = async (address) => {
  removeTerms = ["APT", "#", "FLOOR", "PENTHOUSE", "TOWNHOUSE"];
  for (term of removeTerms) {
    if (address.includes(term)) {
      address = address.substring(0, address.indexOf(term) - 1);
    }
  }
  address = address.replaceAll(" ", "%20");
  const geoSearchUrl = "https://geosearch.planninglabs.nyc/v1/search?text=";

  let response = await fetch(geoSearchUrl + address);
  let json = await response.json();

  if (json.length !== 0) {
    if (json.features.length > 0) {
      let formattedAddress = json.features[0].properties.pad_orig_stname;
      return formattedAddress.replaceAll(" ", "%20").trim();
    } else {
      return null;
    }
  }
};