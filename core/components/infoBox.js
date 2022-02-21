const generateInfoBox = (data, type) => {
  const infoBox = document.createElement("div");
  if (type === "listing") infoBox.classList.add("hpd-infobox");
  else if (type === "homedetails")
    infoBox.classList.add("hpd-infobox-homedetails");
  const totalOpenViolationsTag = document.createElement("p");
  const avgVioPerUnitTag = document.createElement("p");

  totalOpenViolationsTag.classList.add("hpd-infobox-line");
  avgVioPerUnitTag.classList.add("hpd-infobox-line");

  let description = data
    ? `Total Number of Open Violations: ${data.total}`
    : "No Registration Data Available";
  totalOpenViolationsTag.innerHTML = description;

  if (data && data.total && data.totalUnits) {
    const averageUnits = parseFloat(data.total / data.totalUnits).toFixed(1);
    const averageUnitsText = `Average Violations per unit: ${averageUnits}`;
    let color;
    if (averageUnits > 1.0) {
      color = "severe";
    } else if (averageUnits >= 0.5) {
      color = "warning";
    } else {
      color = "okay";
    }
    infoBox.classList.add(color);
    avgVioPerUnitTag.innerHTML = averageUnitsText;
  }

  infoBox.appendChild(totalOpenViolationsTag);
  infoBox.appendChild(avgVioPerUnitTag);
  // infoBox.addEventListener("click", addDropDownList(listings));

  function addDropDownList(listings) {
    for (let listing in listings) {
    }
  }
  return infoBox;
};
