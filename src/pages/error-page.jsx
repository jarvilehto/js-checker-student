import { Link, useRouteError } from "react-router-dom";
import PageHeader from "../components/pageHeader";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <PageHeader />
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to={`/`}>Back.</Link>
    </div>
  );
}
