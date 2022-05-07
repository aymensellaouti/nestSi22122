import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile, UseGuards, Req, SetMetadata
} from "@nestjs/common";
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '../generics/uploadImages/upload-helpers';
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "../auth/paramDecorator/user.param-decorator";
import { RoleGuard } from "../auth/guards/role.guard";
import { Roles } from "../auth/decorators/role.decorator";

@Controller('cv')
@Roles('role:admin')
@UseGuards(RoleGuard)
@UseGuards(AuthGuard('jwt'))
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RoleGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'public/uploads',
        filename: editFileName,
      }),
    }),
  )
  create(
    @Body() createCvDto: CreateCvDto,
    @UploadedFile() image: Express.Multer.File,
    @GetUser() user,
  ) {
    if (image && image.path) {
      createCvDto.path = image.path;
    }
    if (user) {
      createCvDto.user = user;
    }
    return this.cvService.create(createCvDto);
  }

  @Get()
  @Roles('role:user')
  @UseGuards(RoleGuard)
  findAll(@Req() request) {
    // console.log('req', request);
    return this.cvService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto) {
  //   return this.cvService.update(+id, updateCvDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cvService.remove(+id);
  // }
}
