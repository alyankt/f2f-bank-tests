import { type Locator, type Page, expect } from '@playwright/test';

export class ProfilePage {
    readonly page: Page;
    readonly nameProfile: Locator;
    readonly surnameProfile: Locator;
    readonly emailProfile: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameProfile = page.locator('.profile__info p').filter({ has: page.getByText('Name:', { exact: true }) });
        this.surnameProfile = page.locator('.profile__info p').filter({ has: page.getByText('Surname:', { exact: true }) });
        this.emailProfile = page.locator('.profile__info p').filter({ has: page.getByText('Email:', { exact: true }) });
    }

    async profileInformation(nameProfile: string, surnameProfile: string, emailProfile: string) {
        await expect(this.nameProfile).toHaveText(`Name: ${nameProfile}`);
        await expect(this.surnameProfile).toHaveText(`Surname: ${surnameProfile}`);
        await expect(this.emailProfile).toHaveText(`Email: ${emailProfile}`);
    }
}