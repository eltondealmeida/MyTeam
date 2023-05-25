import { forwardRef, ForwardRefRenderFunction } from "react";
import Select, { SingleValue } from "react-select";

export interface SelectSeasonOption {
  value: number;
  label: string;
}

export interface SelectSeasonProps {
  value?: SelectSeasonOption;
  defaultValue?: SelectSeasonOption;
  onChange?: (value: SingleValue<SelectSeasonOption>) => void;
}

const SelectSeasonRef: ForwardRefRenderFunction<any, SelectSeasonProps> = (
  { onChange, ...rest },
  ref
) => {
  const seasons: number[] = [
    2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
    2020, 2021, 2022, 2023, 2024, 2025,
  ];

  const seasonsOptions: SelectSeasonOption[] = seasons.map((year) => ({
    value: year,
    label: year.toString(),
  }));

  function handleChange(value: SingleValue<SelectSeasonOption>) {
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

export const SelectSeason = forwardRef(SelectSeasonRef);
