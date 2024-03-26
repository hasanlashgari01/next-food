import { ChangeEvent } from "react";

interface Props {
  text: string;
  value: string;
  register: any;
  field: string;
  handler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputRadio: React.FC<Props> = ({ text, value, register, field, handler }) => {
  return (
    <label htmlFor={value} className="radio-label">
      <input
        type="radio"
        id={value}
        value={value}
        className="radio-input"
        {...register(field, { required: true, onChange: (e: ChangeEvent<HTMLInputElement>) => handler(e) })}
      />
      <span>{text}</span>
    </label>
  );
};
export default InputRadio;
