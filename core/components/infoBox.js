const generateInfoBox = (data, type, footer) => {
  if (footer) footer.style.height = "100px";
  const infoBox = document.createElement("div");
  if (type === "listing") infoBox.classList.add("hpd-infobox");
  else if (type === "homedetails")
    infoBox.classList.add("hpd-infobox-homedetails");
  const totalOpenViolationsTag = document.createElement("p");
  const totalOpenComplaintsTag = document.createElement("p");
  const avgVioPerUnitTag = document.createElement("p");
  const hpdInfo = document.createElement("div");
  const dropDownLine = document.createElement("div");
  const dropDownWindow = document.createElement("div");
  if (data) {
    if (data.violations) {
      const violationListings = document.createElement("ul");
      const splitWords = ["CODE", "ADM", ":", "HMC"];
      for (let i = 1; i <= data.violations.listings.length; i++) {
        const date = data.violations.listings[i - 1].novissueddate?.slice(0, 7);
        let description = data.violations.listings[i - 1].novdescription;
        for (const word of splitWords) {
          if (description.indexOf(word) > -1) {
            [_, description] = description.split(word);
            description = description.trim();
            break;
          }
        }
        violationListings.innerHTML += `<li class="dropdown-list-item"><b>${i}.</b> (${date}) ${description}</li>`;
      }
      dropDownWindow.appendChild(violationListings);
    }

    dropDownLine.innerHTML = `<a>Click here to see all open violations ▶</a>`;
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
        dropDownLine.innerHTML = `<a>Click here to see all open violations ▼</a>`;
        dropDownLine.append(dropDownWindow);
        // footer.style["min-height"] = "270px";
      } else {
        dropDownLine.innerHTML = `<a>Click here to see all open violations ▶</a>`;
        dropDownWindow.classList.add("hidden");
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

    if (data.violations) {
      if (data.units && (data.units.unitstotal ?? data.units.total_units)) {
        total_units = data.units.unitstotal ?? data.units.total_units;
        const averageUnits = parseFloat(
          data.violations.total / total_units
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
      } else {
        avgVioPerUnitTag.innerHTML = "No Unit # Data Available";
      }
    }

    hpdInfo.appendChild(totalOpenViolationsTag);
    hpdInfo.appendChild(totalOpenComplaintsTag);
    hpdInfo.appendChild(avgVioPerUnitTag);
    if (footer) hpdInfo.appendChild(dropDownLine);
  }

  return infoBox;
};
