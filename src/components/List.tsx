import { Box, Loader } from "@mantine/core";
import { User } from "../utils/typings";

type Props = {
  responseUsers: User[];
};

export const List = ({ responseUsers }: Props) => {
  return (
    <Box sx={{ textAlign: "center", marginTop: "30px" }}>
      {responseUsers.length ? (
        responseUsers.map((user, idx) => (
          <Box
            key={idx}
            sx={(theme) => ({
              marginTop: "20px",
              border: "1px solid black",
            })}>
            <b>email: </b>
            {user.email} <br /> <b>number: </b>
            {user.number}
          </Box>
        ))
      ) : (
        <>no users yet...</>
      )}
    </Box>
  );
};
