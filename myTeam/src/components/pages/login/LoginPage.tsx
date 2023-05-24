import { useForm } from "react-hook-form";
import { Button, Collapse, Form } from "react-bootstrap";
import { useState } from "react";

interface LoginValidationData {
  accessKey: string;
}

export default function LoginPage() {
  const {
    register,
    formState: { errors },
  } = useForm<LoginValidationData>();

  const [showVideo, setShowVideo] = useState(false);

  function toggleVideo() {
    setShowVideo(!showVideo);
  }

  return (
    <Form>
      <Form.Group controlId="accessKey" className="text-center mb-3">
        <Form.Label>Chave de acesso</Form.Label>
        <Form.Control
          type="text"
          placeholder="Digite sua chave de acesso"
          className="w-50 mx-auto mb-3 text-center"
          {...register("accessKey", { required: true })}
          isInvalid={!!errors.accessKey}
        />
        <Form.Control.Feedback type="invalid">
          {errors.accessKey && "Campo obrigatório"}
        </Form.Control.Feedback>
        <Button type="submit" variant="outline-light" className="w-50 mx-auto">
          Entrar
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
  );
}
