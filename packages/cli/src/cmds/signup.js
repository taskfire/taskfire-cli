import chalk from 'chalk'
import prompt from 'prompt'
import { promisify } from 'promise-callbacks'
import createClient from '../helpers/client'
import output from '../helpers/output'
import { addAuthConfig } from '../helpers/config'

const promptGet = promisify.method(prompt, 'get')

const schema = {
  properties: {
    name: {
      description: 'Name',
    },
    email: {
      description: 'E-mail',
    },
    username: {
      description: 'Username',
      // pattern: /^[0-9a-zA-Z@.\-]+$/,
      // message: 'Username should be your e-mail address',
      required: true,
    },
    password: {
      description: 'Password',
      hidden: true,
    },
  },
}

async function handler (args) {
  const client = await createClient(args, false)

  // Get the login details
  prompt.start()

  const {
    email, password, username, name,
  } = await promptGet(schema)

  const signup = await client.request({
    method: 'POST',
    url: '/signup',
    body: {
      name,
      username,
      email,
      password,
    },
  })

  if (signup) {
    await addAuthConfig(args, email, signup.token)
  }

  output(chalk.green('Successful signup! Welcome!'), args)
}

export default {
  command: 'signup',
  desc: 'Signup to Taskfire',
  builder: {
    dir: {
      default: '.',
    },
  },
  handler,
}