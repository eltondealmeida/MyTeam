import { Form, Row, Col } from "react-bootstrap";
import { Teams } from "../../../types/Teams";
import { useFormContext } from "react-hook-form";
import { SelectCountry } from "./common/SelectCountry";
import { CountryCode } from "../../../features/@core/CountryCode";
import { SelectSeasons } from "./common/SelectSeasons";

export function SearchTeams() {
  const {
    setValue,
    formState: { errors },
  } = useFormContext<Teams>();

  return (
    <Form>
      <Row className="g-3">
        <Col>
          <Form.Group>
            <Form.Label className="text-light">Selecione o País</Form.Label>
            <SelectCountry
              onChange={(option) =>
                setValue("country", option?.value ?? CountryCode.BR)
              }
            />
            <Form.Control.Feedback type="invalid">
              {errors.country && errors.country.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col>
          <Form.Group>
            <Form.Label className="text-light">
              Selecione a temporada
            </Form.Label>
            <SelectSeasons
              onChange={(option) => setValue("season", option?.value ?? 2021)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.season && errors.season.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}
