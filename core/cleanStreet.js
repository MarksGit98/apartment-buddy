//formats the street names into what is usable for the api
const cleanStreet = (street) => {
    street = street.toUpperCase();
    removeTerms = ["APT", "#", "FLOOR", "PENTHOUSE", "TOWNHOUSE"];
    for (term of removeTerms) {
        if (street.includes(term)) {
            street = street.substring(0, street.indexOf(term) - 1)
        }
    }

    street = ' ' + street + ' '; //add extra space for matching 

    if (street.includes(" PKWY ")) street = street.replace('PKWY ', ' PARKWAY ')
    if (street.includes(" AVE ")) street = street.replace('AVE ', ' AVENUE ')
    if (street.includes(" ST ")) street = street.replace(' ST ', ' STREET ')
    if (street.includes(" BLV ")) street = street.replace(' BLV ', ' BOULEVARD ')
    if (street.includes(" RD ")) street = street.replace('RD', ' ROAD ')
    if (street.includes(" PL ")) street = street.replace(' PL ', ' PLAZA ')
    if (street.includes(" N ")) street = street.replace(' N ', ' NORTH ')
    if (street.includes(" S ")) street = street.replace(' S ', ' SOUTH ')
    if (street.includes(" E ")) street = street.replace(' E ', ' EAST ')
    if (street.includes(" W ")) street = street.replace(' W ', ' WEST ')
    if (street.includes("1ST")) street = street.replace('1ST', '1')
    if (street.includes("2ND")) street = street.replace('2ND', '2')
    if (street.includes("3RD")) street = street.replace('3RD', '3')
    if (street.includes("4TH")) street = street.replace('4TH', '4')
    if (street.includes("5TH")) street = street.replace('5TH', '5')
    if (street.includes("6TH")) street = street.replace('6TH', '6')
    if (street.includes("7TH")) street = street.replace('7TH', '7')
    if (street.includes("8TH")) street = street.replace('8TH', '8')
    if (street.includes("9TH")) street = street.replace('9TH', '9')
    if (street.includes("0TH")) street = street.replace('0TH', '10')

    street = street.substring(1, street.length - 1); //get rid of the extra space
    return street
}