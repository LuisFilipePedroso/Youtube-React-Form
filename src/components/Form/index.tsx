import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface Props {
  onSubmit: (data: never) => void;
  initialData?: Record<never, never>;
  children: JSX.Element[];
  schema: Yup.ObjectSchema<never>;
}

const Form: React.FC<Props> = ({ initialData, children, onSubmit, schema }) => {
  const methods = useForm({
    defaultValues: initialData,
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Array.isArray(children)
        ? children.map(child => {
            return child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...child.props,
                    register: methods.register,
                    getValue: methods.getValues,
                    errors: methods.errors,
                    key: child.props.name,
                  },
                })
              : child;
          })
        : children}
    </form>
  );
};

export default Form;
