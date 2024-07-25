import { cn } from "@/lib/utils";
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}
function Skeleton({ className, title, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    >
      {title && (
        <div
          className="-rotate-360 flex h-full translate-x-0 flex-col items-center justify-center text-center text-lg font-medium text-gray-600"
          style={{
            transformOrigin: "center center",
          }}
        >
          {title}
        </div>
      )}
    </div>
  );
}

export { Skeleton };
{
  /* <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    /> */
}
//  className="absolute inset-0 flex items-center justify-center transform -rotate-45 text-sm font-medium text-gray-600"
//           style={{
//             transformOrigin: "center center",
//           }}
