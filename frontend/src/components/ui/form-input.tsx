import React from 'react';
import { Input, InputProps } from './input';

interface FormInputProps extends InputProps {
  label?: string;
}

export const FormInput: React.FC<FormInputProps> = ({ label, ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <Input {...props} />
    </div>
  );
};
