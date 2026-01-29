import { cn } from "@/lib/utils";

interface IconProps {
  icon: string;
  className?: string;
}

export function FileIcon({
  icon = "file-icon-weizhiwenjian",
  className,
  ...props
}: IconProps) {
  return <i className={cn("file-icon", icon, className)} {...props} />;
}
