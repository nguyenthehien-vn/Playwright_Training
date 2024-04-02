import { Locator, Page, expect } from "@playwright/test";
import { promises } from "dns";
export default class PanelPage {
  readonly addNewPanelBtn: Locator = this.page.getByText('Add New');
  readonly deletePanelBtn: Locator = this.page.locator("a[href = 'javascript:Dashboard.deletePanels();']");
  readonly addNewPanelTitle: Locator = this.page.getByText('Add New Panel');
  readonly txtDisplayName: Locator = this.page.locator('#txtProfileName');
  readonly itemTypeSelect: Locator = this.page.locator('#cbbEntityType');
  readonly relatedDataSelect: Locator = this.page.locator('#cbbSubReport');
  readonly nextBtn: Locator = this.page.getByRole("button", { name: 'Next' });
  readonly addNewTable: Locator = this.page.locator('#wstep');
    readonly fieldSelect: Locator = this.page.locator("#cbbFields");
  readonly addLevelBtn: Locator = this.page.locator("#btnAddSortField");
  readonly fieldName: Locator = this.page.locator("#profilesettings").locator(".sortFieldName");
  readonly sortFieldsLink: Locator = this.page.getByRole('listitem').filter({hasText: 'Sort Field'});
  constructor(private readonly page: Page) { }

  async openAddNewPanel(): Promise<void> {
    await this.addNewPanelBtn.click();
  }
  async GeneralSettings(name: string, item?: string, related?: string): Promise<void> {
    await this.txtDisplayName.fill(name);
    if (item != null) await this.itemTypeSelect.selectOption(item);
    if (related != null) await this.relatedDataSelect.selectOption(related);
    await this.nextBtn.click();

  }
  async addSortFields(field: string): Promise<void> {
    
      await this.fieldSelect.selectOption(field);
      await this.addLevelBtn.click();
  
    
    
  }
  async verifysortFields(fieldName: string): Promise<void> {
    await (this.page.locator("//span[@class = 'sortFieldName' and text()='" + fieldName + "']").isVisible());
  }
}