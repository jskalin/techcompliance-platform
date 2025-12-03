import z from 'zod';

export const priceCardVariantSchema = z.enum(['basic', 'pro', 'enterprise']);

export const productMetadataSchema = z
  .object({
    price_card_variant: priceCardVariantSchema,
    max_compliance_checks: z.string(),
    features: z.enum(['basic', 'advanced', 'premium']),
    support_level: z.enum(['email', 'live', 'dedicated']),
    api_access: z.string().optional(),
    custom_reports: z.string().optional(),
    priority_support: z.string().optional(),
    index: z.string().optional(),
  })
  .transform((data) => ({
    priceCardVariant: data.price_card_variant,
    maxComplianceChecks:
      data.max_compliance_checks === 'unlimited'
        ? 'unlimited'
        : parseInt(data.max_compliance_checks),
    features: data.features,
    supportLevel: data.support_level,
    apiAccess: data.api_access === 'true',
    customReports: data.custom_reports === 'true',
    prioritySupport: data.priority_support === 'true',
    index: data.index ? parseInt(data.index) : 0,
  }));

export type ProductMetadata = z.infer<typeof productMetadataSchema>;
export type PriceCardVariant = z.infer<typeof priceCardVariantSchema>;
