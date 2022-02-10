const cleanBorough = (borough) => {
  let cleanBorough = borough.toUpperCase();
  console.log(cleanBorough);
  if (cleanBorough.includes("NEW YORK")) cleanBorough = "MANHATTAN";
  cleanBorough = cleanBorough.trim().replaceAll(" ", "%20").toUpperCase();

  return cleanBorough;
};
