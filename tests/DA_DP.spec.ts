import { test, expect, Locator } from '@playwright/test';
import users from '../fixture/data/users.json';
import LoginPage from '../pages/login-page.ts';
import DashboardMainPage from '../pages/dashboard-main-page.ts';
import PanelPage from '../pages/profiles.ts';


test('Verify that all Pre-set Data Profiles are populated correctly.', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const panelPage = new PanelPage(page);

    // Navigate to Dashboard login page
    await loginPage.open();
    // Enter username and password
    // Click on "Login" button
    await loginPage.login(users.adminUser.username, users.adminUser.password, "SampleRepository");
    await loginPage.login(users.adminUser.username, users.adminUser.password, "SampleRepository");
    await loginPage.login(users.adminUser.username, users.adminUser.password, "SampleRepository");

    await dashboardMainPage.openProfilesPage();
    await dashboardMainPage.checkDataProfile();


});

test('Verify that Data Profiles are listed alphabetically', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const panelPage = new PanelPage(page);

    // Navigate to Dashboard login page
    await loginPage.open();
    // Enter username and password
    // Click on "Login" button
    await loginPage.login(users.adminUser.username, users.adminUser.password, "SampleRepository");
    await loginPage.login(users.adminUser.username, users.adminUser.password, "SampleRepository");
    await loginPage.login(users.adminUser.username, users.adminUser.password, "SampleRepository");

    await dashboardMainPage.openProfilesPage();
    await dashboardMainPage.verifyTableSort();


});
test('Verify that user is able to add levels of fields ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardMainPage = new DashboardMainPage(page);
    const panelPage = new PanelPage(page);
    const field1: string = "名前";
    const field2: string = "場所";

    // Navigate to Dashboard login page
    await loginPage.open();
    // Enter username and password
    // Click on "Login" button
    await loginPage.login(users.adminUser.username, users.adminUser.password, "SampleRepository");
    await loginPage.login(users.adminUser.username, users.adminUser.password, "SampleRepository");
    await loginPage.login(users.adminUser.username, users.adminUser.password, "SampleRepository");

    //Navigate to Data Profiles page
    await dashboardMainPage.openProfilesPage();
    //Click on "Add New"
    await panelPage.openAddNewPanel();
    //Input to "Name *" field
    await panelPage.GeneralSettings('test1');
    //Navigate to Sort Fields page
    //Select an item
    //Click on "Add Level" button
    await panelPage.sortFieldsLink.click();
    await panelPage.addSortFields(field1);
    //Check this item is added to the sorting criteria list
    await panelPage.verifysortFields(field1);
    //Click on "Field" dropped down menu
    //Select another item
    //Click on "Add Level" button
    await panelPage.addSortFields(field2);
    //Check this item is added to the sorting criteria list
    await panelPage.verifysortFields(field2);

});