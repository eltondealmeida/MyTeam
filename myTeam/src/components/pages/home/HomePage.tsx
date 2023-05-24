import { FormProvider, useForm } from "react-hook-form";
import { SearchTeams } from "./SearchTeams";

export default function HomePage() {
  const hookForm = useForm();
  return (
    <FormProvider {...hookForm}>
      <SearchTeams />
    </FormProvider>
  );
}
