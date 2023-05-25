import { useFormContext } from "react-hook-form";
import { Button, Collapse, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../home/common/page-header/PageHeader";
import { User } from "../../../types/User";

export default function LoginPage() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useFormContext<User>();

  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertStatus, setAlertStatus] = useState<string | null>(null);

  const onSubmit = async () => {
    setIsLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", watch("apiKey"));
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

    const requestOptions: RequestInit & { redirect?: RequestRedirect } = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://v3.football.api-sports.io/status",
        requestOptions
      );

      const json = await response.json();

      if (json.errors && json.errors.token) {
        setValue("isLoggedIn", false);
        setAlertStatus("Chave de acesso inválida");
      } else {
        setValue("name", json.response.account.firstname);
        setValue("requests", json.response.requests.current);
        setValue("limitRequests", json.response.requests.limit_day);
        setValue("subscriptionPlan", json.response.subscription.plan);
        setValue("isLoggedIn", true);
        localStorage.setItem("name", json.response.account.firstname);
        localStorage.setItem("requests", json.response.requests.current);
        localStorage.setItem("limitRequests", json.response.requests.limit_day);
        localStorage.setItem(
          "subscriptionPlan",
          json.response.subscription.plan
        );
        localStorage.setItem("isLoggedIn", "true");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  function toggleVideo() {
    setShowVideo(!showVideo);
  }

  return (
    <PageHeader>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="apiKey" className="text-center mb-3">
          <h5 className="text-light">Chave de acesso</h5>
          <Form.Control
            type="text"
            placeholder="Digite sua chave de acesso"
            className="w-50 mx-auto mb-3 text-center"
            {...register("apiKey", { required: true })}
            isInvalid={!!errors.apiKey}
          />
          {errors.apiKey && (
            <Form.Control.Feedback type="invalid">
              Campo obrigatório
            </Form.Control.Feedback>
          )}
          {alertStatus && <p className="fs--1 text-danger">{alertStatus}</p>}
          <Button
            variant="outline-light"
            className="w-50 mx-auto"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Spinner animation="border" size="sm" /> : "Entrar"}
          </Button>
        </Form.Group>

        <Form.Group className="mb-3">
          <Button
            variant="link"
            onClick={toggleVideo}
            aria-controls="video-collapse"
            aria-expanded={showVideo}
            className="text-light"
          >
            Esqueceu a chave de acesso ou não possui?
          </Button>
        </Form.Group>

        <Form.Group>
          <Collapse in={showVideo}>
            <div id="collapse">
              <div id="video-collapse">
                <iframe
                  src="https://player.vimeo.com/video/829670979?h=19d7d2154f&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                  width="500"
                  height="300"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Como obter a chave de acesso para Meu Time"
                />
              </div>
              <Button
                variant="link"
                href="https://dashboard.api-football.com/register"
                target="_blank"
                rel="noopener noreferrer"
                className="w-50 mx-auto text-light"
              >
                Cadastre-se na API-Football
              </Button>
            </div>
          </Collapse>
        </Form.Group>
      </Form>
    </PageHeader>
  );
}
