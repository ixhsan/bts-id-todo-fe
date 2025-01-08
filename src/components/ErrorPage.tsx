import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

interface IErrorPageProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

export const ErrorPage: React.FC<IErrorPageProps> = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const getErrorMessage = () => {
    if (isRouteErrorResponse(error)) {
      // Handle route errors (404, 401, etc)
      switch (error.status) {
        case 404:
          return {
            title: "Page Not Found",
            description: "Sorry, the page you are looking for doesn't exist.",
          };
        case 401:
          return {
            title: "Unauthorized",
            description: "You don't have permission to access this page.",
          };
        case 403:
          return {
            title: "Forbidden",
            description: "Access to this page is forbidden.",
          };
        default:
          return {
            title: `Error ${error.status}`,
            description: error.statusText,
          };
      }
    }

    // Handle other errors
    if (error instanceof Error) {
      console.log({ error });
      return {
        title: "Application Error",
        description: error.message,
      };
    }

    return {
      title: "Unknown Error",
      description: "An unexpected error occurred.",
    };
  };

  const errorDetails = getErrorMessage();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-4">
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>{errorDetails.title}</AlertTitle>
          <AlertDescription>{errorDetails.description}</AlertDescription>
        </Alert>

        <div className="flex justify-end gap-2">
          <Button variant="outline" className="text-black" onClick={() => navigate(-1)}>
            Go Back
          </Button>
          <Button onClick={() => navigate("/", { replace: true })}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};
