import { Form, InputGroup } from "react-bootstrap";
import { Teams } from "../../../types/Teams";
import { useFormContext } from "react-hook-form";
import { SelectCountry } from "./common/SelectCountry";
import { CountryCode } from "../../../features/@core/CountryCode";

export function SearchTeams() {
  const {
    setValue,
    formState: { errors },
  } = useFormContext<Teams>();

  return (
    <Form>
      <Form.Group>
        <InputGroup>
          <Form.Label>Selecione o País:</Form.Label>
          <SelectCountry
            onChange={(option) =>
              setValue("country", option?.value ?? CountryCode.BR)
            }
          />
        </InputGroup>
        <Form.Control.Feedback type="invalid">
          {errors.country && errors.country.message}
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
}
