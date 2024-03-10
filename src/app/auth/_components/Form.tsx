import LeftSide from "./LeftSide";

type FormTypeProps = "Register" | "Login";

interface FormProps {
  form: FormTypeProps;
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ form, children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row-reverse lg:px-8 lg:py-11">
      <LeftSide height={form === "Register" ? "h-40" : "h-60"} />
      {children}
    </div>
  );
};

export default Form;
