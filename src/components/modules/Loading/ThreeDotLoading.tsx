import { ThreeDots } from "react-loader-spinner";

interface Props {
  width?: string;
  height?: string;
}

const ThreeDotLoading: React.FC<Props> = ({ width = "75", height = "40" }) => {
  return (
    <ThreeDots
      height={height}
      width={width}
      radius="9"
      color="rgb(var(--background-end-rgb))"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        display: "flex",
        justifyContent: "center",
      }}
      visible={true}
    />
  );
};

export default ThreeDotLoading;
