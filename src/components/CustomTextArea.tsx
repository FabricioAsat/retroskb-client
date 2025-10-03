interface Props {
  name: string;
  id: string;
  placeholder: string;
  value: string;
  className?: string;
  onAction: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export const CustomTextArea = ({
  name,
  id,
  placeholder,
  value,
  className,
  onAction,
}: Props) => {
  return (
    <textarea
      onChange={onAction}
      rows={4}
      name={name}
      id={id}
      value={value}
      placeholder={placeholder}
      className={`p-2 w-full font-medium rounded-md border-2 outline-none border-neutral-400 focus:border-neutral-800 placeholder:italic placeholder:font-medium ${className}`}
    />
  );
};
