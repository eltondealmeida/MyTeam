import { FormProvider, useForm } from "react-hook-form";
import SearchTeams from "../components/SerachTeams";

export default function Home() {
  const hookForm = useForm();
  return (
    <FormProvider {...hookForm}>
      <SearchTeams />
    </FormProvider>
  );
}
