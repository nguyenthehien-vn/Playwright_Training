import { test, expect, Locator } from '@playwright/test';
import users from '../fixture/data/users.json';
import LoginPage from '../pages/login-page.ts';



test('Verify that user can login specific repository successfully via Dashboard login page with correct credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const verifyDialogMessage: string = 'Username or password is invalid';
    // Navigate to Dashboard login page
    await loginPage.open();
    // Enter valid username and password
    // Click on "Login" button
    await loginPage.login(users.validUser.username, users.validUser.password);
    await new Promise(r => setTimeout(r, 2000));

    //Verify that Dashboard Error message
    page.on('dialog', async dialog => {
        expect(dialog.message()).toBe(verifyDialogMessage);
        await dialog.accept();
    });

    await loginPage.login(users.validUser.username, users.validUser.password);
    await loginPage.disverifyLoginPageDisplay(true);
});
