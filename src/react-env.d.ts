declare module "*.module.css" {
  const classes: { [key in string]: string };

  export = classes;
}
