import { useState } from "react";
import { useController } from "react-hook-form";
import { CiImageOn } from "react-icons/ci";
import { ErrorMessage } from "../error-message/error-message";
import { IControllerInput } from "./input.interfaces";
import { ImageInputStyles } from "./input.styles";

import Image from "next/image";

export const ImageInput: React.FC<IControllerInput> = ({
  name,
  hookForm,
  format,
  required,
  validate,
  defaultValue,
  ...props
}) => {
  const {
    field: { onChange },
  } = useController({
    name: name,
    control: hookForm.control,
  });

  const [preview, setPreview] = useState<string | null>(null);

  return (
    <>
      <ImageInputStyles {...props} className="input-wrapper">
        <CiImageOn size={40} className="add-image" color="#a5a5a5" />

        <input
          type="file"
          accept="image/*"
          {...props}
          onChange={(e) => {
            const file = e.target.files?.[0];
            onChange(e.target.files);

            if (file) {
              setPreview(URL.createObjectURL(file));
            }
          }}
        />

        {preview && (
          <div className="image-preview">
            <Image
              src={preview}
              alt="Preview"
              width={150}
              height={150}
              className="rounded-md"
            />
          </div>
        )}
      </ImageInputStyles>
      {props?.error && (
        <ErrorMessage>
          <span>{props?.error}</span>
        </ErrorMessage>
      )}
    </>
  );
};

ImageInput.displayName = "ImageInput";
