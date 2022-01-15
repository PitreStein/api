import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpService } from './services/http.service';
import { ConversionService } from './services/conversion.service';
import { AssetController } from './models/asset/asset.controller';
import { AssetService } from './models/asset/asset.service';
import { AssetRepository } from './models/asset/asset.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FiatController } from './models/fiat/fiat.controller';
import { FiatService } from './models/fiat/fiat.service';
import { FiatRepository } from './models/fiat/fiat.repository';
import { CountryRepository } from './models/country/country.repository';
import { LanguageRepository } from './models/language/language.repository';
import { CountryController } from './models/country/country.controller';
import { LanguageController } from './models/language/language.controller';
import { CountryService } from './models/country/country.service';
import { LanguageService } from './models/language/language.service';
import { PassportModule } from '@nestjs/passport';
import { MailService } from './services/mail.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './auth/jwt.strategy';
import { MailerModule } from '@nestjs-modules/mailer';
import { ScheduleModule } from '@nestjs/schedule';
import { SettingRepository } from './models/setting/setting.repository';
import { SettingService } from './models/setting/setting.service';
import * as path from 'path';
import { I18nModule, I18nJsonParser } from 'nestjs-i18n';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    TypeOrmModule.forFeature([
      AssetRepository,
      FiatRepository,
      CountryRepository,
      LanguageRepository,
      SettingRepository,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 172800,
      },
    }),
    MailerModule.forRoot({
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
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'de',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AssetController, FiatController, CountryController, LanguageController],
  providers: [
    ConversionService,
    MailService,
    HttpService,
    AssetService,
    FiatService,
    CountryService,
    LanguageService,
    SettingService,
    JwtStrategy,
  ],
  exports: [
    PassportModule,
    JwtModule,
    ScheduleModule,
    ConversionService,
    MailService,
    HttpService,
    AssetService,
    FiatService,
    CountryService,
    LanguageService,
    SettingService,
  ],
})
export class SharedModule {}
