import { test, expect } from '@playwright/test';

import { registerNewUser } from '../helpers/register-user';
import { LoginPage } from '../pages/login.page';
import { MainPage } from '../pages/main.page';
import { TransactionsPage } from '../pages/transactions.page';
import { ProfilePage } from '../pages/profile.page';
import { RegisterPage } from '../pages/register.page';

let loginPage: LoginPage;
let mainPage: MainPage;
let transactionPage: TransactionsPage;
let profilePage: ProfilePage;
let registerPage: RegisterPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);
    transactionPage = new TransactionsPage(page);
    profilePage = new ProfilePage(page);
    registerPage = new RegisterPage(page);
    await loginPage.open();
});

test('Выход из аккаунта', async ({ page }) => {
    const user = await registerNewUser(loginPage, registerPage);
    
    await expect(loginPage.titleLoginToF2FBank).toHaveText('Login to F2F Bank');
    await loginPage.loginToF2FBank(user.email, user.password);
    await expect(page).toHaveURL(/localhost/);

    await page.getByRole('button').filter({ hasText: /^$/ }).click();
    await expect(page).toHaveURL(/login/);
    await expect(loginPage.titleLoginToF2FBank).toHaveText('Login to F2F Bank');
});

test('Успешный перевод средств', async ({ page }) => {
    const user = await registerNewUser(loginPage, registerPage);
    
    await expect(loginPage.titleLoginToF2FBank).toHaveText('Login to F2F Bank');
    await loginPage.loginToF2FBank(user.email, user.password);
    await expect(page).toHaveURL(/localhost/);

    await mainPage.transactionsButton.click();
    await transactionPage.addBalance('500');
    await mainPage.mainButton.click();

    await mainPage.transferByPhoneNumber('+7 999 123-45-67', '500', 'rent payment');
    await expect(page.getByText('Transfer completed', { exact: true })).toBeVisible();
    
});

test('Перевод средств при недостаточном балансе', async ({ page }) => {
    const user = await registerNewUser(loginPage, registerPage);
    
    await expect(loginPage.titleLoginToF2FBank).toBeVisible();

    await expect(loginPage.titleLoginToF2FBank).toHaveText('Login to F2F Bank');
    await loginPage.loginToF2FBank(user.email, user.password);
    await expect(page).toHaveURL(/localhost/);

    await mainPage.transferByPhoneNumber('+7 999 123-45-67', '99999999999', 'rent payment');
    await expect(page.getByText('Transfer failed. Check your')).toBeVisible();
    
});

test('Перевод при невалидной сумме', async ({ page }) => {
    const user = await registerNewUser(loginPage, registerPage);
    
    await expect(loginPage.titleLoginToF2FBank).toBeVisible();
    
    await expect(loginPage.titleLoginToF2FBank).toHaveText('Login to F2F Bank');
    await loginPage.loginToF2FBank(user.email, user.password);
    await expect(page).toHaveURL(/localhost/);

    await mainPage.transferByPhoneNumber('+7 999 123-45-67', '0', 'rent payment');
    await expect(page.getByText('Amount must be greater than')).toBeVisible();
});

test('Ввод невалидного телефона', async ({ page }) => {
    const user = await registerNewUser(loginPage, registerPage);
    
    await expect(loginPage.titleLoginToF2FBank).toBeVisible();
    
    await expect(loginPage.titleLoginToF2FBank).toHaveText('Login to F2F Bank');
    await loginPage.loginToF2FBank(user.email, user.password);
    await expect(page).toHaveURL(/localhost/);

    await mainPage.transferByPhoneNumber('7777', '500', 'rent payment');
    await expect(page.getByText('Must start with + and country')).toBeVisible();
});

test('Отмена перевода средств', async ({ page }) => {
    const user = await registerNewUser(loginPage, registerPage);
    
    await expect(loginPage.titleLoginToF2FBank).toBeVisible();
    
    await expect(loginPage.titleLoginToF2FBank).toHaveText('Login to F2F Bank');
    await loginPage.loginToF2FBank(user.email, user.password);
    await expect(page).toHaveURL(/localhost/);

    await mainPage.transferByPhoneNumber('7777', '500', 'rent payment');
    await mainPage.cancelButtonMain.click();
    
    await expect(mainPage.phoneNumber).toHaveValue('');
    await expect(mainPage.amount).toHaveValue('');
    await expect(mainPage.paymentPurpose).toHaveValue('');
});

test('Переход на главную страницу через кнопку "New transfer" после перевода ', async ({ page }) => {
    const user = await registerNewUser(loginPage, registerPage);
    
    await expect(loginPage.titleLoginToF2FBank).toHaveText('Login to F2F Bank');
    await loginPage.loginToF2FBank(user.email, user.password);
    await expect(page).toHaveURL(/localhost/);

    await mainPage.transactionsButton.click();
    await transactionPage.addBalance('500');
    await mainPage.mainButton.click();

    await mainPage.transferByPhoneNumber('+7 999 123-45-67', '500', 'rent payment');
    await expect(page.getByText('Transfer completed', { exact: true })).toBeVisible();
    await mainPage.newTransferButton.click();
    await expect(mainPage.titleMain).toBeVisible();
});



