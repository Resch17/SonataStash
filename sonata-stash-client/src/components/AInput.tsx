interface AInputProps {
  id: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  labelText?: string | undefined;
  required?: boolean | undefined;
}
export const AInput = ({ id, type, labelText, required }: AInputProps) => {
  return (
    <div className="input-container">
      <label htmlFor={id}>
        {labelText}
        {required ? ' (required)' : ''}
      </label>
      <input name={id} id={id} type={type ?? 'text'} className="input" />
    </div>
  );
};
