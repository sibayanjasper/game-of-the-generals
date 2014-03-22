RandomPosition = {
  locations: [
    "00", "40", "80", "01", "11", "21", "31", "41",
    "51", "61", "71", "81", "02", "12", "22", "32",
    "42", "52", "62", "72", "82"
  ],

  generate: function() {
    var pieceCodes = _.shuffle(PIECE_CODES);

    var retval = {};
    for (var i = 0; i < 21; i++) {
      retval[this.locations[i]] = pieceCodes[i];
    }
    return retval;
  }
};