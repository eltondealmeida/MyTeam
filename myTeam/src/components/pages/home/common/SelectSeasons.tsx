import { forwardRef, ForwardRefRenderFunction } from "react";
import Select, { SingleValue } from "react-select";

export interface SelectSeasonsOption {
  value: number;
  label: string;
}

export interface SelectSeasonsProps {
  value?: SelectSeasonsOption;
  defaultValue?: SelectSeasonsOption;
  onChange?: (value: SingleValue<SelectSeasonsOption>) => void;
}

const SelectSeasonsRef: ForwardRefRenderFunction<any, SelectSeasonsProps> = (
  { onChange, ...rest },
  ref
) => {
  const seasons: number[] = [
    2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
    2020, 2021, 2022, 2023, 2024, 2025,
  ];

  const seasonsOptions: SelectSeasonsOption[] = seasons.map((year) => ({
    value: year,
    label: year.toString(),
  }));

  function handleChange(value: SingleValue<SelectSeasonsOption>) {
    onChange && onChange(value);
  }

  return (
    <Select
      ref={ref}
      closeMenuOnSelect={false}
      placeholder="Selecione a temporada"
      classNamePrefix="react-select"
      options={seasonsOptions}
      onChange={handleChange}
      {...rest}
    />
  );
};

export const SelectSeasons = forwardRef(SelectSeasonsRef);
