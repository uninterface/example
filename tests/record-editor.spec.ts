import { expect, test } from './fixtures'

test('validate, retry and reset an expense draft', async ({ page, ui }) => {
  await page.goto('/')

  const name = page.getByRole('textbox', { name: 'Name' })
  const amount = page.getByRole('textbox', { name: 'Amount (USD)' })
  const save = page.getByRole('button', { name: 'Save', exact: true })
  const saved = page.getByRole('region', { name: 'Last saved record' })
  const failNextSave = page.getByRole('button', { name: 'Fail next save' })
  const nameError = page.getByText('Enter a name.', { exact: true })

  await failNextSave.click()
  await name.fill('')
  await name.press('Tab')
  await expect(nameError).toBeVisible()
  await save.click()
  await expect(name).toBeFocused()
  await expect(nameError).toBeVisible()
  await expect(failNextSave).toHaveAttribute('aria-pressed', 'true')
  await expect(saved).toContainText('Workshop supplies')

  await name.fill('Service visit')
  await amount.fill('12.345')
  await ui.select({ name: 'Category' }).choose({ key: 'services' })
  await ui.checkbox({ name: 'Enabled' }).setChecked(false)
  await save.click()
  await expect(
    page.getByText('The expense could not be saved. Try again.'),
  ).toBeVisible()
  await expect(name).toHaveValue('Service visit')
  await expect(amount).toHaveValue('12.35')
  await expect(saved).toContainText('$125.00')

  await save.click()
  await expect(page.getByText('Expense saved.', { exact: true })).toBeVisible()
  await expect(saved).toContainText('Service visit')
  await expect(saved).toContainText('$12.35')
  await expect(saved).toContainText('Services')
  await expect(saved).toContainText('No')

  await name.fill('Unsaved edit')
  await page.getByRole('button', { name: 'Reset' }).click()
  await expect(name).toHaveValue('Service visit')
})
