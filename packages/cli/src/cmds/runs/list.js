// import yargs from 'yargs'
import createClient from '../../helpers/client'
import createTable from '../../helpers/table'
import output from '../../helpers/output'

const columns = [{
  name: 'ID',
  key: 'id',
  width: 28,
}, {
  name: 'Status',
  key: 'status',
  width: 26,
}]

export async function handler (args) {
  const client = await createClient(args)
  const tasks = await client.runs.list()
  output.block(createTable(columns, tasks), args)
}

export default {
  command: 'list',
  desc: 'List runs',
  handler,
}
