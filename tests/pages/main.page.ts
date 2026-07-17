import { type Locator, type Page } from '@playwright/test';

export class MainPage {
    readonly page: Page;
    readonly titleMain: Locator;
    readonly phoneNumber: Locator;
    readonly amount: Locator;
    readonly paymentPurpose: Locator;
    readonly sendButton: Locator;
    readonly cancelButtonMain: Locator;
    readonly mainButton: Locator;
    readonly profileButton: Locator;
    readonly transactionsButton: Locator;
    readonly newTransferButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleMain = page.getByText('Transfer by phone number');
        this.phoneNumber = page.locator('[name="phone"]');
        this.amount = page.locator('[name="amount"]');
        this.paymentPurpose = page.locator('[name="purpose"]');
        this.sendButton = page.getByRole('button', { name: 'Send' });
        this.cancelButtonMain = page.getByRole('button', { name: 'Cancel' });
        this.mainButton = page.getByRole('link', { name: 'Main' });
        this.profileButton = page.getByRole('link', { name: 'Profile' });
        this.transactionsButton = page.getByRole('link', { name: 'Transactions' });
        this.newTransferButton = page.getByRole('button', { name: 'New transfer' });
    }

    async transferByPhoneNumber(phoneNumber: string, amount: string, paymentPurpose: string) {
        await this.phoneNumber.fill(phoneNumber);
        await this.amount.fill(amount);
        await this.paymentPurpose.fill(paymentPurpose);
        await this.sendButton.click();
    }
}
