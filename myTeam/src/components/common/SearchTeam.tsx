import { Form, Row, Col, Collapse } from "react-bootstrap";
import { Team } from "../../types/Team";
import { useFormContext } from "react-hook-form";
import { CountryCode } from "../../features/@core/CountryCode";
import { SelectSeason } from "./SelectSeason";
import { SelectLeague } from "./connected-components/SelectLeague";
import { SelectCountry } from "./SelectCountry";
import { SelectTeam } from "./connected-components/SelectTeam";

export function SearchTeam() {
  const { watch, setValue } = useFormContext<Team>();

  const countryCode = watch("country.code");
  const seasonYear = watch("season.year");
  const leagueId = watch("league.id");
  const teamId = watch("id");

  const isValidCountry = countryCode !== undefined && countryCode !== null;
  const isValidSeason = seasonYear !== undefined && seasonYear !== null;
  const isValidLeague = leagueId !== undefined && leagueId !== null;
  const isValidTeam = teamId !== undefined && teamId !== null;

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
              setValue("league.id", option?.value ?? 2022);
              localStorage.setItem("leagueId", watch("league.id").toString());
            }}
          />
        </Form.Group>
      </Collapse>

      <Collapse in={isValidLeague}>
        <Form.Group className="mt-3">
          <hr className="text-light" />
          <Form.Label className="text-light">Selecione o time</Form.Label>
          <SelectTeam
            leagueId={leagueId}
            seasonYear={seasonYear}
            onChange={(option) => {
              setValue("id", option?.value ?? 1);
              localStorage.setItem("teamId", watch("id").toString());
            }}
          />
        </Form.Group>
      </Collapse>
    </Form>
  );
}
