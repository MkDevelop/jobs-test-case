import Main from "../lib/layout";
import Header from "../components/Header";
import Link from "next/link";

export default (props) => (
  <Main>
    <Header />
    <article>
      <h1>Job Application</h1>
      <p>Your application has been received and is being processed!</p>
      <Link href="/">
        <a>Go back</a>
      </Link>
    </article>
  </Main>
);
