import { Module } from '@nestjs/common';
import { UserModule } from './User';

@Module({
	imports: [UserModule],
	exports: [UserModule],
})
export class RootModule {}
