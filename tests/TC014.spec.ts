import { test, expect, Locator } from '@playwright/test';
import users from '../fixture/data/users.json';
import LoginPage from '../pages/login-page.ts';
import DashboardMainPage from '../pages/dashboard-main-page.ts';

test('Verify that "Public" pages can be visible and accessed by all users of working repository', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const pageName = 'Name';
    const ParentPage = "Overview";
    const VerifyDialogMessage = "Are you sure you want to remove this page";
    // Navigate to Dashboard login page
    await loginPage.open();
    // Enter username and password
    // Click on "Login" button
    await loginPage.login(users.adminUser.username, users.adminUser.password);
    await loginPage.login(users.adminUser.username, users.adminUser.password);
    await loginPage.login(users.adminUser.username, users.adminUser.password);
    // Verify that Dashboard Mainpage appears
    await dashboardMainPage.displays();
    // Go to Global Setting -> Add page
    await dashboardMainPage.globalSetting("Add Page");
    // Enter Page Name field
    // Check Public checkbox
    // Click OK button
    await dashboardMainPage.createPage(pageName, ParentPage);
    //delete created page
    //Delete page then verify dialog messages
    await dashboardMainPage.deletePageAndVerifyDialogMessage(VerifyDialogMessage);
    await dashboardMainPage.deletePage();
});