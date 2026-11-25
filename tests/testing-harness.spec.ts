import { expect, test } from './fixtures'

test('save an expense category by key', async ({ page, ui }) => {
  await page.goto('/')

  await ui.select({ name: 'Category' }).choose({ key: 'services' })
  await page.getByRole('button', { name: 'Save', exact: true }).click()

  await expect(
    page.getByRole('region', { name: 'Last saved record' }),
  ).toContainText('Services')
})
