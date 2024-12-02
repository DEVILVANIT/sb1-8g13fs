import NodeRSA from 'node-rsa';

export enum DkimSigningAlgorithm {
  RSA = 'rsa-sha256'
}

export class DkimSigningKey {
  private key: NodeRSA;

  constructor(privateKey: string, algorithm: DkimSigningAlgorithm) {
    this.key = new NodeRSA(privateKey);
    if (algorithm !== DkimSigningAlgorithm.RSA) {
      throw new Error('Unsupported signing algorithm');
    }
  }

  sign(data: Uint8Array): Uint8Array {
    return this.key.sign(data);
  }
}

export class DkimConfig {
  constructor(
    private selector: string,
    private domain: string,
    private signingKey: DkimSigningKey,
    private headerFields: string[] = ['From', 'To', 'Subject']
  ) {}

  static defaultConfig(
    selector: string,
    domain: string,
    signingKey: DkimSigningKey
  ): DkimConfig {
    return new DkimConfig(selector, domain, signingKey);
  }

  getSelector(): string {
    return this.selector;
  }

  getDomain(): string {
    return this.domain;
  }

  getSigningKey(): DkimSigningKey {
    return this.signingKey;
  }

  getHeaderFields(): string[] {
    return this.headerFields;
  }
}