const generateInfoBox = (data) => {
  const infoBox = document.createElement("div");
  infoBox.classList.add("infobox");
  const totalOpenViolationsTag = document.createElement("p");
  const avgVioPerUnitTag = document.createElement("p");

  totalOpenViolationsTag.classList.add("infobox-line");
  avgVioPerUnitTag.classList.add("infobox-line");

  let description = data
    ? `Total Number of Open Violations: ${data.total}`
    : "No Registration Data Available";
  totalOpenViolationsTag.innerHTML = description;

  if (data && data.total && data.totalUnits) {
    const averageUnits = `Average Violations per unit: ${parseFloat(
      data.total / data.totalUnits
    ).toFixed(1)}`;
    avgVioPerUnitTag.innerHTML = averageUnits;
  }

  infoBox.appendChild(totalOpenViolationsTag);
  infoBox.appendChild(avgVioPerUnitTag);
  // infoBox.addEventListener("click", addDropDownList(listings));

  function addDropDownList(listings) {
    for (let listing in listings) {
    }
  }
  console.log(infoBox);
  return infoBox;
};
