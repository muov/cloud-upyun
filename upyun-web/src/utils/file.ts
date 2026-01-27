export function getFileIcon(fileName: string) {
  const fileExtension = fileName.split(".")[1];
  if (!fileExtension) {
    return "file-icon-File";
  }
  switch (fileExtension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "bmp":
      return "file-icon-tupian";
    case "pdf":
      return "file-icon-Pdf";
    case "docx":
    case "doc":
      return "file-icon-Word";
    case "xlsx":
    case "xls":
      return "file-icon-Excel";
    case "pptx":
    case "ppt":
      return "file-icon-PPT";
    case "mp3":
    case "wav":
    case "aac":
      return "file-icon-music";
    case "mp4":
    case "avi":
    case "mov":
      return "file-icon-shipin";
    case "txt":
      return "file-icon-txt";
    case "zip":
    case "rar":
    case "7z":
      return "file-icon-yasuobao";
    default:
      return "file-icon-weizhiwenjian";
  }
}
