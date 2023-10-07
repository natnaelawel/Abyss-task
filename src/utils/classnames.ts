// create class name util like the library clsx

export function classNames(...args: any[]) {
  return args.filter(Boolean).join(" ");
}
