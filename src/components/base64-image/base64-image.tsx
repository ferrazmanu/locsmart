import { useModalContext } from "@/src/contexts/modal/modal.context";
import { StyledImage } from "./base64-image.styles";

interface IProps {
  base64String: string;
  width: number;
  height: number;
  title: string;
  openOnClick?: boolean;
}

export const Base64Image: React.FC<IProps> = ({
  base64String,
  width,
  height,
  title,
  openOnClick = false,
}) => {
  const { openModal } = useModalContext();

  const src = `data:image/png;base64,${base64String}`;

  return (
    <StyledImage
      src={src}
      alt={title}
      width={width}
      height={height}
      openOnClick
      onClick={() =>
        openOnClick
          ? openModal({
              type: "image",
              data: {
                src,
                width,
                height,
                title,
              },
            })
          : null
      }
    />
  );
};
