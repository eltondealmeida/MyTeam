import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import myTeamLogo from "/public/assets/img/my-team-logo.png";
import { useForm } from "react-hook-form";
import { User } from "../../types/User";
import { BsEscape } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";

export interface PageHeaderProps {
  enableLogout?: boolean;
  children: React.ReactNode;
}

export function PageHeader({ enableLogout, children }: PageHeaderProps) {
  const { watch, setValue } = useForm<User>();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const navigate = useNavigate();

  function handleLogout() {
    setValue("isLoggedIn", false);
    localStorage.removeItem("isLoggedIn");
    navigate("/");
    window.location.reload();
  }

  return (
    <Card className="m-4 border border-2">
      <Card.Header
        className={`text-center ${
          enableLogout && "justify-content-center d-flex"
        }`}
        style={{ backgroundColor: "#0e1129" }}
      >
        <img
          src={myTeamLogo}
          alt="Meu Time"
          className="mt-3 me-3"
          onClick={() => navigate(watch("isLoggedIn") ? "/home" : "/login")}
          style={
            isMobile
              ? { maxWidth: "90%", height: "auto" }
              : { maxWidth: "30%", height: "auto" }
          }
        />
        {enableLogout && (
          <Button
            variant="link"
            className={`text-light ${isMobile ? "mt-2" : ""}`}
            onClick={handleLogout}
            style={{ position: "absolute", right: 0, top: 0 }}
          >
            <BsEscape /> Sair
          </Button>
        )}
      </Card.Header>
      <Card.Body style={{ backgroundColor: "#204a6f" }} className="text-center">
        {children}
      </Card.Body>
    </Card>
  );
}
