import express from "express";
import cors from "cors";
import { usersData } from "./data";
import { body } from "express-validator";

const app = express();
app.use(express.json());
app.use(cors({ credentials: true }));

app.post("/search", body("email").isEmail(), async (req, res) => {
  let lastRequest: NodeJS.Timeout | null = null;
  if (lastRequest) {
    clearTimeout(lastRequest);
  }

  const { email, number } = req.body;

  lastRequest = setTimeout(() => {
    const filteredUsers = usersData.filter((user) => {
      if (email && user.email !== email) {
        return false;
      }

      if (number && user.number !== number) {
        return false;
      }

      return true;
    });

    res.json(filteredUsers);
  }, 5000);
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
