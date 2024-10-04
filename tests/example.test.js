import { test, expect } from "playwright-test-coverage";

test("home page", async ({ page }) => {
  await page.goto("/");

  expect(await page.title()).toBe("JWT Pizza");
});

test("test registar", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Register" }).click();
  await page.getByPlaceholder("Full name").fill("matt");
  await page.getByPlaceholder("Full name").press("Tab");
  await page.getByPlaceholder("Email address").fill("a@a.com");
  await page.getByPlaceholder("Email address").press("Tab");
  await page.getByPlaceholder("Password").fill("1234");
  await page.getByRole("button", { name: "Register" }).click();
  await expect(
    page.getByText("The web's best pizza", { exact: true })
  ).toBeVisible();
  await page.getByRole("link", { name: "m", exact: true }).click();
  await expect(page.getByText("matt")).toBeVisible();
  await page.goto('/logout');
});

test("franchise page", async ({ page }) => {
  await page.goto("/");
  await page
    .getByLabel("Global")
    .getByRole("link", { name: "Franchise" })
    .click();
  await expect(page.getByText("So you want a piece of the")).toBeVisible();
});

test("buy pizza", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Login" }).click();
  await page.getByPlaceholder("Email address").fill("demo@jwt.com");
  await page.getByPlaceholder("Email address").press("Tab");
  await page.getByPlaceholder("Password").fill("d");
  // await wait(400);
  await page.getByRole("button", { name: "Login" }).click();
  await wait(800);
  await page.goto("/menu");
  await page.getByRole("link", { name: "Image Description Veggie A" }).click();
  await page.getByRole('combobox').selectOption('20');
  await page.getByRole("button", { name: "Checkout" }).click();
  await page.getByRole("button", { name: "Pay now" }).click();
});

function wait(mil = 1) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(1);
    }, mil);
  });
}

test("failed login", async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('what@m.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('1231231');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('{"code":404,"message":"')).toBeVisible();
});

test("docs history and about page", async ({ page }) => {
  await page.goto('/about');
  await expect(page.getByText('The secret sauce')).toBeVisible();
  await page.goto('/history');
  await expect(page.getByText('Mama Rucci, my my')).toBeVisible();
  await page.goto('/docs');
  await expect(page.getByText('JWT Pizza API')).toBeVisible();
  await page.goto('/notFound');
  await expect(page.getByText('Oops')).toBeVisible();
});

test('access restricted',async ({ page }) => {
  await page.goto('/adminDashboard');
  await expect(page.getByText('Oops')).toBeVisible();
  await page.goto('/closeFranchise');
  await expect(page.getByText('Oops')).toBeVisible();
  await page.goto('/closeStore');
  await expect(page.getByText('Oops')).toBeVisible();
  await page.goto('/createFranchise');
  await expect(page.getByText('Oops')).toBeVisible();
  await page.goto('/createStore');
  await page.goto('http://localhost:5173/createStore');
  await expect(page.getByText('Oops')).toBeVisible();
});

test('test admin pages',async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email address').fill('southwickmatthias@gmail.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('abc123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Admin' }).click();
  await expect(page.getByText('Mama Ricci\'s kitchen')).toBeVisible();
  await page.getByRole('button', { name: 'Add Franchise' }).click();
  await page.getByPlaceholder('franchise name').click();
  await page.getByPlaceholder('franchise name').click();
  await page.getByPlaceholder('franchise name').fill('a');
  await page.getByPlaceholder('franchisee admin email').click();
  await expect(page.getByText('Create franchise', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByPlaceholder('franchise name').click();
  await page.getByPlaceholder('franchise name').fill('av');
  await page.getByPlaceholder('franchisee admin email').fill('southwickmatthias@gmail.com');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('row', { name: 'av Matthias Close' }).getByRole('button').click();
  await expect(page.getByText('Sorry to see you go')).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page.getByText('The web\'s best pizza', { exact: true })).toBeVisible();
});