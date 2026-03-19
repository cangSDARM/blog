const eventTarget = Symbol("containerEventTarget");
export const contextname = Symbol("contextname");

type Isolation = {
  contextname: typeof contextname;
};
type Context = WindowProxy;
export type IsolatedContext = Context & Isolation;

export const setDependencies = async (
  context: IsolatedContext,
  dependencies: string[]
) => {
  const document = context.document;
  let resolved = 0;

  new Promise<void>((resolve, reject) => {
    dependencies.forEach((dep) => {
      if (document.querySelector(`script[filename="${dep}"]`)) {
        return resolve();
      }

      const script = document.createElement("script");

      script.type = "text/javascript";
      script.onerror = reject;
      script.onabort = console.warn;
      script.setAttribute("filename", dep);
      script.onload = () => {
        console.log("[CodeContainer] dependency %s resolved", dep);
        resolved += 1;

        if (resolved >= dependencies.length) {
          resolve();
        }
      };
      script.defer = true;
      script.src = "https://cdnjs.cloudflare.com/ajax/libs" + dep;

      document.body.append(script);
    });
  })
    .then(() => {
      emitEvent(context, "DependenciesResolved", dependencies);
    })
    .catch((e) => emitEvent(context, "error", e));
};

export const initialContext = (
  context: Context,
  configuration: {
    contextname: string;
  }
) => {
  console.log(
    "[CodeContainer] context %s initialed",
    configuration.contextname
  );
  (context as any)[contextname] = configuration.contextname;
  (context as any)[eventTarget] = new EventTarget();
};

export const emitEvent = <T>(
  context: IsolatedContext,
  event: string,
  detail: T
) => {
  (context as any)[eventTarget].dispatchEvent(
    new CustomEvent((context as any)[contextname] + event, { detail })
  );
};

export const onEvent = (
  context: IsolatedContext,
  event: string,
  onevent: (e: CustomEvent) => void
) => {
  (context as any)[eventTarget].addEventListener(
    (context as any)[contextname] + event,
    onevent
  );
};

export const captureRuntimeError = (
  context: IsolatedContext,
  onerror: (e: PromiseRejectionEvent | string | Event) => void
) => {
  context.onrejectionhandled = onerror;
  context.onerror = onerror;
  onEvent(context, "error", onerror);
};
