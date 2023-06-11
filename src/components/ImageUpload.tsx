import { FC, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const ImageUpload: FC<ImageUploadProps> = ({ label, onChange, disabled, value }) => {
  const [base64, setBase64] = useState<string | undefined>();

  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: File[]) => {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setBase64(e.target?.result?.toString() ?? undefined);
        handleChange(e.target?.result?.toString() ?? "");
      };
      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    disabled: disabled,
    accept: { "image/*": [] },
    onDrop: handleDrop,
  });

  return (
    <div
      {...getRootProps({
        className: "w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700 cursor-pointer",
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image src={base64} alt={"Uploaded image"} width={100} height={100} />
        </div>
      ) : (
        <p className="text-white">{label}</p>
      )}
    </div>
  );
};

interface ImageUploadProps {
  disabled?: boolean;
  value?: string;
  label: string;
  onChange: (base64: string) => void;
}

export default ImageUpload;
