import React from 'react'
import {faker} from '@faker-js/faker'
import { UsersProps } from './typings';


function getUserStoriesData(): UsersProps  {
    const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });
  const fullName = firstName + " " + lastName;

  return {
    _id: faker.string.uuid(),
    avatar: faker.image.avatar(),
    email,
    fullName,
    sex,
  };
}

export function generateUsersData (length:number): UsersProps[] {
   return Array.from({ length: length }, () => getUserStoriesData());
}