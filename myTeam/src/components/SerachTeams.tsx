import { Form } from "react-bootstrap";
import { Teams } from "../types/Teams";
import { useFormContext } from "react-hook-form";

export default function SearchTeams() {
  const { register } = useFormContext<Teams>();
  return (
    <Form.Group>
      <Form.Label>Pesquisa</Form.Label>
      <Form.Control
        placeholder="Pesquisa time"
        type="text"
        {...register("name")}
      />
    </Form.Group>
  );
}
