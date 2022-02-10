const generateInfoBox = ({ total, listings }) => {
  const infoBox = document.createElement("div");
  infoBox.addEventListener("click", addDropDownList(listings));

  function addDropDownList(listings) {
    for (let listing in listings) {
    }
  }

  return infoBox;
};
