import app from "./app.js";

const port = process.env.PORT || 5000;

app.listen(Number(port), "0.0.0.0", () => {
  console.log(`Server is up and running on port ${port}`);
});
