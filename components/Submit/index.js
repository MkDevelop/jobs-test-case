import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { Form, H1, Input, Select, Option, Container, Button } from "./styles";
import { useRouter } from "next/router";

const SUBMIT_JOB = gql`
  mutation submitJob($input: SubscribeInput!) {
    subscribe(input: $input) {
      id
      name
      subscribe
    }
  }
`;

export default function Submit() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const [submitJob, { error, loading, data }] = useMutation(SUBMIT_JOB, {
    variables: { input: { name, email } },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    submitJob();
  };

  useEffect(() => {
    if (data && data.subscribe) {
      router.push("/application");
    }
  }, [data]);

  return (
    <>
      {loading && <p>Loading...</p>}
      <Form onSubmit={handleSubmit}>
        <H1>Submit</H1>
        <Input
          placeholder="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Submit</button>
      </Form>
    </>
  );
}
