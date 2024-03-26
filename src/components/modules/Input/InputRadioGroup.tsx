import { ChangeEvent } from "react";
import InputRadio from "./InputRadio";

export interface IRadioData {
  id: number;
  text: string;
  value: string;
  field: string;
}

interface IProps {
  data: IRadioData[];
  register: any;
  handler: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const InputRadioGroup: React.FC<IProps> = ({ data, register, handler, label }) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="mb-1 inline-block pr-4 text-sm font-semibold text-primary-900 dark:text-slate-300">{label}</span>
      <div className="flex gap-2">
        {data.map(radio => (
          <InputRadio
            key={radio.id}
            text={radio.text}
            value={radio.value}
            register={register}
            handler={handler}
            field={radio.field}
          />
        ))}
      </div>
    </div>
  );
};
export default InputRadioGroup;
