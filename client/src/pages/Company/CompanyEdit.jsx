import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import dayjs from "dayjs";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const CompanyEdit = ({ isCreate }) => {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [company, setCompany] = useState({
    name: "",
    city: "",
    state: "",
    description: "",
    founded: "",
  });

  const companyQuery = useQuery({
    queryKey: ["companyDetail", companyId],
    queryFn: () => {
      const url = `/companies/${companyId}`;
      return fetch(url, {
        method: "GET",
      }).then(async (res) => {
        return res.json();
      });
    },
    refetchOnWindowFocus: false,
    onSuccess(data) {
      const company = {
        name: data.name,
        city: data.location.city,
        state: data.location.state,
        founded: data.founded ? dayjs(data.founded).format("YYYY-MM-DD") : "",
        description: data.description,
      };
      setCompany(company);
    },
    enabled: !!companyId,
  });

  const companyMutation = useMutation({
    mutationKey: isCreate ? ["companyCreate"] : ["companyUpdate", companyId],
    mutationFn: async (company) => {
      await fetch(isCreate ? "/companies" : `/companies/${companyId}`, {
        method: isCreate ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(company),
      }).then(async (res) => {
        if (!res.ok) {
          // Handle bad responses
          let body = await res.json();
          const { message = "Unknown error" } = body;
          setIsError(true);
          setErrorMessage(message);
          throw new Error(message);
        }
        return res.json();
      });
    },
    onSuccess() {
      alert(`Company ${isCreate ? "created" : "updated"}.`);
      navigate("/");
    },
  });

  const companyNameRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const foundedRef = useRef();
  const descriptionRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    await companyMutation.mutate({
      name: companyNameRef.current?.value,
      location: {
        city: cityRef.current?.value,
        state: stateRef.current?.value,
      },
      description: descriptionRef.current?.value,
      founded: foundedRef.current?.value,
    });
  };

  const clearError = () => {
    if (isError) {
      setIsError(false);
      setErrorMessage("");
    }
  };

  const onChange = (event) => {
    clearError();
    setCompany((value) => {
      return {
        ...value,
        [event.target.name]: event.target.value,
      };
    });
  };

  if (companyMutation.isLoading) return <div>Processing...</div>;
  if (companyQuery.isError || companyMutation.isError) return <div>Error</div>;
  return (
    <>
      <h1 className="text-2xl font-bold text-center">
        {isCreate ? "Create a New Company" : "Edit"}
      </h1>
      <form
        onSubmit={submitHandler}
        className="grid grid-cols-3 gap-x-2 gap-y-2 items-center"
      >
        {isError ? (
          <div className="col-span-full text-red-700">{errorMessage}</div>
        ) : null}
        <label className="text-bold col-span-full" htmlFor="companyName">
          Company Name
        </label>
        <Input
          name="name"
          className="col-span-full"
          required
          ref={companyNameRef}
          value={company.name}
          onChange={onChange}
          maxLength="30"
        />
        <label className="text-bold" htmlFor="city">
          City
        </label>
        <label className="text-bold" htmlFor="state">
          State
        </label>
        <label className="text-bold" htmlFor="founded">
          Founded Date
        </label>
        <Input
          name="city"
          required
          ref={cityRef}
          value={company.city}
          onChange={onChange}
          maxLength="50"
        />
        <Input
          name="state"
          required
          ref={stateRef}
          value={company.state}
          onChange={onChange}
          maxLength="5"
        />
        <Input
          name="founded"
          type="date"
          ref={foundedRef}
          value={company.founded}
          onChange={onChange}
        />
        <label className="text-bold col-span-full">Description</label>
        <Input
          name="description"
          className="col-span-full"
          htmlFor="description"
          required
          ref={descriptionRef}
          value={company.description}
          onChange={onChange}
          maxLength="500"
        />
        <Button>Save</Button>
      </form>
    </>
  );
};

export default CompanyEdit;
