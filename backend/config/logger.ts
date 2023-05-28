import chalk from 'chalk'

export default {
  success: (...args: string[]) => {
    // eslint-disable-next-line no-console
    console.log(chalk.bold.greenBright(...args))
  },
  error: (...args: string[]) => {
    // eslint-disable-next-line no-console
    console.log(chalk.bold.redBright(...args))
  },
  info: (...args: string[]) => {
    // eslint-disable-next-line no-console
    console.log(chalk.bold.yellowBright(...args))
  },
}
