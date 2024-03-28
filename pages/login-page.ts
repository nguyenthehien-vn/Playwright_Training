import { Page, Locator, expect, test } from "@playwright/test"

export default class LoginPage {
    private readonly repoCbx: Locator = this.page.locator("#repository");
    private readonly usernameTxt: Locator = this.page.getByRole("textbox", { name: "username" });
    private readonly passwordTxt: Locator = this.page.getByRole("textbox", { name: "password" });
    private readonly loginBtn: Locator = this.page.locator(".btn-login");

    constructor(private readonly page: Page) { }

    async open(): Promise<void> {
        await this.page.goto("http://192.168.188.72//TADashboard/login.jsp");
    }

    async login(username: string, password: string, repo?: string): Promise<void> {
        await test.step('test login', async () => {
            if (repo !== null && repo !== undefined) await this.repoCbx.selectOption(repo);
            await this.usernameTxt.fill(username);
            await this.passwordTxt.fill(password);
            await this.loginBtn.click();

        })}

    async disverifyLoginPageDisplay(action:boolean){
           if(action==true) {await expect(this.usernameTxt).toBeVisible();
                           await expect(this.passwordTxt).toBeVisible();}
            else{await expect(this.usernameTxt).toBeHidden();
                await expect(this.passwordTxt).toBeHidden();}
            }              
        }
    
;
