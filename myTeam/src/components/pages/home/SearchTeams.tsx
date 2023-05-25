import { Form } from "react-bootstrap";
import { Teams } from "../../../types/Teams";
import { useFormContext } from "react-hook-form";
import { InputGroup, Button } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

export function SearchTeams() {
  const { register } = useFormContext<Teams>();

  return (
    <Form.Group>
      <Form.Label>Pesquisa</Form.Label>
      <InputGroup className="w-50 mx-auto mb-3 text-center">
        <Form.Control
          placeholder="Pesquisa time"
          className="text-center"
          type="text"
          {...register("name")}
        />
        <Button variant="outline-primary">
          <BsSearch />
        </Button>
      </InputGroup>
    </Form.Group>
  );
}
