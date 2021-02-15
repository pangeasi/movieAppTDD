import { ListMovies } from "../components/ListMovies/ListMovie";
import { Search } from "../components/Search/Search";
import { Layout } from "../components/UI/Layout";

export default function Home() {
  return (
    <Layout>
      <Search />
      <ListMovies />
      <iframe src="https://support.mozilla.org/es/kb/el-sitio-web-no-permitira-que-firefox-muestre-la-p?as=u&utm_source=inproduct" />
    </Layout>
  );
}
