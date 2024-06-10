import { Flex, Select } from "antd";
import DataForm from "./components/DataForm";
import DataTable from "./components/DataTable";
import { useTranslation } from "react-i18next";
import { CountryCode } from "./country";

function getCountryFlagEmoji(countryCode: CountryCode) {
  return [...countryCode.toUpperCase()]
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .reduce((a, b) => `${a}${b}`);
}
const phoneCountry = [
  { value: "th", label: `${getCountryFlagEmoji("TH")}+66` },
  { value: "fr", label: `${getCountryFlagEmoji("FR")}+33` },
  { value: "us", label: `${getCountryFlagEmoji("US")}+1` },
];

function App() {
  const [t, i18n] = useTranslation("global");
  const title = [
    { value: "mr", label: t("form.mr") },
    { value: "mrs", label: t("form.mrs") },
    { value: "ms", label: t("form.ms") },
  ];
  const nationality = [
    { value: "th", label: t("form.th") },
    { value: "fr", label: t("form.fr") },
    { value: "us", label: t("form.us") },
  ];

  const gender = [
    { value: "male", label: t("form.male") },
    { value: "female", label: t("form.female") },
    { value: "unsex", label: t("form.unsex") },
  ];

  function handleChangeLng(lng: string) {
    i18n.changeLanguage(lng);
  }

  return (
    <>
      <Flex justify="space-between" align="center">
        <h1>{t("home.h1")}</h1>
        <Select
          defaultValue={i18n.language}
          style={{ width: 100 }}
          options={[
            { value: "en", label: "EN" },
            { value: "th", label: "ไทย" },
          ]}
          onChange={handleChangeLng}
        />
      </Flex>
      <Flex vertical gap="middle">
        <div className="center border" style={{ width: "950px" }}>
          <DataForm
            title={title}
            nationality={nationality}
            gender={gender}
            phoneCountry={phoneCountry}
          />
        </div>
        <div className="center" style={{ width: "1050px" }}>
          <DataTable
            nationality={nationality}
            gender={gender}
            phoneCountry={phoneCountry}
          />
        </div>
      </Flex>
    </>
  );
}

export default App;
