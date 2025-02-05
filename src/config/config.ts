import { MailerOptions } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Exchange } from 'ccxt';
import { I18nJsonParser, I18nOptions } from 'nestjs-i18n';
import * as path from 'path';

@Injectable()
export class ConfigService {
  constructor() {
    Config = GetConfig();
  }
}

export function GetConfig(): Configuration {
  return new Configuration();
}

export class Configuration {
  environment = process.env.ENVIRONMENT;
  githubToken = process.env.GH_TOKEN;
  defaultLanguage = 'de';
  defaultCountry = 'DE';
  defaultCurrency = 'EUR';

  database: TypeOrmModuleOptions = {
    type: 'mssql',
    host: process.env.SQL_HOST,
    port: Number.parseInt(process.env.SQL_PORT),
    username: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: process.env.SQL_SYNCHRONIZE === 'true',
    migrationsRun: process.env.SQL_MIGRATE === 'true',
    migrations: ['migration/*.js'],
    cli: {
      migrationsDir: 'migration',
    },
    connectionTimeout: 30000,
  };

  i18n: I18nOptions = {
    fallbackLanguage: this.defaultLanguage,
    parser: I18nJsonParser,
    parserOptions: {
      path: path.join(__dirname, '../shared/i18n/'),
      watch: true,
    },
  };

  auth = {
    jwt: {
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 172800,
      },
    },
    signMessage: process.env.SIGN_MESSAGE,
    signMessageWallet: process.env.SIGN_MESSAGE_WALLET,
  };

  kyc = {
    mandator: process.env.KYC_MANDATOR,
    user: process.env.KYC_USER,
    password: process.env.KYC_PASSWORD,
    prefix: process.env.KYC_PREFIX,
  };

  mail: MailerOptions = {
    transport: {
      host: 'smtp.gmail.com',
      secure: false,
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USER,
        clientId: process.env.MAIL_CLIENT_ID,
        clientSecret: process.env.MAIL_CLIENT_SECRET,
        refreshToken: process.env.MAIL_REFRESH_TOKEN,
      },
      tls: {
        rejectUnauthorized: false,
      },
    },
    defaults: {
      from: '"DFX.swiss" <' + process.env.MAIL_USER + '>',
    },
  };

  node = {
    user: process.env.NODE_USER,
    password: process.env.NODE_PASSWORD,
    inp: {
      active: process.env.NODE_INP_URL_ACTIVE,
      passive: process.env.NODE_INP_URL_PASSIVE,
    },
    dex: {
      active: process.env.NODE_DEX_URL_ACTIVE,
      passive: process.env.NODE_DEX_URL_PASSIVE,
    },
    out: {
      active: process.env.NODE_OUT_URL_ACTIVE,
      passive: process.env.NODE_OUT_URL_PASSIVE,
    },
    int: {
      active: process.env.NODE_INT_URL_ACTIVE,
      passive: process.env.NODE_INT_URL_PASSIVE,
    },
    walletPassword: process.env.NODE_WALLET_PASSWORD,
    dexWalletAddress: process.env.DEX_WALLET_ADDRESS,
    stakingWalletAddress: process.env.STAKING_WALLET_ADDRESS,
  };

  ftp = {
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    directory: process.env.FTP_FOLDER,
  };

  exchange: Partial<Exchange> = {
    enableRateLimit: true,
    timeout: 30000,
  };

  // --- GETTERS --- //
  get kraken(): Partial<Exchange> {
    return {
      apiKey: process.env.KRAKEN_KEY,
      secret: process.env.KRAKEN_SECRET,
      ...this.exchange,
    };
  }

  get binance(): Partial<Exchange> {
    return {
      apiKey: process.env.BINANCE_KEY,
      secret: process.env.BINANCE_SECRET,
      ...this.exchange,
    };
  }
}

export let Config: Configuration;
