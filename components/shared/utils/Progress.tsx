import { Progress } from "@/components/ui/progress";
import React, { useEffect } from "react";

// TODO: Add a progress bar that fills up to 66% after 500ms if required animated
const ProgressComponent = () => {
  const [progress, setProgress] = React.useState(13);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      <Progress value={progress} />
    </div>
  );
};

export default ProgressComponent;
