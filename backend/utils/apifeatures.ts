import { queryStrType } from '../types'

class ApiFeatures {
  query: any
  queryStr: queryStrType

  constructor(query: any, queryStr: queryStrType) {
    this.query = query
    this.queryStr = queryStr
  }

  search(): ApiFeatures {
    // eslint-disable-next-line no-extra-boolean-cast
    const keyword = (Boolean(this.queryStr.keyword))
      ? {
        name: {
          $regex: this.queryStr.keyword,
          $options: 'i',
        },
      }
      : {}

    this.query = this.query.find({ ...keyword })
    return this
  }

  filter(): ApiFeatures {
    const queryCopy = { ...this.queryStr } as any
    // Removing some fields for category
    const removeFields = ['keyword', 'page', 'limit']

    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    removeFields.forEach((key) => delete queryCopy[key])

    // Filter For Price and Rating

    let queryStr = JSON.stringify(queryCopy)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)

    this.query = this.query.find(JSON.parse(queryStr))

    return this
  }

  pagination(resultPerPage: number): ApiFeatures {
    const currentPage = Number.isNaN(Number(this.queryStr.page)) ? 1 : this.queryStr.page

    const skip = resultPerPage * (currentPage - 1)

    this.query = this.query.limit(resultPerPage).skip(skip)

    return this
  }
}

export default ApiFeatures
