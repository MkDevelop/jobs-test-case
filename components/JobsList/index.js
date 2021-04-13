import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { Form, H1, Input, Select, Option, Container, Button } from "./styles";
import Downshift from "downshift";
import Link from "next/link";

const GET_JOBS = gql`
  query allJobs {
    jobs {
      id
      title
      company {
        id
        name
      }
    }
  }
`;

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [companies, setCompanies] = useState([]);
  const jobsOnChange = (event) => {
    setJobs(event.target.value);
  };

  const { error, loading, data } = useQuery(GET_JOBS, {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data && data.jobs && data.jobs.length > 0) {
      const { jobs } = data;
      const companies = [...new Set(jobs.map((job) => job.company))];
      setCompanies(companies);
    }
  }, [data]);

  useEffect(() => {
    if (data && data.jobs && data.jobs.length > 0 && selectedCompany) {
      const { jobs } = data;
      const filteredJobs = jobs.filter(
        (item) => item.company.name === selectedCompany
      );
      if (filteredJobs.length === 1) {
        setSelectedJob(filteredJobs[0].title);
      }
      setJobs(filteredJobs);
    } else {
      setJobs([]);
    }
  }, [selectedCompany]);

  console.log(companies);
  if (loading) return <p>Loading Jobs</p>;
  if (error) return <p>Error</p>;

  function handleSubmit(e) {
    e.preventDefault();
    // refetch();
  }

  const onChangeCompany = (selected) => {
    console.log(selected);
    if (selected) {
      setSelectedCompany(selected.name);
    } else {
      setSelectedCompany("");
    }
  };

  const onChangeJob = (event) => {
    console.log(event.target.value);
    setSelectedJob(event.target.value);
  };

  console.log("SELECTED COMPANY: ", selectedCompany);
  return (
    <>
      <H1>Jobs</H1>
      {/* <Container>
        {!error &&
          !loading &&
          data.jobs &&
          data.jobs.length > 0 && (
            <div>
                {data.jobs.map(job => {
                  const { id, title, company } = job;
                  return (
                    <>
                      <div>{ title }</div>
                    </>
                  );
                })}
            </div>
          )}
      </Container> */}

      <Downshift
        onChange={onChangeCompany}
        selectedItem={selectedCompany}
        onInputValueChange={(newInputValue) => {
          if (newInputValue === "") {
            setSelectedCompany("");
          }
        }}
        itemToString={(companies) => (companies ? companies.name : "")}
      >
        {({
          isOpen,
          getToggleButtonProps,
          getInputProps,
          inputValue,
          getItemProps,
          highlightedIndex,
          getMenuProps,
          getLabelProps,
          selectedItem,
          highlightedItem,
        }) => (
          <div>
            <label
              style={{ marginTop: "1rem", display: "block" }}
              {...getLabelProps()}
            >
              Select a company
            </label>{" "}
            <br />
            <Input {...getInputProps({ placeholder: "Search companies" })} />
            {isOpen ? (
              <>
                <div className="downshift-dropdown">
                  {companies
                    .filter(
                      (item) =>
                        !inputValue ||
                        item.name
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                    )
                    .map((item, index) => (
                      <div
                        className="dropdown-item"
                        {...getItemProps({ key: item.name, index, item })}
                        style={{
                          backgroundColor:
                            highlightedIndex === index ? "lightgray" : "white",
                          fontWeight: selectedItem === item ? "bold" : "normal",
                        }}
                      >
                        {item.name}
                      </div>
                    ))}
                </div>
              </>
            ) : null}
            {!isOpen && selectedCompany && (
              <>
                <div>
                  <label
                    style={{ marginTop: "1rem", display: "block" }}
                    {...getLabelProps()}
                  >
                    Select a job
                  </label>{" "}
                  <br />
                </div>
                <div>
                  <Select onChange={onChangeJob}>
                    {jobs.map((job) => (
                      <Option value={job.title}>{job.title}</Option>
                    ))}
                  </Select>
                </div>
              </>
            )}
            {!isOpen && selectedJob && (
              <>
                <br />
                <Link href="/apply">
                  <Button>Apply Now!</Button>
                </Link>
              </>
            )}
          </div>
        )}
      </Downshift>
    </>
  );
}
