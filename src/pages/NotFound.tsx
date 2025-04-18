
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-gradient-to-br from-tech-900 to-tech-900/80">
      <div className="space-y-4 max-w-md">
        <h1 className="text-9xl font-bold text-tech-300">404</h1>
        <h2 className="text-2xl font-semibold text-white">Page Not Found</h2>
        <p className="text-gray-400">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Button asChild className="mt-4 bg-tech-300 hover:bg-tech-400">
          <Link to="/">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Return to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
