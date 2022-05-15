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
    dropDownWindow.innerHTML = data.violations ? data.violations.listings : "";
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
      ? `Total Number of Open Violations: ${data.violations.total}`
      : "No Violations Data Available";
    totalOpenViolationsTag.innerHTML = violationsDescription;

    let complaintsDescription = data.complaints
      ? `Total Number of Open Complaints: ${data.complaints.total}`
      : "No Complaints Data Available";
    totalOpenComplaintsTag.innerHTML = complaintsDescription;

    if (data && data.violations && data.units && data.units.unitstotal) {
      const averageUnits = parseFloat(
        data.violations.total / data.units.unitstotal
      ).toFixed(1);
      const symbolBox = document.createElement("div");
      const symbol = document.createElement("img");
      symbolBox.appendChild(symbol);
      symbolBox.classList.add("symbol-box");
      symbol.classList.add("symbol");

      const averageUnitsText = `Average Violations per unit: ${averageUnits}`;
      let color;
      if (averageUnits > 1.0) {
        color = "severe";
        symbol.src = chrome.runtime.getURL("assets/severe.png");
        symbol.setAttribute("alt", "../assets/severe.png");
      } else if (averageUnits >= 0.5) {
        color = "warning";
        symbol.src = chrome.runtime.getURL("assets/warning.png");
      } else {
        color = "okay";
      }
      hpdInfo.classList.add(color);
      infoBox.appendChild(symbolBox);
      avgVioPerUnitTag.innerHTML = averageUnitsText;
    }

    hpdInfo.appendChild(totalOpenViolationsTag);
    hpdInfo.appendChild(totalOpenComplaintsTag);
    hpdInfo.appendChild(avgVioPerUnitTag);
    if (footer) hpdInfo.appendChild(dropDownLine);
    infoBox.appendChild(hpdInfo);
  }

  return infoBox;
};
