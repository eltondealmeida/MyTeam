import { Card } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <Card className="m-5 text-center">
      <Card.Header>Meu time</Card.Header>
      <Outlet />
    </Card>
  );
}
