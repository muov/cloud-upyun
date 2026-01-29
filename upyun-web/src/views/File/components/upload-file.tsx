import { useState, useRef, type ChangeEvent, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Progress } from "@/components/ui/progress";
import { FileIcon } from "@/components/file-icon";
import { getFileIcon } from "@/utils/file";
import type { ReactNode } from "react";
import { CloudUploadIcon, FolderIcon, XIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UploadFileProps {
  children?: ReactNode;
}

interface UploadFileItem {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: "pending" | "uploading" | "success" | "error";
  file: File;
}

export default function UploadFile({ children }: UploadFileProps) {
  const [files, setFiles] = useState<UploadFileItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalProgress = useMemo(() => {
    if (!files.length) {
      return 0;
    }
    return files.reduce((sum, file) => sum + file.progress, 0) / files.length;
  }, [files]);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles).map((file) => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      progress: 0,
      status: "pending" as const,
      file,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleUpload = () => {
    // 模拟上传逻辑
    setUploading(true);

    files.forEach((file) => {
      setFiles((prev) =>
        prev.map((f) => (f.id === file.id ? { ...f, status: "uploading" } : f)),
      );

      // 模拟上传进度
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);

          // 随机模拟成功或失败
          const isSuccess = Math.random() > 0.2; // 80% 成功率
          setFiles((prev) => {
            const updatedFiles = prev.map((f) =>
              f.id === file.id
                ? ({
                    ...f,
                    progress: 100,
                    status: isSuccess ? "success" : "error",
                  } as UploadFileItem)
                : f,
            );
            const allCompleted = updatedFiles.every(
              (f) => f.status === "success" || f.status === "error",
            );
            if (allCompleted) {
              setUploading(false);
            }
            return updatedFiles;
          });
        } else {
          setFiles((prev) =>
            prev.map((f) => (f.id === file.id ? { ...f, progress } : f)),
          );
        }
      }, 300);
    });
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInit = () => {
    setFiles([]);
    setUploading(false);
  };

  return (
    <Sheet>
      <SheetTrigger asChild onClick={handleInit}>
        {children}
      </SheetTrigger>
      <SheetContent className="sm:max-w-lg">
        {/* 头部标题 */}
        <SheetHeader>
          <SheetTitle className="flex gap-2">
            <CloudUploadIcon />
            <span>上传文件</span>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-1 px-4 min-h-0">
          {/* 文件选择区域 */}
          <div
            className="border border-gray-200 rounded-lg p-8 mb-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={openFileDialog}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
            <div className="flex flex-col items-center justify-center">
              <div className="mb-2 text-gray-600">点击此处进行文件选择</div>
              <div className="text-xs text-gray-500">
                支持 Office、图片、视频等格式
              </div>
            </div>
          </div>
          {/* 上传列表 */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">
                已选择文件 ({files.length})
              </h3>
              <Button
                disabled={uploading}
                variant="ghost"
                size="xs"
                className="text-blue-600"
                onClick={() => setFiles([])}
              >
                清除全部
              </Button>
            </div>
          </div>

          {files.length ? (
            <div className="space-y-3">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex flex-col space-y-2 border rounded-md p-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <FileIcon
                        icon={getFileIcon(file.name)}
                        className="text-4xl!"
                      />
                      <div className="flex-1 min-w-0 h-full">
                        <div className="flex justify-between">
                          <div className="text-sm font-medium truncate">
                            {file.name}
                          </div>
                          <div className="text-xs text-gray-500 mr-3">
                            {Math.round(file.size / (1024 * 1024))} MB
                          </div>
                        </div>
                        <div className="flex w-full gap-2 mt-2 items-center">
                          <Progress value={file.progress} className="h-1.5 " />
                          <div className="text-xs text-gray-500 mr-3 shrink-0">
                            {file.status === "uploading" &&
                              `${Math.round(file.progress)}%`}
                            {file.status === "pending" && "等待上传"}
                            {file.status === "success" && "上传成功"}
                            {file.status === "error" && "上传失败"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <XIcon
                      className="text-gray-400 hover:text-red-600 cursor-pointer"
                      size={14}
                      onClick={() => handleRemoveFile(file.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <FolderIcon />
                </EmptyMedia>
                <EmptyTitle>暂无文件</EmptyTitle>
                <EmptyDescription>
                  您当前没有选择任何文件。请点击“点击此处进行文件选择”进行文件上传。
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </ScrollArea>

        {/* 操作按钮 */}
        <SheetFooter className="flex gap-4 justify-between items-center flex-row">
          <div className="text-xs text-gray-500">总进度：{totalProgress}%</div>
          <div className="flex gap-4">
            <SheetClose asChild>
              <Button
                disabled={uploading}
                variant="outline"
                className="bg-white border-gray-300 text-gray-700"
              >
                取消
              </Button>
            </SheetClose>
            <Button
              onClick={handleUpload}
              disabled={files.length === 0 || uploading}
            >
              {uploading ? "上传中..." : "开始上传"}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
