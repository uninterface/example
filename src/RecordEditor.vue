<script setup lang="ts">
  import { onUnmounted } from 'vue'
  import {
    createUiEntryControl,
    createUiFieldControl,
    createUiFormControl,
    createUiNumberCodec,
    type UiCodec,
    UiButton,
    UiCheckbox,
    UiField,
    UiForm,
    UiLayout,
    UiNotice,
    UiSelect,
    UiTextInput,
  } from '@uninterface/uninterface'
  import { categories, type ExpenseRecord } from './record'

  const props = defineProps<{
    initialValue: ExpenseRecord
    save: (record: ExpenseRecord) => Promise<void>
  }>()

  const nameCodec: UiCodec<string> = {
    parse: (input) => ({ ok: true, value: input.trim() }),
    format: (value) => value,
  }
  const amountCodec = createUiNumberCodec({
    locale: 'en-US',
    scale: 2,
    allowNegative: false,
  })
  const options = createUiEntryControl(categories)
  const form = createUiFormControl<ExpenseRecord>(
    {
      name: createUiFieldControl(props.initialValue.name, nameCodec, [
        (name) => (name ? null : 'Enter a name.'),
      ]),
      amount: createUiFieldControl(props.initialValue.amount, amountCodec),
      category: createUiFieldControl(props.initialValue.category, undefined, [
        (key) =>
          categories.some((category) => category.key === key)
            ? null
            : 'Choose a category.',
      ]),
      enabled: createUiFieldControl(props.initialValue.enabled),
    },
    { acceptOnSave: true },
  )

  onUnmounted(() => {
    form.dispose()
    options.dispose()
  })
</script>

<template>
  <UiForm
    :control="form"
    :save="save"
    label="Edit expense"
  >
    <UiField
      :field="form.fields.name"
      label="Name"
      required
    >
      <UiTextInput />
    </UiField>
    <UiField
      :field="form.fields.amount"
      label="Amount (USD)"
      required
    >
      <UiTextInput inputmode="decimal" />
    </UiField>
    <UiField
      :field="form.fields.category"
      label="Category"
      required
    >
      <UiSelect :control="options" />
    </UiField>
    <UiField
      :field="form.fields.enabled"
      label="Enabled"
    >
      <UiCheckbox />
    </UiField>
    <UiLayout
      direction="horizontal"
      wrap
    >
      <UiButton
        :binding="form.bindings.submitButton"
        color="primary"
      >
        Save
      </UiButton>
      <UiButton
        :binding="form.bindings.resetButton"
        color="danger"
        variant="outline"
      >
        Reset
      </UiButton>
    </UiLayout>
    <UiNotice
      v-if="form.state.outcome === 'failed'"
      kind="error"
      announcement="polite"
    >
      {{ form.state.failure || 'The expense could not be saved. Try again.' }}
    </UiNotice>
    <UiNotice
      v-else-if="form.state.outcome === 'saved'"
      kind="success"
      announcement="polite"
    >
      Expense saved.
    </UiNotice>
  </UiForm>
</template>
