export const countries = [
  {
    code: "US",
    name: "USA",
    municipality: "City/Town",
    region: "State",
    postalCode: {
      label: "Zip",
      format: "#####"
    },
    regions: [
      {
        code: "AL",
        name: "Alabama"
      },
      {
        code: "AK",
        name: "Alaska"
      },
      {
        code: "AZ",
        name: "Arizona",
      },
      {
        code: "AR",
        name: "Arkansas",
      },
      {
        code: "CA",
        name: "California",
      },
      {
        code: "CO",
        name: "Colorado",
      },
      {
        code: "CT",
        name: "Connecticut",
      },
      {
        code: "DE",
        name: "Delaware",
      },
      {
        code: "DC",
        name: "District Of Columbia",
      },
      {
        code: "FL",
        name: "Florida",
      },
      {
        code: "GA",
        name: "Georgia",
      },
      {
        code: "GU",
        name: "Guam",
      },
      {
        code: "HI",
        name: "Hawaii",
      },
      {
        code: "ID",
        name: "Idaho",
      },
      {
        code: "IL",
        name: "Illinois",
      },
      {
        code: "IN",
        name: "Indiana",
      },
      {
        code: "IA",
        name: "Iowa",
      },
      {
        code: "KS",
        name: "Kansas",
      },
      {
        code: "KY",
        name: "Kentucky",
      },
      {
        code: "LA",
        name: "Louisiana",
      },
      {
        code: "ME",
        name: "Maine",
      },
      {
        code: "MH",
        name: "Marshall Islands",
      },
      {
        code: "MD",
        name: "Maryland",
      },
      {
        code: "MA",
        name: "Massachusetts",
      },
      {
        code: "MI",
        name: "Michigan",
      },
      {
        code: "MN",
        name: "Minnesota",
      },
      {
        code: "MS",
        name: "Mississippi",
      },
      {
        code: "MO",
        name: "Missouri",
      },
      {
        code: "MT",
        name: "Montana",
      },
      {
        code: "NE",
        name: "Nebraska",
      },
      {
        code: "NV",
        name: "Nevada",
      },
      {
        code: "NH",
        name: "New Hampshire",
      },
      {
        code: "NJ",
        name: "New Jersey",
      },
      {
        code: "NM",
        name: "New Mexico",
      },
      {
        code: "NY",
        name: "New York",
      },
      {
        code: "NC",
        name: "North Carolina",
      },
      {
        code: "ND",
        name: "North Dakota",
      },
      {
        code: "MP",
        name: "Northern Mariana Islands",
      },
      {
        code: "OH",
        name: "Ohio",
      },
      {
        code: "OK",
        name: "Oklahoma",
      },
      {
        code: "OR",
        name: "Oregon",
      },
      {
        code: "PW",
        name: "Palau",
      },
      {
        code: "PA",
        name: "Pennsylvania",
      },
      {
        code: "PR",
        name: "Puerto Rico",
      },
      {
        code: "RI",
        name: "Rhode Island",
      },
      {
        code: "SC",
        name: "South Carolina",
      },
      {
        code: "SD",
        name: "South Dakota",
      },
      {
        code: "TN",
        name: "Tennessee",
      },
      {
        code: "TX",
        name: "Texas",
      },
      {
        code: "UT",
        name: "Utah",
      },
      {
        code: "VT",
        name: "Vermont",
      },
      {
        code: "VI",
        name: "Virgin Islands",
      },
      {
        code: "VA",
        name: "Virginia",
      },
      {
        code: "WA",
        name: "Washington",
      },
      {
        code: "WV",
        name: "West Virginia",
      },
      {
        code: "WI",
        name: "Wisconsin",
      },
      {
        code: "WY",
        name: "Wyoming",
      }
    ]
  },
  {
    code: "CA",
    name: "Canada",
    municipality: "City/Town",
    region: "Province",
    postalCode: {
      label: "Postal Code",
      format: "A#A#A#"
    },
    regions: [
      {
        code: "AB",
        name: "Alberta"
      },
      {
        code: "BC",
        name: "British Columbia"
      },
      {
        code: "MB",
        name: "Manitoba"
      },
      {
        code: "NB",
        name: "New Brunswick"
      },
      {
        code: "NL",
        name: "Newfoundland and Labrador"
      },
      {
        code: "NS",
        name: "Nova Scotia"
      },
      {
        code: "NT",
        name: "Northwest Territories"
      },
      {
        code: "NU",
        name: "Nunavut"
      },
      {
        code: "ON",
        name: "Ontario"
      },
      {
        code: "PE",
        name: "Prince Edward Island"
      },
      {
        code: "QC",
        name: "Québec"
      },
      {
        code: "SK",
        name: "Saskatchewan"
      },
      {
        code: "YT",
        name: "Yukon"
      }
    ]
  }
]

export function findCountry(code) {
  return countries.find(country => country.code === code)
}
