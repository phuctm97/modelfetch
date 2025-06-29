export function getPackagePath(packageName: string) {
  if (!packageName.startsWith("@")) return packageName;
  const [scope, name] = packageName.split("/");
  return `${scope.slice(1)}-${name}`;
}
