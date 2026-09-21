'use client'

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import RichText from '@/components/RichText'
import { Button, Heading, Stack, Surface, Text } from '@/design-system'
import { getClientSideURL } from '@/utilities/getURL'
import { cn } from '@/utilities/ui'

import { fields } from './fields'

type AnyField = Record<string, any>

export type FormBlockType = {
  appearance?: { spacing?: string | null; tone?: string | null } | null
  blockName?: string
  blockType?: 'formBlock'
  enableIntro?: boolean | null
  form: FormType
  introContent?: DefaultTypedEditorState
  layout?: ('single' | 'steps') | null
  width?: ('narrow' | 'full' | 'split') | null
}

type Step = { description?: string; fields: AnyField[]; title?: string }

/**
 * Splits the form-builder's flat field list into steps at each `stepBreak`.
 *
 * Fields appearing before the first break belong to step one, so a form can
 * open with content and still be stepped afterwards.
 */
const toSteps = (formFields: AnyField[] = []): Step[] => {
  const steps: Step[] = [{ fields: [] }]

  formFields.forEach((field) => {
    if (field.blockType === 'stepBreak') {
      steps.push({ fields: [], title: field.stepTitle, description: field.stepDescription })
      return
    }
    steps[steps.length - 1]!.fields.push(field)
  })

  return steps.filter((step) => step.fields.length > 0)
}

export const FormBlock: React.FC<{ id?: string } & FormBlockType> = ({
  enableIntro,
  form: formFromProps,
  introContent,
  layout = 'single',
  width = 'narrow',
}) => {
  const {
    id: formID,
    confirmationMessage,
    confirmationType,
    redirect,
    submitButtonLabel,
  } = formFromProps || {}

  const formMethods = useForm({ defaultValues: formFromProps?.fields as any, mode: 'onTouched' })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    trigger,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<{ message: string; status?: string }>()
  const [stepIndex, setStepIndex] = useState(0)
  const router = useRouter()

  const steps = useMemo(() => toSteps(formFromProps?.fields as AnyField[]), [formFromProps?.fields])
  const isWizard = layout === 'steps' && steps.length > 1
  const visibleSteps = isWizard ? steps : [{ fields: steps.flatMap((step) => step.fields) }]
  const currentStep = visibleSteps[Math.min(stepIndex, visibleSteps.length - 1)]
  const isLastStep = stepIndex >= visibleSteps.length - 1

  const goNext = useCallback(async () => {
    // Validate only the fields on this step, otherwise later required fields
    // would block progress before the visitor has reached them.
    const names = (currentStep?.fields || [])
      .map((field) => field.name)
      .filter(Boolean) as string[]

    const valid = await trigger(names)
    if (valid) setStepIndex((index) => index + 1)
  }, [currentStep, trigger])

  const onSubmit = useCallback(
    (data: Record<string, unknown>) => {
      const submitForm = async () => {
        setError(undefined)
        setIsLoading(true)

        const dataToSend = Object.entries(data).map(([name, value]) => ({ field: name, value }))

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({ form: formID, submissionData: dataToSend }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
          })

          const res = await req.json()

          if (req.status >= 400) {
            setIsLoading(false)
            setError({
              message: res.errors?.[0]?.message || 'Something went wrong. Please try again.',
              status: String(req.status),
            })
            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect?.url) router.push(redirect.url)
        } catch {
          setIsLoading(false)
          setError({ message: 'Something went wrong. Please try again.' })
        }
      }

      void submitForm()
    },
    [confirmationType, formID, redirect, router],
  )

  if (!formFromProps) return null

  return (
    <div className={cn(width === 'narrow' && 'mx-auto max-w-2xl', width === 'split' && 'max-w-xl')}>
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8" data={introContent} enableGutter={false} />
      )}

      <Surface padding="lg" radius="lg" elevation="subtle">
        <FormProvider {...formMethods}>
          {hasSubmitted && confirmationType === 'message' ? (
            <div role="status">
              <RichText data={confirmationMessage} enableGutter={false} />
            </div>
          ) : (
            <form
              id={String(formID)}
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <Stack gap="lg">
                {isWizard && (
                  <Stack gap="sm">
                    <div className="flex items-center gap-2" role="list">
                      {visibleSteps.map((_, i) => (
                        <span
                          className={cn(
                            'h-1 flex-1 rounded-full transition-colors',
                            i <= stepIndex ? 'bg-brass-500' : 'bg-line',
                          )}
                          key={i}
                          role="listitem"
                        />
                      ))}
                    </div>
                    <Text size="xs" tone="subtle" className="font-mono uppercase tracking-widest">
                      Step {stepIndex + 1} of {visibleSteps.length}
                    </Text>
                    {currentStep?.title && (
                      <Heading as="h3" size="h4">
                        {currentStep.title}
                      </Heading>
                    )}
                    {currentStep?.description && <Text size="sm">{currentStep.description}</Text>}
                  </Stack>
                )}

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {(currentStep?.fields || []).map((field, index) => {
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (!Field) return null

                    return (
                      <Field
                        key={index}
                        form={formFromProps}
                        {...field}
                        {...formMethods}
                        control={control}
                        errors={errors}
                        register={register}
                      />
                    )
                  })}
                </div>

                {error && (
                  <p className="text-destructive text-sm" role="alert">
                    {error.message}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  {isWizard && stepIndex > 0 && (
                    <Button
                      onClick={() => setStepIndex((index) => index - 1)}
                      type="button"
                      variant="outline"
                    >
                      Back
                    </Button>
                  )}

                  {isWizard && !isLastStep ? (
                    <Button onClick={goNext} type="button" variant="default">
                      Continue
                    </Button>
                  ) : (
                    <Button disabled={isLoading} type="submit" variant="accent">
                      {isLoading ? 'Sending…' : submitButtonLabel || 'Send enquiry'}
                    </Button>
                  )}
                </div>
              </Stack>
            </form>
          )}
        </FormProvider>
      </Surface>
    </div>
  )
}
