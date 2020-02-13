import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersSchema } from './user.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // PassportModule.register(({ defaultStrategy: 'jwt' })),
    // JwtModule.register({
    //     secret: 'topawesomesecret',
    //     signOptions: {
    //         expiresIn: 3600,
    //     },
    // }),
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema }])
  ],
  controllers: [AuthController],
  providers: [
    AuthService
    // JwtStrategy,
  ],
  exports: [
    //  JwtStrategy,
    // PassportModule,
  ]
})
export class AuthModule {}
