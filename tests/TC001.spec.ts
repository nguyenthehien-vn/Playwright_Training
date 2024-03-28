import { test, expect, Locator } from '@playwright/test';
import users from '../fixture/data/users.json';
import LoginPage from '../pages/login-page.ts';
import DashboardMainPage from '../pages/dashboard-main-page.ts';


test('Verify that user can login specific repository successfully via Dashboard login page with correct credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
      // Navigate to Dashboard login page
    await loginPage.open();
    // Enter username and password
    // Click on "Login" button
    await loginPage.login(users.adminUser.username, users.adminUser.password);
    await new Promise(r => setTimeout(r, 2000));
    await loginPage.login(users.adminUser.username, users.adminUser.password);
    // Verify that Dashboard Mainpage appears
    await dashboardMainPage.displays();
    

});

