import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useNavigate } from "react-router-dom";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const companyMutation = useMutation({
    mutationFn: async (company) => {
      await fetch("/companies", {
        method: "POST",
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
      });
    },
    onSuccess() {
      alert(`Company ${companyNameRef.current?.value} created.`);
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

  return (
    <>
      <h1 className="text-2xl font-bold text-center">Create a New Company</h1>
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
          id="companyName"
          className="col-span-full"
          required
          ref={companyNameRef}
          onChange={clearError}
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
          id="city"
          required
          ref={cityRef}
          onChange={clearError}
          maxLength="50"
        />
        <Input
          id="state"
          required
          ref={stateRef}
          onChange={clearError}
          maxLength="5"
        />
        <Input type="date" ref={foundedRef} onChange={clearError} />
        <label className="text-bold col-span-full">Description</label>
        <Input
          id="description"
          className="col-span-full"
          htmlFor="description"
          required
          ref={descriptionRef}
          onChange={clearError}
          maxLength="500"
        />
        <Button>Save</Button>
      </form>
    </>
  );
};

export default CompanyCreate;
