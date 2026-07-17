import { type Locator, type Page } from '@playwright/test';

export class TransactionsPage {
    readonly page: Page;
    readonly addBalanceButton: Locator;
    readonly addButton: Locator;
    readonly cancelButton: Locator;
    readonly titleTransactions: Locator;
    readonly enterSum: Locator;
    readonly addBalanceHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addBalanceButton = page.getByRole('button', { name: 'Add balance' });
        this.addButton = page.getByRole('button', { name: 'Add', exact: true });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.titleTransactions = page.getByRole('heading', { name: 'Transactions' });
        this.enterSum = page.locator('[name="balance"]');
        this.addBalanceHeader = page.getByRole('heading', { name: 'Add balance' });
    }

   async addBalance(sum: string) {
        await this.addBalanceButton.click();
        await this.enterSum.fill(sum);
        await this.addButton.click();
    }
}
