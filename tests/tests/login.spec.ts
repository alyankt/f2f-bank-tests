import { test, expect } from '@playwright/test';

import { registerNewUser } from '../helpers/register-user';
import { LoginPage } from '../pages/login.page';
import { MainPage } from '../pages/main.page';
import { RegisterPage } from '../pages/register.page';

let loginPage: LoginPage;
let mainPage: MainPage;
let registerPage: RegisterPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);
    registerPage = new RegisterPage(page);
    await loginPage.open();
});

test('Вход в аккаунт c валидной почтой и паролем', async ({ page }) => {
    const user = await registerNewUser(loginPage, registerPage);
    
    await expect(loginPage.titleLoginToF2FBank).toHaveText('Login to F2F Bank');
    await loginPage.loginToF2FBank(user.email, user.password);
    await expect(mainPage.titleMain).toBeVisible();
});

test('Вход в аккаунт c неверной почтой', async ({ page }) => {
    const user = await registerNewUser(loginPage, registerPage);
    
    await expect(loginPage.titleLoginToF2FBank).toHaveText('Login to F2F Bank');
    await loginPage.loginToF2FBank('nyam@mail.ru', user.password);
    await expect(page.getByText('Login failed')).toBeVisible();
});

test('Вход в аккаунт c неверным паролем', async ({ page }) => {
    const user = await registerNewUser(loginPage, registerPage);
    
    await expect(loginPage.titleLoginToF2FBank).toHaveText('Login to F2F Bank');
    await loginPage.loginToF2FBank(user.email, '123');
    await expect(page.getByText('Login failed')).toBeVisible();
});

test('Вход в аккаунт без почты', async ({ page }) => {
    const user = await registerNewUser(loginPage, registerPage);

    await expect(loginPage.titleLoginToF2FBank).toHaveText('Login to F2F Bank');
    
    await loginPage.loginToF2FBank('', user.password);
    await expect(loginPage.titleLoginToF2FBank).toBeVisible();
});

test('Вход в аккаунт без пароля', async ({ page }) => {
    const user = await registerNewUser(loginPage, registerPage);
    
    await expect(loginPage.titleLoginToF2FBank).toHaveText('Login to F2F Bank');
    await loginPage.loginToF2FBank(user.email, '');
    await expect(loginPage.titleLoginToF2FBank).toBeVisible();
});
