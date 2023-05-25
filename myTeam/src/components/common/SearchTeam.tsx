import { Form, Row, Col, Collapse } from "react-bootstrap";
import { Team } from "../../types/Team";
import { useFormContext } from "react-hook-form";
import { CountryCode } from "../../features/@core/CountryCode";
import { SelectSeason } from "./SelectSeason";
import { SelectLeague } from "./connected-components/SelectLeague";
import { SelectCountry } from "./SelectCountry";

export function SearchTeam() {
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
            <SelectSeason
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
          <SelectLeague
            countryCode={countryCode}
            seasonYear={seasonYear}
            onChange={(option) => {
              setValue("league.id", option?.value ?? 2021);
              localStorage.setItem("leagueId", watch("league.id").toString());
            }}
          />
          <Form.Control.Feedback type="invalid">
            {errors.league && errors.league.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Collapse>
    </Form>
  );
}
