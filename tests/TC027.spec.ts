import { test, expect, Locator } from '@playwright/test';
import users from '../fixture/data/users.json';
import LoginPage from '../pages/login-page.ts';
import DashboardMainPage from '../pages/dashboard-main-page.ts';
import PanelsPage from '../pages/panels.ts';

test('Verify that user can remove any main parent page except "Overview" page successfully and the order of pages stays persistent as long as there is not children page under it', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const panelsPage = new PanelsPage(page);
    const pageName = "Page 1";
    const displayName = "zbox";
    const series = "name";
    const VerifyDialogMessage = "Are you sure you want to remove this page";


    // Navigate to Dashboard login page
    await loginPage.open();
    // Enter username and password
    // Click on "Login" button
    await loginPage.login(users.adminUser.username, users.adminUser.password, "SampleRepository");
    await loginPage.login(users.adminUser.username, users.adminUser.password, "SampleRepository");
    await loginPage.login(users.adminUser.username, users.adminUser.password, "SampleRepository");
    await dashboardMainPage.globalSetting("Add Page");
    await dashboardMainPage.createPage(pageName);
    await dashboardMainPage.globalSetting("Create Panel");
    await dashboardMainPage.createPanel(displayName, series);

    await (dashboardMainPage.ChoosePanelsBtn).click();
    await panelsPage.checkChoosePanelsItem();
    await dashboardMainPage.VerifyAllPresetPanels();
    await dashboardMainPage.deletePageAndVerifyDialogMessage(VerifyDialogMessage);
    await dashboardMainPage.deletePage(pageName);

});