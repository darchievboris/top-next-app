import {DetailedHTMLProps, TextareaHTMLAttributes} from 'react';
import {FieldError} from "react-hook-form";

export default interface TextareaProps
    extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    error?: FieldError;
}
