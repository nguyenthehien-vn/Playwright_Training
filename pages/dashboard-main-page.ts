import { Page, Locator, expect, test } from "@playwright/test"
import users from '../fixture/data/users.json';


export default class DashboardMainPage {
    private readonly gbsetting: Locator = this.page.locator("#main-menu");
    readonly btnaddPage: Locator = this.gbsetting.locator(".mn-setting");
    private readonly pageNameTxt: Locator = this.page.locator(".page_txt_name");
    private readonly pageParentselect: Locator = this.page.locator("#parent");
    private readonly pagePublicCheckbox: Locator = this.page.locator("#ispublic");
    private readonly pageOkBtn: Locator = this.page.locator("#OK");
    readonly deleteBtn: Locator = this.gbsetting.locator(".delete");
    readonly ChoosePanelsBtn: Locator = this.page.locator("#btnChoosepanel");
    readonly administer: Locator = this.page.getByText('Administer');
    readonly profileBtn: Locator = this.page.locator("a[href ='profiles.jsp']");
    readonly accountBtn: Locator = this.page.locator("a[href ='#Welcome']");
    readonly logoutBtn: Locator = this.page.getByText('Logout');
    readonly displayNameCp: Locator = this.page.locator('#txtDisplayName');
    readonly seriesSelect: Locator = this.page.locator('#cbbSeriesField');
    readonly panelOkbtn: Locator = this.page.locator('//div[@id="div_panelConfigurationDlg"]//input[@id="OK"]');
    readonly panelLink: Locator = this.page.locator("a[href ='panels.jsp']");
    
    constructor(private readonly page: Page) { }

    async displays(): Promise<void> {
        await test.step("Verify dashboard main page displays", async () => {
            await expect(this.page).toHaveTitle(/Execution Dashboard/);
        });
    }

    async globalSetting(action: string): Promise<void> {
        await test.step("select action", async () => {
            await this.btnaddPage.hover();
            await this.btnaddPage.getByText(action).click();

        })
    }

    async slectPage(pageName: string): Promise<void> {
        await test.step("select page", async () => {
            await this.page.getByRole("link", { name: pageName }).click();

        })
    }

    async createPage(pageName: string, parentPage?: string): Promise<void> {
        await this.pageNameTxt.fill(pageName);
        if (parentPage != null && parentPage != undefined) await this.pageParentselect.selectOption(parentPage);
        await this.pagePublicCheckbox.click();
        await this.pageOkBtn.click();
    }

    async deletePage(pageName?: string): Promise<void> {
        await test.step("select action", async () => {
            if (pageName != null) await this.gbsetting.getByRole("link", { name: pageName }).click();
            await this.gbsetting.click();
            await this.btnaddPage.hover();
            await this.deleteBtn.click();

        })
    }

    async deletePageAndVerifyDialogMessage(verifyDialogMessage: string): Promise<void> {
        await test.step("Delete page then verify dialog messages", async () => {
            this.page.on("dialog", async (dialog) => {
                expect.soft(dialog.message()).toContain(verifyDialogMessage);
                await dialog.accept();
            })
        });
    }

    async checkDisplayPageorNot(pagename: string, status: boolean): Promise<void> {
        await test.step("Check whether the new page is displayed or not", async () => {
            if (status == true) {
                await expect(this.gbsetting.getByRole("link", { name: pagename })).toBeVisible();
            } else {
                await expect(this.gbsetting.getByRole("link", { name: pagename })).toBeHidden();
            }
        })
    };
    async openProfilesPage(): Promise<void> {
        await test.step("Open frofiles page", async () => {
            await this.administer.click();
            await this.profileBtn.click();
        });
    }
    async logout(): Promise<void> {
        await this.accountBtn.hover();
        await this.logoutBtn.click();
    }
    async createPanel(displayName: string, series: string): Promise<void> {
        await this.displayNameCp.fill(displayName);
        await this.seriesSelect.selectOption(series);
        await this.pageOkBtn.click();
        await this.panelOkbtn.click();
    }
    async VerifyAllPresetPanels(): Promise<void> {
        await test.step("verify charts,Indicators,Reports,Heat Maps", async () => {
            for (let i = 0; i < users.ChoosePanels.length - 1; i++) {
                await this.page.getByText(users.ChoosePanels[i])
            }

        })
    }

    async slectPanelsandAddNewPange(action?: string): Promise<void> {
        await this.administer.hover();
        await this.panelLink.click();
        if (action != null) await this.page.getByRole("link", { name: action }).click();
    }
    async checkDataProfile(): Promise<void> {
        for (let i = 0; i < users.DataProfile.length - 1; i++) {
            await this.page.getByText(users.DataProfile[i])
        }
    }
    async verifyTableSort(): Promise<void> {
        const table = await this.page.$("xpath=//table[@class='GridView']");
        const tdElements = await table?.$$eval('td', tds => tds.map(td => td.textContent));
        const tdElementsSort = tdElements?.slice().sort();
        console.log(tdElements);
        console.log(tdElementsSort);
        const isSorted = JSON.stringify(tdElements) === JSON.stringify(tdElementsSort);
        console.log(isSorted);
    }
    

}









