import {Banner} from '@/components/Banner'
import {CardPost} from '@/components/CardPost'
import {CategoriesNavbar} from '@/components/CategoriesNavbar'
import {getClient} from '@/lib/client'
import {PostsSchema} from '@/types'
import {gql} from '@apollo/client'

const query = gql`
  query Categories($categorySlug: String!) {
    categories(filters: {name: {eq: $categorySlug}}) {
      data {
        id
        attributes {
          name
          subtitle
          description
          image {
            data {
              attributes {
                size
                name
                caption
                height
                width
                url
              }
            }
          }
          posts {
            data {
              id
              attributes {
                title
                date
                author
                image {
                  data {
                    attributes {
                      size
                      name
                      caption
                      height
                      width
                      url
                    }
                  }
                }
                body
                author
                subtitle
                slug
                categories {
                  data {
                    attributes {
                      name
                    }
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const Categories = async ({params}: {params: {categorySlug: string}}) => {
  const client = getClient()
  const {data} = await client.query({
    query,
    context: {
      fetchOptions: {
        next: {revalidate: 5},
      },
    },
    variables: {
      categorySlug: `${decodeURI(params.categorySlug)}`,
    },
  })

  const validatedCategoriesPosts = PostsSchema.safeParse(
    data.categories.data[0]?.attributes.posts.data,
  )

  const validatedCategoryAttributes = data.categories.data[0]?.attributes

  if (!validatedCategoriesPosts.success) {
    console.log('error on Categories: ', validatedCategoriesPosts.error)
  }

  const info = {
    title: validatedCategoryAttributes.name.toUpperCase(),
    subtitle: validatedCategoryAttributes.subtitle,
    description: validatedCategoryAttributes.description,
    image: validatedCategoryAttributes.image,
  }

  return (
    <div>
      <Banner info={info} />
      <CategoriesNavbar categorySlug={params.categorySlug} />
      <div className="py-8 container mx-auto p-2">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {validatedCategoriesPosts.success
            ? validatedCategoriesPosts.data.map(element => (
                <div key={element.attributes.title} className="grid gap-2">
                  <CardPost {...element} />
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  )
}

export default Categories
