/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Col, Form } from "react-bootstrap";
import { PropTypes } from "prop-types";
export default function AuctionDetails({ userMail }) {
  const currencies = getCurrencies();
  return (
    <Col md="6">
      <Form.Group as={Col} className="mb-3" controlId="auctionName">
        <Form.Label className="fw-bold">Nom de la vente</Form.Label>
        <Form.Control required type="text" placeholder="Nom de la vente" />
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="auctionDescription">
        <Form.Label className="fw-bold">Description</Form.Label>
        <Form.Control
          as={"textarea"}
          rows={6}
          required
          type="text"
          placeholder="Nom de la vente"
        />
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="auctionCurrency">
        <Form.Label className="fw-bold">Monaie de la vente</Form.Label>
        <Form.Select required type="text" placeholder="Monaie de la vente">
          {Object.keys(currencies).map((key) => (
            <option key={key} value={key}>
              {currencies[key]}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check label="Autoriser les participants anonymes" />
      </Form.Group>

      {/* Admin */}
      <Form.Group as={Col} className="mb-3" controlId="adminName">
        <Form.Label className="fw-bold">Nom de l'administrateur</Form.Label>
        <Form.Control required type="text" placeholder="Nom de l'admin" />
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="adminMail">
        <Form.Label className="fw-bold">Mail de l'administrateur</Form.Label>
        <Form.Control
          required
          type="text"
          defaultValue={userMail}
          placeholder="Adresse mail de l'admin"
        />
      </Form.Group>
    </Col>
  );
}
AuctionDetails.propType = {
  userMail: PropTypes.string,
};

const getCurrencies = () => {
  return {
    XAF: "CFA Franc BEAC",
    AED: "United Arab Emirates Dirham",
    AFN: "Afghan Afghani",
    ALL: "Albanian Lek",
    AMD: "Armenian Dram",
    ANG: "Netherlands Antillean Guilder",
    AOA: "Angolan Kwanza",
    ARS: "Argentine Peso",
    AUD: "Australian Dollar",
    AWG: "Aruban Florin",
    AZN: "Azerbaijani Manat",
    BAM: "Bosnia-Herzegovina Convertible Mark",
    BBD: "Barbadian Dollar",
    BDT: "Bangladeshi Taka",
    BGN: "Bulgarian Lev",
    BHD: "Bahraini Dinar",
    BIF: "Burundian Franc",
    BMD: "Bermudan Dollar",
    BND: "Brunei Dollar",
    BOB: "Bolivian Boliviano",
    BRL: "Brazilian Real",
    BSD: "Bahamian Dollar",
    BTC: "Bitcoin",
    BTN: "Bhutanese Ngultrum",
    BTS: "BitShares",
    BWP: "Botswanan Pula",
    BYN: "Belarusian Ruble",
    BZD: "Belize Dollar",
    CAD: "Canadian Dollar",
    CDF: "Congolese Franc",
    CHF: "Swiss Franc",
    CLF: "Chilean Unit of Account (UF)",
    CLP: "Chilean Peso",
    CNH: "Chinese Yuan (Offshore)",
    CNY: "Chinese Yuan",
    COP: "Colombian Peso",
    CRC: "Costa Rican Colón",
    CUC: "Cuban Convertible Peso",
    CUP: "Cuban Peso",
    CVE: "Cape Verdean Escudo",
    CZK: "Czech Republic Koruna",
    DASH: "Dash",
    DJF: "Djiboutian Franc",
    DKK: "Danish Krone",
    DOGE: "DogeCoin",
    DOP: "Dominican Peso",
    DZD: "Algerian Dinar",
    EAC: "EarthCoin",
    EGP: "Egyptian Pound",
    EMC: "Emercoin",
    ERN: "Eritrean Nakfa",
    ETB: "Ethiopian Birr",
    ETH: "Ethereum",
    EUR: "Euro",
    FCT: "Factom",
    FJD: "Fijian Dollar",
    FKP: "Falkland Islands Pound",
    FTC: "Feathercoin",
    GBP: "British Pound Sterling",
    GEL: "Georgian Lari",
    GGP: "Guernsey Pound",
    GHS: "Ghanaian Cedi",
    GIP: "Gibraltar Pound",
    GMD: "Gambian Dalasi",
    GNF: "Guinean Franc",
    GTQ: "Guatemalan Quetzal",
    GYD: "Guyanaese Dollar",
    HKD: "Hong Kong Dollar",
    HNL: "Honduran Lempira",
    HRK: "Croatian Kuna",
    HTG: "Haitian Gourde",
    HUF: "Hungarian Forint",
    IDR: "Indonesian Rupiah",
    ILS: "Israeli New Sheqel",
    IMP: "Manx pound",
    INR: "Indian Rupee",
    IQD: "Iraqi Dinar",
    IRR: "Iranian Rial",
    ISK: "Icelandic Króna",
    JEP: "Jersey Pound",
    JMD: "Jamaican Dollar",
    JOD: "Jordanian Dinar",
    JPY: "Japanese Yen",
    KES: "Kenyan Shilling",
    KGS: "Kyrgystani Som",
    KHR: "Cambodian Riel",
    KMF: "Comorian Franc",
    KPW: "North Korean Won",
    KRW: "South Korean Won",
    KWD: "Kuwaiti Dinar",
    KYD: "Cayman Islands Dollar",
    KZT: "Kazakhstani Tenge",
    LAK: "Laotian Kip",
    LBP: "Lebanese Pound",
    LD: "Linden Dollar",
    LKR: "Sri Lankan Rupee",
    LRD: "Liberian Dollar",
    LSL: "Lesotho Loti",
    LTC: "LiteCoin",
    LYD: "Libyan Dinar",
    MAD: "Moroccan Dirham",
    MDL: "Moldovan Leu",
    MGA: "Malagasy Ariary",
    MKD: "Macedonian Denar",
    MMK: "Myanma Kyat",
    MNT: "Mongolian Tugrik",
    MOP: "Macanese Pataca",
    MRU: "Mauritanian Ouguiya",
    MUR: "Mauritian Rupee",
    MVR: "Maldivian Rufiyaa",
    MWK: "Malawian Kwacha",
    MXN: "Mexican Peso",
    MYR: "Malaysian Ringgit",
    MZN: "Mozambican Metical",
    NAD: "Namibian Dollar",
    NGN: "Nigerian Naira",
    NIO: "Nicaraguan Córdoba",
    NMC: "Namecoin",
    NOK: "Norwegian Krone",
    NPR: "Nepalese Rupee",
    NVC: "NovaCoin",
    NXT: "Nxt",
    NZD: "New Zealand Dollar",
    OMR: "Omani Rial",
    PAB: "Panamanian Balboa",
    PEN: "Peruvian Nuevo Sol",
    PGK: "Papua New Guinean Kina",
    PHP: "Philippine Peso",
    PKR: "Pakistani Rupee",
    PLN: "Polish Zloty",
    PPC: "Peercoin",
    PYG: "Paraguayan Guarani",
    QAR: "Qatari Rial",
    RON: "Romanian Leu",
    RSD: "Serbian Dinar",
    RUB: "Russian Ruble",
    RWF: "Rwandan Franc",
    SAR: "Saudi Riyal",
    SBD: "Solomon Islands Dollar",
    SCR: "Seychellois Rupee",
    SDG: "Sudanese Pound",
    SEK: "Swedish Krona",
    SGD: "Singapore Dollar",
    SHP: "Saint Helena Pound",
    SLL: "Sierra Leonean Leone",
    SOS: "Somali Shilling",
    SRD: "Surinamese Dollar",
    SSP: "South Sudanese Pound",
    STD: "São Tomé and Príncipe Dobra (pre-2018)",
    STN: "São Tomé and Príncipe Dobra",
    STR: "Stellar",
    SVC: "Salvadoran Colón",
    SYP: "Syrian Pound",
    SZL: "Swazi Lilangeni",
    THB: "Thai Baht",
    TJS: "Tajikistani Somoni",
    TMT: "Turkmenistani Manat",
    TND: "Tunisian Dinar",
    TOP: "Tongan Pa'anga",
    TRY: "Turkish Lira",
    TTD: "Trinidad and Tobago Dollar",
    TWD: "New Taiwan Dollar",
    TZS: "Tanzanian Shilling",
    UAH: "Ukrainian Hryvnia",
    UGX: "Ugandan Shilling",
    USD: "United States Dollar",
    UYU: "Uruguayan Peso",
    UZS: "Uzbekistan Som",
    VEF: "Venezuelan Bolívar Fuerte (Old)",
    VEF_BLKMKT: "Venezuelan Bolívar (Black Market)",
    VEF_DICOM: "Venezuelan Bolívar (DICOM)",
    VEF_DIPRO: "Venezuelan Bolívar (DIPRO)",
    VES: "Venezuelan Bolívar Soberano",
    VND: "Vietnamese Dong",
    VTC: "VertCoin",
    VUV: "Vanuatu Vatu",
    WST: "Samoan Tala",
    XAG: "Silver Ounce",
    XAU: "Gold Ounce",
    XCD: "East Caribbean Dollar",
    XDR: "Special Drawing Rights",
    XMR: "Monero",
    XOF: "CFA Franc BCEAO",
    XPD: "Palladium Ounce",
    XPF: "CFP Franc",
    XPM: "Primecoin",
    XPT: "Platinum Ounce",
    XRP: "Ripple",
    YER: "Yemeni Rial",
    ZAR: "South African Rand",
    ZMW: "Zambian Kwacha",
    ZWL: "Zimbabwean Dollar",
  };
};
