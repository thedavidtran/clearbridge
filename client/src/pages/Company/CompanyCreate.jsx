import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";

import Input from "../../components/ui/Input";
import { useNavigate } from "react-router-dom";

const CompanyCreate = () => {
  const navigate = useNavigate();

  const companyMutation = useMutation({
    mutationFn: async (company) => {
      await fetch("/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(company),
      });
    },
    onSuccess() {
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
    });
  };

  return (
    <>
      <h1 className={"text-2xl font-bold text-center"}>Create a New Company</h1>
      <form
        onSubmit={submitHandler}
        className="grid grid-cols-6 gap-x-2 gap-y-4 items-center"
      >
        <label htmlFor="companyName">Company Name</label>
        <Input
          id="companyName"
          className="w-full col-span-5"
          required
          ref={companyNameRef}
        />
        <label htmlFor="city">City</label>
        <Input id="city" className="border-2" required ref={cityRef} />
        <label htmlFor="state">State</label>
        <Input id="state" required ref={stateRef} />
        <label htmlFor="founded">Founded</label>
        <Input id="founded" ref={foundedRef} />
        <label className="col-span-6">Description</label>
        <Input
          id="description"
          className="col-span-6"
          htmlFor="description"
          required
          ref={descriptionRef}
        />
        <button>Save</button>
      </form>
    </>
  );
};

export default CompanyCreate;
