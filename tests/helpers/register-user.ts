import { LoginPage } from '../pages/login.page';
import { RegisterPage } from '../pages/register.page';

export async function registerNewUser(
  loginPage: LoginPage,
  registerPage: RegisterPage,
) {
  const id = `${Date.now()}${Math.floor(Math.random() * 1_000_000)}`;

  const user = {
    name: `User${id}`,
    surname: `Surname${id}`,
    email: `user${id}@mail.ru`,
    password: `A1pass${id}`,
  };

  await loginPage.registerPage.click();

  await registerPage.registerToF2FBank(
    user.name,
    user.surname,
    user.email,
    user.password,
  );

  return user;
}