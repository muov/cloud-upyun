import { getFileIcon } from "@/utils/file";
import { FileIcon } from "./file-icon";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { TrashIcon, ScanEyeIcon } from "lucide-react";
import { type IFile } from "@/types/file";

interface FileItemProps {
  file: IFile;
  onDelete?: (file: IFile) => void;
  onFileClick?: (file: IFile) => void;
}

export function FileItem({ file, onDelete, onFileClick }: FileItemProps) {
  const handleViewFile = (file: IFile) => {
    // 实现查看文件逻辑
    console.log(`View file: ${file.name}`);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className="bg-white rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => onFileClick?.(file)}
        >
          <div className="flex flex-col items-center text-center">
            <div className="text-6xl mb-3">
              <FileIcon icon={getFileIcon(file.name)} />
            </div>
            <Tooltip>
              <TooltipTrigger>
                <div className="text-sm mb-1 line-clamp-1">{file.name}</div>
              </TooltipTrigger>
              <TooltipContent side="bottom">{file.name}</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => handleViewFile(file)}>
          <ScanEyeIcon />
          <span>查看</span>
        </ContextMenuItem>
        <ContextMenuItem onClick={() => onDelete?.(file)}>
          <TrashIcon className="text-red-500" />
          <span className="text-red-500">删除</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
