import {
  Alert,
  Button,
  Card,
  Container,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import {
  ErrorResponse,
  isRouteErrorResponse,
  useNavigate,
} from "@remix-run/react";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Bug,
  Code,
  MoveLeft,
} from "lucide-react";
import { useState } from "react";

import Error400 from "~/images/400ErrorImage.svg";
import Error401 from "~/images/401ErrorImage.svg";
import Error403 from "~/images/403ErrorImage.svg";
import Error404 from "~/images/404ErrorImage.svg";
import Error500 from "~/images/500ErrorImage.svg";
import Error503 from "~/images/503ErrorImage.svg";
import ErrorInstanceImage from "~/images/errorInstanceImage.svg";
import RouteErrorImage from "~/images/routeErrorImage.svg";
import UnknownErrorImage from "~/images/unknownErrorImage.svg";

const RouteErrorMap: Record<number, { text: string; image: string }> = {
  400: {
    text: "Your request is invalid. Please check the input and try again.",
    image: Error400,
  },
  401: {
    text: "You need to log in to access this page.",
    image: Error401,
  },
  403: {
    text: "You don't have permission to access this resource.",
    image: Error403,
  },
  404: {
    text: "The page you're looking for doesn't exist.",
    image: Error404,
  },
  500: {
    text: "Internal server error. We're working to fix this!",
    image: Error500,
  },
  503: {
    text: "The server is temporarily unavailable. Please try again later.",
    image: Error503,
  },
};

const CustomErrorBoundary = ({ error }: { error: unknown }) => {
  const navigate = useNavigate();

  return (
    <Container className="flex flex-col justify-center w-full py-4" size="xl">
      <Button
        leftSection={<MoveLeft size={20} />}
        variant="light"
        onClick={() => navigate(-1)}
        className="mb-8 w-fit"
        size="md"
      >
        Return to previous page
      </Button>

      <div className="flex flex-col gap-8 text-2xl">
        {isRouteErrorResponse(error) ? (
          <RouteErrorComponent error={error} />
        ) : error instanceof Error ? (
          <ErrorInstanceComponent error={error} />
        ) : (
          <UnknownErrorComponent />
        )}
      </div>
    </Container>
  );
};

const RouteErrorComponent = ({ error }: { error: ErrorResponse }) => {
  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <Title className="text-9xl font-black text-gray-400">
          {error.status}
        </Title>
        <Text className="text-xl text-gray-600">
          {RouteErrorMap[error.status]?.text ||
            "Oh no! An unexpected error has occurred."}
        </Text>
      </div>

      <img
        src={RouteErrorMap[error.status]?.image || RouteErrorImage}
        alt="Error illustration"
        className="max-w-2xl mx-auto w-2/3 h-auto mt-8"
      />
    </div>
  );
};

const ErrorInstanceComponent = ({ error }: { error: Error }) => {
  const [isStackOpen, setIsStackOpen] = useState(false);

  return (
    <div className="space-y-8">
      <Alert
        variant="filled"
        color="red"
        title="Application Error"
        icon={<AlertCircle size={24} />}
        className="rounded-xl"
      >
        <Text className="font-semibold text-lg">{error.message}</Text>

        <div className="text-center space-y-6">
          <Button
            variant="light"
            onClick={() => setIsStackOpen(!isStackOpen)}
            leftSection={<Code size={18} />}
            rightSection={
              isStackOpen ? <ArrowUp size={18} /> : <ArrowDown size={18} />
            }
            className="mx-auto my-3 text-mantineColorBlue9 hover:text-mantineColorBlue7"
          >
            {isStackOpen ? "Hide Technical Details" : "Show Technical Details"}
          </Button>

          {isStackOpen && (
            <Card radius="lg" shadow="sm" className="bg-gray-50/50">
              <ScrollArea.Autosize mah={600} className="break-words">
                <Text
                  component="pre"
                  className="text-sm/6 font-mono whitespace-pre-wrap text-black text-left"
                >
                  {error.stack}
                </Text>
              </ScrollArea.Autosize>
            </Card>
          )}
        </div>
      </Alert>
      <img
        src={ErrorInstanceImage}
        alt="Technical error illustration"
        className="max-w-xl mx-auto w-2/3 h-auto mt-4"
      />
    </div>
  );
};

const UnknownErrorComponent = () => {
  return (
    <div className="text-center space-y-8">
      <Alert
        variant="light"
        color="orange"
        title="Unexpected Error"
        icon={<Bug size={24} />}
        className="rounded-xl mx-auto max-w-2xl"
      >
        <Text>
          An unknown error occurred. Please contact support if the problem
          persists.
        </Text>
      </Alert>

      <img
        src={UnknownErrorImage}
        alt="Unknown error illustration"
        className="max-w-2xl mx-auto w-2/3 h-auto"
      />
    </div>
  );
};

export default CustomErrorBoundary;
