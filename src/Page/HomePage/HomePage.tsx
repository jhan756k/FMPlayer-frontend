import "./HomePage.css";

const HomePage = () => {
  const authRedirect = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };
  return (
    <>
      <button
        onClick={() => {
          authRedirect();
        }}
      >
        Google
      </button>
    </>
  );
};

export default HomePage;
