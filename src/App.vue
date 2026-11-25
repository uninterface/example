<script setup lang="ts">
  import { ref } from 'vue'
  import {
    formatUiMoney,
    UiApp,
    UiButton,
    UiCard,
    UiContent,
    UiFormSubmissionError,
    UiKeyValueItem,
    UiKeyValueList,
    UiLayout,
  } from '@uninterface/uninterface'
  import RecordEditor from './RecordEditor.vue'
  import { categories, type ExpenseRecord } from './record'

  const saved = ref<ExpenseRecord>({
    name: 'Workshop supplies',
    amount: 12500,
    category: 'supplies',
    enabled: true,
  })
  const failNextSave = ref(false)

  async function saveRecord(record: ExpenseRecord) {
    const shouldFail = failNextSave.value
    failNextSave.value = false
    await new Promise((resolve) => setTimeout(resolve, 350))

    if (shouldFail) {
      throw new UiFormSubmissionError({
        stage: 'submit',
        message: 'The expense could not be saved. Try again.',
      })
    }
    saved.value = record
  }
</script>

<template>
  <UiApp>
    <UiContent>
      <main>
        <h1>Expense record</h1>
        <UiLayout>
          <UiCard>
            <template #title><h2>Edit expense</h2></template>
            <RecordEditor
              :initial-value="saved"
              :save="saveRecord"
            />
          </UiCard>
          <UiCard>
            <template #title>
              <h2 id="last-saved">Last saved record</h2>
            </template>
            <section aria-labelledby="last-saved">
              <UiKeyValueList>
                <UiKeyValueItem label="Name">{{ saved.name }}</UiKeyValueItem>
                <UiKeyValueItem label="Amount">
                  {{
                    formatUiMoney(saved.amount, {
                      locale: 'en-US',
                      currency: 'USD',
                      scale: 2,
                    })
                  }}
                </UiKeyValueItem>
                <UiKeyValueItem label="Category">
                  {{
                    categories.find(
                      (category) => category.key === saved.category,
                    )?.label
                  }}
                </UiKeyValueItem>
                <UiKeyValueItem label="Enabled">
                  {{ saved.enabled ? 'Yes' : 'No' }}
                </UiKeyValueItem>
              </UiKeyValueList>
            </section>
            <template #footer>
              <UiButton
                color="primary"
                variant="neutral"
                :aria-pressed="failNextSave"
                @click="failNextSave = !failNextSave"
              >
                Fail next save
              </UiButton>
            </template>
          </UiCard>
        </UiLayout>
      </main>
    </UiContent>
  </UiApp>
</template>
