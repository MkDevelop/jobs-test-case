import Main from "../lib/layout";
import Header from "../components/Header";
import JobList from "../components/JobsList";
import withApollo from "../lib/apollo";

const Home = (props) => {
  return (
    <Main>
      <Header />
      <JobList />
    </Main>
  );
};

export default withApollo({ ssr: true })(Home);
