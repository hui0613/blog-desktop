
import { RequireInterceptor } from "../common";
const nodeRequire = require;

// VSCODE_GLOBALS: node_modules
const _VSCODE_NODE_MODULES = new Proxy(Object.create(null), { get: (_target, mod) => nodeRequire(String(mod)) });

export class NodeRequireInterceptor extends RequireInterceptor {
  protected _installInterceptor() {

    const that = this;
    const node_module = _VSCODE_NODE_MODULES.module

    const originalLoad = node_module._load

    node_module._load = function load(request: string, parent: { filename: string }, isMain: boolean) {
      if (!that._factories.has(request)) {
        return originalLoad.apply(this, arguments)
      }
      return that._factories.get(request)!.load(request)
    }

    const originalLookup = node_module._resolveLookupPaths

    node_module._resolveLookupPaths = (request: string, parent: unknown) => {
      return originalLookup.call(this, applyAlternatives(request), parent);
    }

    const applyAlternatives = (request: string) => {
      for (const alternativeModuleName of that._alternatives) {
        const alternative = alternativeModuleName(request);
        if (alternative) {
          request = alternative;
          break;
        }
      }
      return request;
    };
  }

}
