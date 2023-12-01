/* eslint-disable @typescript-eslint/naming-convention */
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.join(__dirname, '../.env') })

const envVars = process.env

export default {
  OPENAI_API_KEY: envVars.OPEN_AI_KEY,
  ENV: envVars.ENVIRONMENT,
}
