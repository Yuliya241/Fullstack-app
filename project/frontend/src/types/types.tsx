import { ReactNode } from 'react';
import { schema } from '../utils/validation';
import * as yup from 'yup';

export type Props = {
  children?: ReactNode;
};

export type State = {
  hasError: boolean;
};

export type FormType = yup.InferType<typeof schema>;
