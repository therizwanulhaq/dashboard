import { faker, simpleFaker } from "@faker-js/faker";

export function generateUsers(count = 100) {
  return Array.from({ length: count }, () => ({
    id: simpleFaker.string.uuid(),
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    avatar: faker.image.avatar(), // Explicitly generate the avatar
    status: faker.helpers.arrayElement(["Active"]),
    role: faker.person.jobTitle(),
    email: faker.internet.email(),
    teams: faker.helpers.arrayElements(
      ["Design", "Product", "Marketing", "Engineering"],
      3
    ),
  }));
}
