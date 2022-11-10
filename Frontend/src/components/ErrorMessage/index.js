import "./styles.css";
import AlertIcon from "../AlertIcon";

const ErrorMessage = ({ msg }) => {
  return (
    <section className="errorContainer">
      <AlertIcon />
      <p className="error-message">{msg}</p>
    </section>
  );
};

export default ErrorMessage;
