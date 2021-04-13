import Main from "../lib/layout";
import Header from "../components/Header";
import Submit from "../components/Submit";
import Link from "next/link";
import withApollo from "../lib/apollo";

const Apply = (props) => {
  return (
    <Main>
      <Header />
      <article>
        <h1>Job Application</h1>
        <Submit />
        <Link href="/">
          <a>Go back</a>
        </Link>
      </article>
    </Main>
  );
};

export default withApollo({ ssr: true })(Apply);
