import { Form, Row, Col, Collapse } from "react-bootstrap";
import { Team } from "../../../types/Team";
import { useFormContext } from "react-hook-form";
import { SelectCountry } from "./common/SelectCountry";
import { CountryCode } from "../../../features/@core/CountryCode";
import { SelectSeasons } from "./common/SelectSeasons";
import { SelectLeagues } from "./common/connected-components/SelectLeagues";

export function SearchTeams() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<Team>();

  const countryCode = watch("country.code");
  const seasonYear = watch("season.year");

  const isValidCountry = countryCode !== undefined && countryCode !== null;
  const isValidSeason = seasonYear !== undefined && seasonYear !== null;

  return (
    <Form>
      <Row className="g-3">
        <Col>
          <Form.Group>
            <Form.Label className="text-light">Selecione o País</Form.Label>
            <SelectCountry
              onChange={(option) =>
                setValue("country.code", option?.value ?? CountryCode.BR)
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
              onChange={(option) =>
                setValue("season.year", option?.value ?? 2021)
              }
            />
            <Form.Control.Feedback type="invalid">
              {errors.season && errors.season.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Collapse in={isValidCountry && isValidSeason}>
        <Form.Group className="mt-3">
          <hr className="text-light" />
          <Form.Label className="text-light">Selecione a liga</Form.Label>
          <SelectLeagues countryCode={countryCode} seasonYear={seasonYear} />
        </Form.Group>
      </Collapse>
    </Form>
  );
}
