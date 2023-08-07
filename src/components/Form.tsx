import React from "react";
import {
  TextInput,
  Button,
  Group,
  Box,
} from "@mantine/core";
import { ChangeEvent, useState } from "react";
import { User } from "../utils/typings";
import axios from "axios";
import { Notification } from "@mantine/core";

type Props = {
  setResponseUsers: React.Dispatch<
    React.SetStateAction<User[]>
  >;
};

export const FormDiv = ({ setResponseUsers }: Props) => {
  const initialValues: User = {
    number: "",
    email: "",
  };

  const [formValues, setFormValues] =
    useState<User>(initialValues);

  const [validations, setValidations] = useState([]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    let { name, value } = e.target;

    //regex for mask
    const mask = value
      .replace(/\D/g, "")
      .match(/(\d{0,2})(\d{0,2})(\d{0,2})/);

    if (name === "number") {
      if (mask)
        value =
          mask[1] +
          (mask[2] ? `-${mask[2]}` : "") +
          (mask[3] ? `-${mask[3]}` : "");
    }

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setValidations([]);
    try {
      const response = await axios.post(
        "http://localhost:3001/users",
        formValues
      );
      setResponseUsers(response.data);
    } catch (
      error: any // линтер дает ошибку что в блоке катч доп парам. нужно указать тип "any"
    ) {
      if (error.response.status === 403) {
        setValidations(error.response.data.validations);
      } else console.log("something went wrong");
    }
  };

  return (
    <Box maw={320} mx="auto">
      {validations.length ? (
        <>
          {validations.map((val, idx) => (
            <Notification key={idx} color="red">
              {val}
            </Notification>
          ))}
        </>
      ) : (
        <></>
      )}
      <TextInput
        mt="md"
        label="Email"
        placeholder="Email"
        name="email"
        value={formValues.email}
        onChange={handleChange}
      />

      <TextInput
        label="Number"
        placeholder="Number"
        name="number"
        onChange={handleChange}
        value={formValues.number}
      />

      <Group position="center" mt="xl">
        <Button variant="outline" onClick={handleSubmit}>
          Find
        </Button>
      </Group>
    </Box>
  );
};
