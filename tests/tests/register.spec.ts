import { test, expect } from '@playwright/test';

import { registerNewUser } from '../helpers/register-user';
import { users } from '../constants/users';
import { RegisterPage } from '../pages/register.page';
import { LoginPage } from '../pages/login.page';
import { MainPage } from '../pages/main.page';

let registerPage: RegisterPage;
let loginPage: LoginPage;
let mainPage: MainPage;

test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);
    await loginPage.open();
});

test('Регистрация аккаунта', async () => {
    const user = await registerNewUser(loginPage, registerPage);

    await expect(loginPage.titleLoginToF2FBank).toBeVisible();
});

test('Регистрация аккаунта c зарегестрированной почтой в системе', async () => {
    const user = await registerNewUser(loginPage, registerPage);

    await expect(loginPage.titleLoginToF2FBank).toBeVisible();

    await loginPage.registerPage.click();
    await registerPage.registerToF2FBank(user.name, user.surname, user.email, user.password);

    await expect(registerPage.errorEmail).toBeVisible();
});

test('Регистрация аккаунта вообще без данных', async ({ page }) => {
    await loginPage.registerPage.click();
    await registerPage.register.click();
    await expect(registerPage.titleRegisterToF2FBank).toBeVisible();
});

test('Регистрация аккаунта без имени', async ({ page }) => {
    await loginPage.registerPage.click();
    await registerPage.surname.fill(users.user1.surname)
    await registerPage.email.fill(users.user1.email)
    await registerPage.password.fill(users.user1.password)
    await registerPage.register.click();
    await expect(registerPage.titleRegisterToF2FBank).toBeVisible();
});

test('Регистрация аккаунта без фамилии', async ({ page }) => {
    await loginPage.registerPage.click();
    await registerPage.name.fill(users.user1.name)
    await registerPage.email.fill(users.user1.email)
    await registerPage.password.fill(users.user1.password)
    await registerPage.register.click();
    await expect(registerPage.titleRegisterToF2FBank).toBeVisible();
});

test('Регистрация аккаунта без почты', async ({ page }) => {
    await loginPage.registerPage.click();
    await registerPage.name.fill(users.user1.name)
    await registerPage.surname.fill(users.user1.surname)
    await registerPage.password.fill(users.user1.password)
    await registerPage.register.click();
    await expect(registerPage.titleRegisterToF2FBank).toBeVisible();
});

test('Регистрация аккаунта без пароля', async ({ page }) => {
    await loginPage.registerPage.click();
    await registerPage.name.fill(users.user1.name)
    await registerPage.surname.fill(users.user1.surname)
    await registerPage.email.fill(users.user1.email)
    await registerPage.register.click();
    await expect(registerPage.titleRegisterToF2FBank).toBeVisible();
});