import { forwardRef, ForwardRefRenderFunction } from "react";
import Select, { SingleValue } from "react-select";
import { CountryCodeName } from "../../features/@core/CountryCodeName";
import { CountryCode } from "../../features/@core/CountryCode";

export interface SelectCountryOption {
  value: CountryCode;
  label: CountryCodeName;
}

export interface SelectCountryProps {
  options?: SelectCountryOption[];
  value?: SelectCountryOption;
  onChange?: (value: SingleValue<SelectCountryOption>) => void;
}

const SelectCountryRef: ForwardRefRenderFunction<any, SelectCountryProps> = (
  { onChange, ...rest },
  ref
) => {
  const countryOptions = Object.keys(CountryCode).map((country) => ({
    value: CountryCode[country as keyof typeof CountryCode],
    label: CountryCodeName[country as keyof typeof CountryCodeName],
  }));

  function handleChange(value: SingleValue<SelectCountryOption>) {
    onChange && onChange(value);
  }

  return (
    <Select
      ref={ref}
      closeMenuOnSelect={false}
      classNamePrefix="react-select"
      options={countryOptions}
      onChange={handleChange}
      placeholder="Selecione o País"
      {...rest}
    />
  );
};

export const SelectCountry = forwardRef(SelectCountryRef);
