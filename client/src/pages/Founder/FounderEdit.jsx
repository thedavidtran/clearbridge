import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const FounderEdit = ({ isCreate }) => {
  const { companyId, founderId } = useParams();
  const navigate = useNavigate();
  const nameRef = useRef();
  const titleRef = useRef();

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const founderMutation = useMutation({
    mutationKey: ["founderCreate"],
    mutationFn: async (founder) => {
      await fetch(
        isCreate
          ? `${process.env.REACT_APP_API_URL}/founders`
          : `${process.env.REACT_APP_API_URL}/founders/${founderId}`,
        {
          method: isCreate ? "POST" : "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(founder),
        }
      ).then(async (res) => {
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
      alert(`Founder ${isCreate ? "added" : "updated"}.`);
      navigate(`/${companyId}`);
    },
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    await founderMutation.mutate({
      name: nameRef.current?.value,
      title: titleRef.current?.value,
      companyId,
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
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center">
        {isCreate ? "Add Founder" : "Edit Founder"}
      </h1>
      <form
        onSubmit={submitHandler}
        className="grid grid-cols-3 gap-x-2 gap-y-2 items-center"
      >
        {isError ? (
          <div className="col-span-full text-red-700">{errorMessage}</div>
        ) : null}
        <label className="text-bold col-span-full" htmlFor="name">
          Founder Full Name
        </label>
        <Input
          name="name"
          className="col-span-full"
          required
          ref={nameRef}
          onChange={onChange}
          maxLength="50"
        />
        <label className="text-bold col-span-full" htmlFor="name">
          Founder Title
        </label>
        <Input
          name="title"
          className="col-span-full"
          required
          ref={titleRef}
          onChange={onChange}
          maxLength="20"
        />
        <div className="flex col-span-full flex-grow flex-row-reverse">
          <Button>Save</Button>
        </div>
      </form>
    </>
  );
};

export default FounderEdit;
