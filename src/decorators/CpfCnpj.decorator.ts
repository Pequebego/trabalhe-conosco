import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";
import { cpf, cnpj } from 'cpf-cnpj-validator';

export function ValidCpfCnpj(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
      registerDecorator({
        name: 'ValidCpfCnpj',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [],
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            if (!value) return false;
            const valid = value.replace(/[^a-zA-Z0-9]/g, "");

            // Verifica se é CPF ou CNPJ válido
            return cpf.isValid(value) || cnpj.isValid(value);
          },
          defaultMessage(args: ValidationArguments) {
            return `${args.property} deve ser um CPF ou CNPJ válido.`;
          },
        },
      });
    };
  }