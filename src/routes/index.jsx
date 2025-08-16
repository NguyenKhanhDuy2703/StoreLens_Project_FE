import { Routes, Route } from "react-router-dom";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Home Page</div>} />
    </Routes>
  );
};

export default AppRouter;
