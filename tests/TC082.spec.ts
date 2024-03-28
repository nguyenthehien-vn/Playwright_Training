import { test, expect, Locator } from '@playwright/test';
import users from '../fixture/data/users.json';
import LoginPage from '../pages/login-page.ts';
import DashboardMainPage from '../pages/dashboard-main-page.ts';
import PanelPage from '../pages/profiles.ts';
import { profile } from 'console';


test('Verify that when "Add New Panel" form is on focused all other control/form is disabled or locked.', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const panelPage = new PanelPage(page);
    const field1: string = ":name";
    const field2: string = ":location";

    // Navigate to Dashboard login page
    await loginPage.open();
    // Enter username and password
    // Click on "Login" button
    await loginPage.login(users.adminUser.username, users.adminUser.password, "SampleRepository");
    await loginPage.login(users.adminUser.username, users.adminUser.password, "SampleRepository");
    await loginPage.login(users.adminUser.username, users.adminUser.password, "SampleRepository");

    await dashboardMainPage.openProfilesPage();
    await panelPage.openAddNewPanel();
    await panelPage.GeneralSettings('test1');
    await panelPage.addSortFields(field1);
    await panelPage.verifysortFields(field1);
    await panelPage.addSortFields(field2);
    await panelPage.verifysortFields(field2);

});