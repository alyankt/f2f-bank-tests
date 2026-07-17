import { test, expect } from '@playwright/test';

import { registerNewUser } from '../helpers/register-user';
import { LoginPage } from '../pages/login.page';
import { MainPage } from '../pages/main.page';
import { TransactionsPage } from '../pages/transactions.page';
import { RegisterPage } from '../pages/register.page';

let loginPage: LoginPage;
let mainPage: MainPage;
let transactionPage: TransactionsPage;
let registerPage: RegisterPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    mainPage = new MainPage(page);
    transactionPage = new TransactionsPage(page);
    registerPage = new RegisterPage(page);
    await loginPage.open();
});

test('Пополнение своего баланса', async ({ page }) => {
    const user = await registerNewUser(loginPage, registerPage);
        
    await expect(loginPage.titleLoginToF2FBank).toHaveText('Login to F2F Bank');
    await loginPage.loginToF2FBank(user.email, user.password);
    await expect(page).toHaveURL(/localhost/);

    await mainPage.transactionsButton.click();
    await transactionPage.addBalance('500');
    await expect(transactionPage.titleTransactions).toBeVisible();
});

test('Отмена пополнения баланса', async ({ page }) => {
    const user = await registerNewUser(loginPage, registerPage);
        
    await expect(loginPage.titleLoginToF2FBank).toHaveText('Login to F2F Bank');
    await loginPage.loginToF2FBank(user.email, user.password);
    await expect(page).toHaveURL(/localhost/);

    await mainPage.transactionsButton.click();
    await transactionPage.addBalanceButton.click();
    await transactionPage.cancelButton.click();
    await expect(transactionPage.titleTransactions).toBeVisible();
});

test('Пополнение своего баланса с невалидными данными', async ({ page }) => {
    const user = await registerNewUser(loginPage, registerPage);
        
    await expect(loginPage.titleLoginToF2FBank).toHaveText('Login to F2F Bank');
    await loginPage.loginToF2FBank(user.email, user.password);
    await expect(page).toHaveURL(/localhost/);

    await mainPage.transactionsButton.click();
    await transactionPage.addBalance('0');
    await expect(transactionPage.addBalanceHeader).toBeVisible();
});

test('Пополнение своего баланса без ввода суммы', async ({ page }) => {
    const user = await registerNewUser(loginPage, registerPage);
        
    await expect(loginPage.titleLoginToF2FBank).toHaveText('Login to F2F Bank');
    await loginPage.loginToF2FBank(user.email, user.password);
    await expect(page).toHaveURL(/localhost/);

    await mainPage.transactionsButton.click();
    await transactionPage.addBalance('');
    await transactionPage.addButton.click();
    await expect(transactionPage.addBalanceHeader).toBeVisible();
});

test('Отмена пополнения своего баланса без ввода суммы', async ({ page }) => {
    const user = await registerNewUser(loginPage, registerPage);
        
    await expect(loginPage.titleLoginToF2FBank).toHaveText('Login to F2F Bank');
    await loginPage.loginToF2FBank(user.email, user.password);
    await expect(page).toHaveURL(/localhost/);

    await mainPage.transactionsButton.click();
    await transactionPage.addBalance('');
    await transactionPage.cancelButton.click();
    await expect(transactionPage.titleTransactions).toBeVisible();
});