import { useState } from "react";
import type { IFile } from "@/types/file";
import { FileList } from "@/components/file-list";
import { Button } from "@/components/ui/button";
import UploadFile from "./components/upload-file";

export default function File() {
  const [currentPath] = useState("/项目文档");
  const [files] = useState<IFile[]>([
    {
      name: "项目文档",
      size: "3.2 MB",
    },
    {
      name: "产品需求文档 v2.3.docx",
      size: "2.4 MB",
    },
    {
      name: "用户数据统计.xlsx",
      size: "1.8 MB",
    },
    {
      name: "产品发布会.pptx",
      size: "8.7 MB",
    },
    {
      name: "首页设计稿.png",
      size: "3.2 MB",
    },
    {
      name: "用户研究报告.pdf",
      size: "5.6 MB",
    },
  ]);

  const [visible, setVisible] = useState(false);

  const handleDelete = (file: IFile) => {
    // 实现删除文件逻辑
    console.log(`Delete file: ${file.name}`);
  };

  const handleUpload = () => {
    setVisible(true);
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center mb-4">
        <UploadFile>
          <Button onClick={handleUpload}>上传文件</Button>
        </UploadFile>
      </div>
      <FileList files={files} onDelete={handleDelete} path={currentPath} />
    </div>
  );
}
