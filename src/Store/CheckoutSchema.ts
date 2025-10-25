import { z } from "zod";


export const CheckoutSchema = z.object({
    firstName: z.string().regex(/^[A-Z][a-zA-Z]*$/, "Invalid first name"),
    lastName: z.string().regex(/^[A-Z][a-zA-Z]*$/, "Invalid Last Name"),
    email: z.email("Invalid email address"),
    phone: z.string().regex(/^01[0-9]{9}$/, "Invalid phone number"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    otherInformation: z.string().optional(),
    radioBox: z.boolean().optional(),

    subTotal: z.number().optional(),
    shipping: z.number().optional(),
    total: z.number().optional(),
});

export type CheckoutSchemaType = z.infer<typeof CheckoutSchema>;