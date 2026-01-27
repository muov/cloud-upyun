import { cn } from "@/lib/utils";

interface IconProps {
  icon: string;
}

export function FileIcon({
  icon = "file-icon-weizhiwenjian",
  ...props
}: IconProps) {
  return <i className={cn("file-icon", icon)} {...props} />;
}
