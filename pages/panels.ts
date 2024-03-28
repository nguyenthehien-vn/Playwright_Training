import { Page, Locator, expect, test } from "@playwright/test"
import { promises } from "dns";


export default class PanelsPage {

    readonly charts: Locator=this.page.locator(".ptit pchart");
    readonly Indicators: Locator=this.page.locator(".ptit pindicator");
    readonly Reports: Locator=this.page.locator(".ptit preport");

    constructor(private readonly page: Page) { }

    async checkChoosePanelsItem(): Promise<void> {
        await test.step("Verify Choose panels page displays", async () => {
            await this.charts.isVisible();
            await this.charts.isVisible();
            await this.charts.isVisible();

        });
    }




}
;








