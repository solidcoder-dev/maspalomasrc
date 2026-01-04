import type { FormEvent } from "react";
import type {
  JoinFormErrors as DomainJoinFormErrors,
  JoinFormValues as DomainJoinFormValues
} from "../../domain/join/joinRequestTypes";

export type JoinRequestValues = DomainJoinFormValues;
export type JoinRequestErrors = DomainJoinFormErrors;

export type JoinRequestHandlers = {
  values: JoinRequestValues;
  onChange: (field: keyof JoinRequestValues, value: string) => void;
  onToggleChange: (field: keyof JoinRequestValues, checked: boolean) => void;
  onBlurField: (field: keyof JoinRequestValues) => void;
  onSignatureChange: (dataUrl: string) => void;
  onSignatureClear: () => void;
  errors: JoinRequestErrors;
  submitDisabled: boolean;
  isSubmitting: boolean;
  shouldShowError: (field: keyof JoinRequestValues) => boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};
