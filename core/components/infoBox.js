const generateInfoBox = (data, type, footer) => {
  const infoBox = document.createElement("div");
  if (type === "listing") infoBox.classList.add("hpd-infobox");
  else if (type === "homedetails")
    infoBox.classList.add("hpd-infobox-homedetails");
  const totalOpenViolationsTag = document.createElement("p");
  const avgVioPerUnitTag = document.createElement("p");
  const dropDownLine = document.createElement("div");
  const dropDownWindow = document.createElement("div");

  if (data) {
    dropDownWindow.innerHTML = data.listings;
    dropDownLine.innerHTML = `<a>Click here for more details ▶</a>`;

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
        footer.style.height = "80px";
        // footer.style["min-height"] = "30px";
      }
    });
  }
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
  infoBox.appendChild(dropDownLine);
  // infoBox.addEventListener("click", addDropDownList(listings));

  function addDropDownList(listings) {
    for (let listing in listings) {
    }
  }
  return infoBox;
};
