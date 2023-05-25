import { SearchTeams } from "./SearchTeams";
import PageHeader from "./common/page-header/PageHeader";

export default function HomePage() {
  return (
    <PageHeader>
      <SearchTeams />
    </PageHeader>
  );
}
