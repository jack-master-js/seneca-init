const handle = require('./handler')

function pagination (query) {
  let {pageIndex = 1, pageSize = 100, pageSort = 'createdAt'} = query
  let skip = (Number(pageIndex) - 1) * Number(pageSize)
  let limit = Number(pageSize)
  let sort = {}
  sort[pageSort] = -1
  delete query.pageIndex
  delete query.pageSize
  delete query.pageSort
  return {
    query,
    skip,
    limit,
    sort
  }
}

async function list (model,query,conditions) {
  const page = pagination(query)
  let args = conditions ? conditions : page.query

  let total = await model.countDocuments(args)
  let records = await model.find(args)
    .sort(page.sort)
    .skip(page.skip)
    .limit(page.limit)

  return {total,records}
}

async function service(args,done,callback) {
  const {params,query,body} = args
  let result = null
  try {
    result = await callback(params,query,body)
    if(result.type === 'success') done(null, handle.success())
    if(result.type === 'data') done(null, handle.data(result.data,result.total))
    if(result.type === 'message') done(null, handle.message(result.message))
  } catch (e) {
    if(e) done(null, handle.error(e))
  }
}

module.exports = {
  pagination,
  list,
  service,
}
