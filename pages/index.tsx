import { ListMovies } from "../components/ListMovies/ListMovie";
import { Search } from "../components/Search/Search";
import { Layout } from "../components/UI/Layout";

export default function Home() {
  return (
    <Layout>
      <Search />
      <ListMovies />
      <iframe src="https://codesandbox.io/embed/github/kentcdodds/react-testing-library-examples/tree/main/?fontsize=14&hidenavigation=1&theme=dark"></iframe>
    </Layout>
  );
}
