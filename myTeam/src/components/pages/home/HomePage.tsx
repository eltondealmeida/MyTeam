import { useFormContext } from "react-hook-form";
import { User } from "../../../types/User";
import { SearchTeams } from "./SearchTeams";
import PageHeader from "./common/page-header/PageHeader";
import { Card, Row, Col } from "react-bootstrap";

export default function HomePage() {
  const { watch } = useFormContext<User>();

  const name = watch("name") ?? localStorage.getItem("name");
  const requests = watch("requests") ?? localStorage.getItem("requests");
  const limitRequests =
    watch("limitRequests") ?? localStorage.getItem("limitRequests");
  const subscriptionPlan =
    watch("subscriptionPlan") ?? localStorage.getItem("subscriptionPlan");

  return (
    <PageHeader enableLogout>
      <Row className="g-3">
        <Col md={2} className="border rounded border-2 text-light">
          <div className="m-2">
            <h5>{`Olá, ${name}`}</h5>
            <p>{`Plano atual: ${subscriptionPlan}.`}</p>
            <p>{`No seu plano, o limite de pesquisas diárias é de: ${limitRequests}.`}</p>
            <p>{`Pesquisas realizadas hoje: ${requests}.`}</p>
          </div>
        </Col>
        <Col md>
          <SearchTeams />
        </Col>
      </Row>
    </PageHeader>
  );
}
