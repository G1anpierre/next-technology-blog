import {z} from 'zod'

const CategoriesSchema = z.object({
  data: z.array(
    z.object({
      attributes: z.object({
        name: z.string(),
      }),
    }),
  ),
})

export const PostSchema = z.object({
  title: z.string(),
  author: z.string(),
  slug: z.string(),
  subtitle: z.string(),
  categories: CategoriesSchema,
})

const Attributes = z.object({
  attributes: PostSchema,
})

export const PostsSchema = z.array(Attributes)

export type PostType = z.infer<typeof Attributes>
