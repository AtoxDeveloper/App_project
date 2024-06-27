import { Controller, Get } from '@nestjs/common';

@Controller('participant')
export class ParticipantController {
    @Get('status')
    getStatus() {
      return { status: 'ok' };
    }
}
