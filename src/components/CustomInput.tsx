interface Props {
  name: string;
  id: string;
  type: string;
  placeholder: string;
  value: string;
  className?: string;
  pattern?: string;
  isDisabled: boolean;
  onAction: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const CustomInput = ({
  name,
  id,
  type,
  placeholder,
  value,
  className,
  pattern,
  isDisabled,
  onAction,
}: Props) => {
  return (
    <input
      disabled={isDisabled}
      autoComplete="off"
      onChange={onAction}
      type={type}
      name={name}
      id={id}
      value={value === "0" ? "" : value}
      placeholder={placeholder}
      pattern={pattern}
      className={`p-2 w-full font-medium rounded-md border-2 outline-none border-neutral-400 focus:border-neutral-800 placeholder:italic ${className}`}
    />
  );
};
