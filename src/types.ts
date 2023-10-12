import {z} from 'zod'

export const Categories = z.array(
  z.object({
    attributes: z.object({
      name: z.string(),
    }),
    id: z.string(),
  }),
)

export const CategoriesSchema = z.object({
  data: Categories,
})

const ImageSchema = z.object({
  data: z.object({
    attributes: z.object({
      url: z.string(),
      caption: z.string().optional(),
      width: z.number(),
      height: z.number(),
      size: z.number(),
    }),
  }),
})

export const PostSchema = z.object({
  title: z.string(),
  author: z.string(),
  slug: z.string(),
  subtitle: z.string(),
  body: z.string(),
  categories: CategoriesSchema,
  image: ImageSchema,
})

const Attributes = z.object({
  attributes: PostSchema,
  id: z.string(),
})

export const LinkSchema = z.object({
  id: z.string().optional(),
  label: z.string(),
  href: z.string(),
})

export const HeaderSchema = z.object({
  tabs: z.array(LinkSchema),
})

export type HeaderType = z.infer<typeof HeaderSchema>

export const HeroSchema = z.object({
  title: z.string(),
  description: z.string(),
  button: LinkSchema,
  image: ImageSchema,
})

export const FooterSchema = z.object({
  newsletter: z.object({
    title: z.string(),
    description: z.string(),
  }),
  sections: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      links: z.array(LinkSchema),
    }),
  ),
})

export const SubscriptionSchema = z.object({
  email: z.string().email(),
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
})

export const SubscriptionResponseSchema = z.object({
  full_name: z.string(),
  email_address: z.string().email(),
  status: z.string(),
})

export const PostsSchema = z.array(Attributes)

export type PostType = z.infer<typeof PostSchema>
export type AttributesType = z.infer<typeof Attributes>
