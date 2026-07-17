import { test, expect } from '@playwright/test';

import { registerNewUser } from '../helpers/register-user';
import { LoginPage } from '../pages/login.page';
import { MainPage } from '../pages/main.page';
import { ProfilePage } from '../pages/profile.page';
import { RegisterPage } from '../pages/register.page';

let loginPage: LoginPage;
let mainPage: MainPage;
let profilePage: ProfilePage;
let registerPage: RegisterPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);
    profilePage = new ProfilePage(page);
    registerPage =  new RegisterPage(page);
    await loginPage.open();
});

test('Проверка информации профиля', async () => {
    const user = await registerNewUser(loginPage, registerPage);

    await expect(loginPage.titleLoginToF2FBank).toBeVisible();

    await loginPage.loginToF2FBank(user.email, user.password);

    await mainPage.profileButton.click();

    await profilePage.profileInformation(user.name, user.surname, user.email,);
});