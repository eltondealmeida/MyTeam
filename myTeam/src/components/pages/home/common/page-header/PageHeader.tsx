import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import myTeamLogo from "/public/assets/img/my-team-logo.png";
import { useForm } from "react-hook-form";
import { User } from "../../../../../types/User";

export interface PageHeaderProps {
  children: React.ReactNode;
}

export default function PageHeader({ children }: PageHeaderProps) {
  const { watch } = useForm<User>();

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
          onClick={() => navigate(watch("isLoggedIn") ? "/home" : "/login")}
        />
      </Card.Header>
      <Card.Body style={{ backgroundColor: "#204a6f" }} className="text-center">
        <div className="m-3">{children}</div>
      </Card.Body>
    </Card>
  );
}
