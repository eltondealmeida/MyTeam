import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { FormProvider, useForm } from "react-hook-form";

export default function App() {
  const hookForm = useForm();

  return (
    <Router>
      <FormProvider {...hookForm}>
        <AppRoutes />
      </FormProvider>
    </Router>
  );
}
