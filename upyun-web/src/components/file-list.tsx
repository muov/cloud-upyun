import type { IFile } from "@/types/file";
import { FileItem } from "./file-item";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";

const ROOT_PATH = "/";

interface FileListProps {
  files: IFile[];
  path?: string;
  onDelete?: (file: IFile) => void;
  onPathChange?: (path: string) => void;
  onFileClick?: (file: IFile) => void;
}

interface FilePathProps {
  path?: string;
  className?: string;
  onPathChange?: (path: string) => void;
}

export function FilePath({ path, onPathChange, className }: FilePathProps) {
  path = path?.replace(/\\/, ROOT_PATH);
  const paths = path?.split(ROOT_PATH) || [];

  if (paths.length && paths[0] === "") {
    paths[0] = "全部文件";
  }

  const handlePathChange = (index: number = paths.length - 1) => {
    const pathList = paths.slice(1, index);
    pathList.unshift("");
    const path = pathList.join(ROOT_PATH) || ROOT_PATH;
    onPathChange?.(path);
    console.log(path);
  };

  if (!path || path === ROOT_PATH) {
    return (
      <div className={cn("flex text-xs items-center", className)}>
        <div>全部文件</div>
      </div>
    );
  }

  return (
    <div className={cn("flex text-xs items-center", className)}>
      <div
        className="cursor-pointer text-blue-500"
        onClick={() => handlePathChange()}
      >
        返回上一级
      </div>
      <Separator className="mx-2" orientation="vertical" />
      {paths.map((p, index) => (
        <div key={p} className="flex items-center">
          {index !== paths.length - 1 ? (
            <>
              <div
                className="cursor-pointer text-blue-500"
                onClick={() => handlePathChange(index + 1)}
              >
                {p}
              </div>
              <ChevronRightIcon size={14} className="text-border" />
            </>
          ) : (
            <div>{p}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export function FileList({
  files,
  path,
  onDelete,
  onPathChange,
  onFileClick,
}: FileListProps) {
  return (
    <>
      <FilePath className="mb-4" path={path} onPathChange={onPathChange} />
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4">
        {files.map((file) => (
          <FileItem
            key={file.name}
            file={file}
            onDelete={onDelete}
            onFileClick={onFileClick}
          />
        ))}
      </div>
    </>
  );
}
