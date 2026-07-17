import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly login: Locator;
    readonly registerPage: Locator;
    readonly titleLoginToF2FBank: Locator;

    constructor(page: Page) {
        this.page = page;
        this.email = page.locator('[name="email"]');
        this.password = page.locator('[name="password"]');
        this.login = page.getByRole('button', { name: 'Login' });
        this.registerPage = page.locator('[href="/register"]');
        this.titleLoginToF2FBank = page.getByRole('heading', { name: 'Login to F2F Bank' });
    }

    async open() {
        await this.page.goto('http://localhost/')
    }

    async registration() {
        await this.registerPage.click();
    }

    async loginToF2FBank(email: string, password: string) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.login.click();
    }
}