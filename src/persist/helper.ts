import { Model } from '../model';

export class Helper {
  public static loadPolicyLine(line: string, model: Model): void {
    if (!line || line.trimStart().charAt(0) === '#') {
      return;
    }

    const lines: Array<string> = line.split('\n');
    let tokens = lines.map((token) => token.split(','));
    tokens = tokens.map((tokenList: string[]) => tokenList.map((token: string) => token.trim().replace(/"([^"]+(?="))"/g, '$1')));

    if (!tokens || !tokens[0]) {
      return;
    }

    const key = tokens[0][0];
    const sec = key.substring(0, 1);
    const item = model.model.get(sec);
    if (!item) {
      return;
    }

    const policy = item.get(key);
    if (!policy) {
      return;
    }
    policy.policy.push(tokens[0].slice(1));
  }
}
