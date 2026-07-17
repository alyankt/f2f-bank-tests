import { type Locator, type Page } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;
    readonly name: Locator;
    readonly surname: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly register: Locator;
    readonly errorEmail: Locator;
    readonly titleRegisterToF2FBank: Locator;

    constructor(page: Page) {
        this.page = page;
        this.name = page.locator('[name="name"]');
        this.surname = page.locator('[name="surname"]');
        this.email = page.locator('[name="login"]');
        this.password = page.locator('[name="Type your password"]');
        this.register = page.getByRole('button', { name: 'Register' });
        this.errorEmail = page.getByText('User with this email already');
        this.titleRegisterToF2FBank = page.getByRole('heading', { name: 'Register to F2F Bank' });
    }

    async registerToF2FBank (name: string, surname: string, email: string, password: string) {
        await this.name.fill(name);
        await this.surname.fill(surname);
        await this.email.fill(email);
        await this.password.fill(password);
        await this.register.click();
    }

}