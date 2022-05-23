const generateInfoBox = (data, type, footer) => {
  if (footer) footer.style.height = "100px";
  const infoBox = document.createElement("div");
  if (type === "listing") infoBox.classList.add("hpd-infobox");
  else if (type === "homedetails")
    infoBox.classList.add("hpd-infobox-homedetails");
  console.log(type);
  const totalOpenViolationsTag = document.createElement("p");
  const totalOpenComplaintsTag = document.createElement("p");
  const avgVioPerUnitTag = document.createElement("p");
  const hpdInfo = document.createElement("div");
  const dropDownLine = document.createElement("div");
  const dropDownWindow = document.createElement("div");
  if (data) {
    console.log(data.violations ? data.violations.listings : "no vio data");
    if (data.violations) {
      const violationListings = document.createElement("ul");
      for (let i = 1; i <= data.violations.listings.length; i++) {
        violationListings.innerHTML += `<li><b>${i}.</b> ${
          data.violations.listings[i - 1].novdescription
        }</li>`;
      }
      dropDownWindow.appendChild(violationListings);
    }

    dropDownLine.innerHTML = `<a>Click here for more details ▶</a>`;
    hpdInfo.classList.add("hpd-info");
    dropDownWindow.classList.add("hpd-infobox-dropdown-window");
    dropDownWindow.classList.add("hidden");
    totalOpenViolationsTag.classList.add("hpd-infobox-line");
    avgVioPerUnitTag.classList.add("hpd-infobox-line");
    dropDownLine.classList.add("hpd-infobox-line");

    dropDownLine.append(dropDownWindow);
    dropDownLine.addEventListener("click", () => {
      if (dropDownWindow.classList.contains("hidden")) {
        dropDownWindow.classList.remove("hidden");
        dropDownLine.innerHTML = `<a>Click here for more details ▼</a>`;
        dropDownLine.append(dropDownWindow);
        footer.style.height = "250px";
        // footer.style["min-height"] = "270px";
      } else {
        dropDownLine.innerHTML = `<a>Click here for more details ▶</a>`;
        dropDownWindow.classList.add("hidden");
        footer.style.height = "100px";
        // footer.style["min-height"] = "30px";
      }
    });

    totalOpenViolationsTag.classList.add("hpd-infobox-line");
    totalOpenComplaintsTag.classList.add("hpd-infobox-line");
    avgVioPerUnitTag.classList.add("hpd-infobox-line");

    let violationsDescription = data.violations
      ? `Total # of Open Violations: ` + data.violations.total.toString().bold()
      : "No Violations Data Available";
    totalOpenViolationsTag.innerHTML = violationsDescription;

    let complaintsDescription = data.complaints
      ? `Total # of Open Complaints: ` + data.complaints.total.toString().bold()
      : "No Complaints Data Available";
    totalOpenComplaintsTag.innerHTML = complaintsDescription;

    infoBox.appendChild(hpdInfo);

    if (data && data.violations && data.units && data.units.unitstotal) {
      const averageUnits = parseFloat(
        data.violations.total / data.units.unitstotal
      ).toFixed(1);
      hpdInfo.classList.add("data-found");
      infoBox.classList.add("data-found");
      const symbolBox = document.createElement("div");
      const symbol = document.createElement("h1");
      symbolBox.appendChild(symbol);
      symbolBox.classList.add("symbol-box");
      symbol.classList.add("symbol");

      const averageUnitsText =
        `Average Violations per unit: ` + averageUnits.toString().bold();
      if (averageUnits > 1.0) {
        symbol.innerHTML = "⛔";
        infoBox.appendChild(symbolBox);
      } else if (averageUnits >= 0.5) {
        symbol.innerHTML = "⚠️";
        infoBox.appendChild(symbolBox);
      }
      avgVioPerUnitTag.innerHTML = averageUnitsText;
    }

    hpdInfo.appendChild(totalOpenViolationsTag);
    hpdInfo.appendChild(totalOpenComplaintsTag);
    hpdInfo.appendChild(avgVioPerUnitTag);
    if (footer) hpdInfo.appendChild(dropDownLine);
  }

  return infoBox;
};
