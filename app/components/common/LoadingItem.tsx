import { Skeleton } from "@mantine/core";
import { Await } from "@remix-run/react";
import { Loader2Icon } from "lucide-react";
import { ReactNode, Suspense } from "react";
import { cn } from "~/utils/cn";

type LoadingItemProps<T> = {
  data: Promise<T> | undefined;
  children: (resolvedData: Awaited<T>) => ReactNode | ReactNode[];
  className?: string;
  fallback?: ReactNode | undefined;
};

const LoadingItem = <T,>({
  data,
  children,
  className,
  fallback,
}: LoadingItemProps<T>) => {
  return (
    <Suspense
      fallback={fallback ?? <SkeletonContainer className={className} />}
    >
      <Await resolve={data}>{(response) => children(response!)}</Await>
    </Suspense>
  );
};

export const SkeletonContainer = ({ className }: { className?: string }) => {
  return (
    <div className={cn("p-0 w-full h-80 relative", className)}>
      <Skeleton className="w-full h-full" />
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <Loader2Icon className="animate-spin" />
      </div>
    </div>
  );
};

export default LoadingItem;
