import { Card } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import myTeamLogo from "/public/assets/img/my-team-logo.png";

export default function App() {
  const navigate = useNavigate();

  return (
    <Card className="m-4 border border-2">
      <Card.Header
        className="text-center"
        style={{ backgroundColor: "#0e1129" }}
      >
        <img
          src={myTeamLogo}
          alt="Meu Time"
          className="me-2"
          width={400}
          height={200}
          onClick={() => navigate("/")}
        />
      </Card.Header>
      <Card.Body style={{ backgroundColor: "#204a6f" }} className="text-center">
        <div className="m-3">
          <Outlet />
        </div>
      </Card.Body>
    </Card>
  );
}
