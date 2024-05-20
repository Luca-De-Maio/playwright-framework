export class MyAccountPage {
    constructor(page) {
        this.page = page
        this.accountTitle = page.getByRole('heading', {name: 'My account'})
    }

    async visit() {
        await this.page.goto('/my-account')
    }

    async waitForPageHeading() {
        await this.accountTitle.waitFor()
    }
}