type CountryAPIResponse = {
  name: {
    common: string;
  };
};

export const fetchCountries = async (): Promise<string[]> => {
  const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
  const data = (await res.json()) as CountryAPIResponse[];

  const countries = data
    .map((country) => country.name?.common)
    .filter(Boolean)
    .sort();

  return [...new Set(countries)];
};
