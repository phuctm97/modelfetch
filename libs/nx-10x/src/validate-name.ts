import validate from "validate-npm-package-name";

export function validateName(name: string) {
  const result = validate(name);
  if (result.errors && result.errors.length > 0)
    throw new Error(result.errors[0]);
  if (result.warnings && result.warnings.length > 0)
    throw new Error(result.warnings[0]);
  if (!result.validForNewPackages)
    throw new Error(`'${name}' is an invalid name`);
}
