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

  //User data
  const userName = watchUser("userName") ?? localStorage.getItem("userName");
  const limitRequests =
    watchUser("limitRequests") ?? localStorage.getItem("limitRequests");
  const subscriptionPlan =
    watchUser("subscriptionPlan") ?? localStorage.getItem("subscriptionPlan");

  //Team data
  const seasonYear =
    watchTeam("season.year") ?? localStorage.getItem("seasonYear");
  const leagueId = watchTeam("league.id") ?? localStorage.getItem("leagueId");
  const leagueName =
    watchTeam("league.name") ?? localStorage.getItem("leagueName");
  const leagueLogo =
    watchTeam("league.logo") ?? localStorage.getItem("leagueLogo");
  const teamId = watchTeam("id") ?? localStorage.getItem("teamId");
  const teamName = watchTeam("name") ?? localStorage.getItem("teamName");
  const teamLogo = watchTeam("logo") ?? localStorage.getItem("teamLogo");

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
      <Row className="g-3 m-1">
        <Col
          md={2}
          className="border rounded border-2 text-light"
          style={{ marginRight: "1rem" }}
        >
          <div className="m-2">
            <h5>{`Olá, ${userName}`}</h5>
            <p>{`Plano atual: ${subscriptionPlan}.`}</p>
            <p>{`No seu plano, o limite de pesquisas diárias é de: ${limitRequests}.`}</p>
            <p>{`Pesquisas realizadas hoje: ${totalRequests}.`}</p>
          </div>
        </Col>
        <Col md>
          <SearchTeam />
        </Col>
      </Row>
      {watchTeam("id") && (
        <div className="mt-3">
          <TeamDetails
            teamId={teamId}
            seasonYear={seasonYear}
            leagueId={leagueId}
            teamName={teamName}
            teamLogo={teamLogo}
            leagueName={leagueName}
            leagueLogo={leagueLogo}
          />
        </div>
      )}
    </PageHeader>
  );
}
