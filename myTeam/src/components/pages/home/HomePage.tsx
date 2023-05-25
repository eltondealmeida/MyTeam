import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import { User } from "../../../types/User";
import { PageHeader } from "../../common/PageHeader";
import { Row, Col } from "react-bootstrap";
import { SearchTeam } from "../../common/SearchTeam";
import { Team } from "../../../types/Team";
import { TeamDetails } from "../../common/connected-components/TeamDetails";

export default function HomePage() {
  const { watch: watchUser } = useFormContext<User>();
  const { watch: watchTeam } = useFormContext<Team>();

  const [totalRequests, setTotalRequests] = useState<number | undefined>(
    Number(localStorage.getItem("requests"))
  );

  const name = watchUser("name") ?? localStorage.getItem("name");
  const limitRequests =
    watchUser("limitRequests") ?? localStorage.getItem("limitRequests");
  const subscriptionPlan =
    watchUser("subscriptionPlan") ?? localStorage.getItem("subscriptionPlan");
  const leagueId = watchTeam("league.id") ?? localStorage.getItem("leagueId");
  const teamId = watchTeam("id") ?? localStorage.getItem("teamId");
  const seasonYear =
    watchTeam("season.year") ?? localStorage.getItem("seasonYear");

  useEffect(() => {
    if (leagueId || teamId) {
      setTotalRequests((prevTotalRequests) =>
        prevTotalRequests ? prevTotalRequests + 1 : 1
      );
    }
  }, [leagueId, teamId]);

  useEffect(() => {
    if (totalRequests) {
      localStorage.setItem("requests", String(totalRequests));
    }
  }, [totalRequests]);

  return (
    <PageHeader enableLogout>
      <Row className="g-3">
        <Col md={2} className="border rounded border-2 text-light">
          <div className="m-2">
            <h5>{`Olá, ${name}`}</h5>
            <p>{`Plano atual: ${subscriptionPlan}.`}</p>
            <p>{`No seu plano, o limite de pesquisas diárias é de: ${limitRequests}.`}</p>
            <p>{`Pesquisas realizadas hoje: ${totalRequests}.`}</p>
          </div>
        </Col>
        <Col md>
          <SearchTeam />
          {watchTeam("id") && (
            <TeamDetails
              teamId={teamId}
              seasonYear={seasonYear}
              leagueId={leagueId}
            />
          )}
        </Col>
      </Row>
    </PageHeader>
  );
}
