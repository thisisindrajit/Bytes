import CountryFlagHolder from "@/components/news/CountryFlagHolder";

export const formatDateAndTime = (inputDate: string) => {
  const publishedObj = new Date(inputDate);

  const date = publishedObj.getDate();
  const month = publishedObj.getMonth() + 1;
  const year = publishedObj.getFullYear();

  const hours =
    publishedObj.getHours() > 12
      ? publishedObj.getHours() - 12
      : publishedObj.getHours() === 0
      ? 12
      : publishedObj.getHours();
  const minutes =
    publishedObj.getMinutes() < 10
      ? "0" + publishedObj.getMinutes()
      : publishedObj.getMinutes();
  const seconds =
    publishedObj.getSeconds() < 10
      ? "0" + publishedObj.getSeconds()
      : publishedObj.getSeconds();
  const amOrPm = publishedObj.getHours() >= 12 ? "PM" : "AM";

  let fullDate = `${date}/${month}/${year}`;

  return `${fullDate} AT ${hours}:${minutes}:${seconds} ${amOrPm} (GMT)`;
};

export const capitalizeCountryName = (country: string) => {
  switch (country) {
    case "india":
      return "India";
    case "united states of america":
      return "United States of America";
    case "australia":
      return "Australia";
    case "united kingdom":
      return "United Kingdom";
    default:
      return country
        .split(" ")
        .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
        .join(" ");
  }
};

export const formatCountry = (inputCountries: string[]) => {
  if (inputCountries.length === 0) return null;

  if (inputCountries.length > 1) {
    return (
      <>
        <CountryFlagHolder
          url="https://twemoji.maxcdn.com/v/latest/svg/1f30f.svg"
          alt="Globe emoji"
        />
        <div>
          {inputCountries.map((c) => capitalizeCountryName(c)).join(", ")}
        </div>
      </>
    );
  }

  const country = inputCountries[0];

  switch (country) {
    case "india":
      return (
        <>
          <CountryFlagHolder
            url="https://twemoji.maxcdn.com/v/latest/svg/1f1ee-1f1f3.svg"
            alt="Indian flag"
          />
          <span>{capitalizeCountryName(country)}</span>
        </>
      );
    case "united states of america":
      return (
        <>
          <CountryFlagHolder
            url="https://twemoji.maxcdn.com/v/latest/svg/1f1fa-1f1f8.svg"
            alt="USA flag"
          />
          <span>{capitalizeCountryName(country)}</span>
        </>
      );
    case "australia":
      return (
        <>
          <CountryFlagHolder
            url="https://twemoji.maxcdn.com/v/latest/svg/1f1e6-1f1fa.svg"
            alt="Australian flag"
          />
          <span>{capitalizeCountryName(country)}</span>
        </>
      );
    case "united kingdom":
      return (
        <>
          <CountryFlagHolder
            url="https://twemoji.maxcdn.com/v/latest/svg/1f1ec-1f1e7.svg"
            alt="UK flag"
          />
          <span>{capitalizeCountryName(country)}</span>
        </>
      );
    default:
      return null;
  }
};

export const checkIfArrayIsNotEmpty = (inputArray: string[]) => {
  if (inputArray.length === 0) return false;

  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i].trim() !== "") return true;
  }

  return false;
};
