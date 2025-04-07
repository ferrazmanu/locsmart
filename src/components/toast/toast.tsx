import { ToastType } from "@/src/contexts/dashboard/dashboard.interface";
import { BiSolidErrorCircle } from "react-icons/bi";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { StyledToast } from "./toast.styles";

interface ToastProps {
  type: ToastType;
  message: string;
}

const typeIcons = {
  success: <FaCheckCircle />,
  error: <BiSolidErrorCircle />,
  info: <BsFillInfoCircleFill />,
};

const Toast: React.FC<ToastProps> = ({ type, message }) => {
  return (
    <StyledToast type={type}>
      {typeIcons[type]}
      {message}
      <div className="progress-bar" />
    </StyledToast>
  );
};

export default Toast;
