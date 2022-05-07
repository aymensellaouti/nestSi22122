import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SkillService } from '../skill/skill.service';
import { Skill } from '../skill/entities/skill.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import {
  randEmail,
  randFirstName,
  randLastName,
  randUserName,
  randJobTitle,
  randNumber,
} from '@ngneat/falso';
import { CvService } from '../cv/cv.service';
import { Cv } from '../cv/entities/cv.entity';
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  //  Todo 1- Seed Skill
  const skillService = app.get(SkillService);
  for (let i = 0; i < 10; i++) {
    const skill = new Skill();
    skill.designation = `skill${i}`;
    await skillService.create(skill);
  }
  // Todo 2 : Seed Users
  const userService = app.get(UserService);
  for (let i = 1; i < 30; i++) {
    const user = new User();
    user.email = randEmail();
    user.username = randUserName();
    user.password = i % 3 == 0 ? 'admin' : 'user';
    // user.role = i % 3 == 0 ? UserRoleEnum.admin : UserRoleEnum.user;
    await userService.create(user);
  }
  const skills = await skillService.findAll({});
  const users = await userService.findAll({});
  // Todo 3 : Seed Cv with associates skill and users
  const cvService = app.get(CvService);
  for (let i = 1; i < 10; i++) {
    const cv = new Cv();
    cv.name = randLastName();
    cv.firstname = randFirstName();
    cv.job = randJobTitle();
    cv.age = randNumber({ min: 10, max: 75 });
    cv.path = 'as.jpg';
    cv.user = users[i - 1];
    cv.skills = [];
    for (let i = 0; i < randNumber({ min: 0, max: 9 }); i++) {
      cv.skills.push(skills[i]);
      console.log(cv.skills);
    }
    await cvService.create(cv);
  }
  await app.close();
}
bootstrap();
