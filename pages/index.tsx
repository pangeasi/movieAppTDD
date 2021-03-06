import { ListMovies } from "../components/ListMovies/ListMovie";
import { Search } from "../components/Search/Search";
import { Layout } from "../components/UI/Layout";

export default function Home() {
  return (
    <Layout>
      <Search />
      <ListMovies />
    </Layout>
  );
}
