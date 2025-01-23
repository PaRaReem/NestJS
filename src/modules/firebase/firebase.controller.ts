import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { CrudDto, ParamsDto } from './dto/firebase.dto';

@Controller('crud')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post('/create/:collection')
  create(@Param() params: CrudDto, @Body() requestBody: any) {
    const { collection } = params;
    return this.firebaseService.createDoc(collection, requestBody);
  }

  @Get('/read/:collection/:id?')
  read(@Param() params: ParamsDto) {
    const { collection, id } = params;
    return this.firebaseService.readDoc(collection, id);
  }

  @Patch('/update/:collection/:id')
  update(@Param() params: ParamsDto, @Body() requestBody: any) {
    const { collection, id } = params;
    return this.firebaseService.updateDoc(collection, id, requestBody);
  }

  @Delete('/delete/:collection/:id')
  delete(@Param() params: ParamsDto) {
    const { collection, id } = params;
    return this.firebaseService.deleteDoc(collection, id);
  }
}
