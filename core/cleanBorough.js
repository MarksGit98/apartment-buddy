const cleanBorough = (borough) => {
  let cleanBorough = borough.toUpperCase();
  if (cleanBorough.includes("NEW YORK")) cleanBorough = "MANHATTAN";
  cleanBorough = cleanBorough.trim().replaceAll(" ", "%20").toUpperCase();

  return cleanBorough;
};
